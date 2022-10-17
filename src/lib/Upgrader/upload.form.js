import React, { useEffect, useState } from "react"
import FileUpload from "./fileUpload"
import * as HashUtil from "../utils/hash-util"
import FooterUpgrader from "../FooterUpgrader"
import { getSHA256OfFileChunks } from "../utils/hash-util"

const UpgradeForm = ({ apiKey, state, onClose, authenticate, reset }) => {
  const [darkblockDescription, setDarkblockDescription] = useState("")
  const [name, setName] = useState("")
  const [isDownloadable, setIsDownloadable] = useState(false)
  const [fileState, setFileState] = useState({})
  const [mintingState, setMintingState] = useState("starting")
  const [mintingStateMsg, setMintingStateMsg] = useState("")
  const [minting, setMinting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  const clearForm = () => {
    setDarkblockDescription("")
    setName("")
    setIsDownloadable(false)
    setFileState(null)
    setMintingStateMsg("")
    setProgress(0)
    setMinting(false)
  }

  useEffect(() => {
    if (fileState && fileState.name) {
      setName(fileState.name)
    }
  }, [fileState])

  useEffect(() => {
    if (state) {
      if (state.value === "upload_file") {
        uploadFile()
      }

      if (state.event && state.event.type && state.event.type === "SIGNING_FAIL") {
        clearForm()
        setMintingState("error")
      }

      if (state.value === "show_upgrade_signing") {
        setMinting(false)
        setTimeout(() => {
          setMinting(true)
          setDarkblockDescription("")
          setFileState(null)
          setIsDownloadable(false)
          setMintingState("starting")
          setOpen(true)
          setProgress(25)
        }, 500)
      }

      if (state.value === "show_upgrade_complete") {
        setMinting(false)
        setTimeout(() => {
          setMinting(true)
          setDarkblockDescription("")
          setFileState(null)
          setIsDownloadable(false)
          setMintingState("complete")
          setOpen(true)
        }, 500)
      }

      if (state.value === "show_upgrade_error") {
        setMinting(false)
        setTimeout(() => {
          setMinting(true)
          setDarkblockDescription("")
          setFileState(null)
          setIsDownloadable(false)
          setMintingState("error")
          setOpen(true)
        }, 500)
      }
    }
  }, [state.value])

  useEffect(() => {
    if (mintingState === "starting") {
      clearForm()
      setOpen(false)
    }
  }, [mintingState])

  const uploadFile = async () => {
    if (fileState && state.context.wallet_address && name) {
      setMintingStateMsg("Generating content signature...")

      let nftBlockchain = state.context.nftData.nft.blockchain
      if (nftBlockchain === "ERC1155") nftBlockchain = "ERC-1155"
      if (nftBlockchain === "ERC721") nftBlockchain = "ERC-721"

      const creatorAddress =
        state.context.platform.toLowerCase() === "tezos" ? state.context.tezos_public_key : state.context.wallet_address

      let data = new FormData()

      data.set("file", fileState)
      data.set("creator_address", creatorAddress)
      data.set("nft_contract", state.context.nftData.nft.contract)
      data.set("nft_token", state.context.nftData.nft.token)
      data.set("nft_platform", state.context.platform)
      data.set("nft_standard", nftBlockchain)
      data.set("darkblock_description", darkblockDescription)
      data.set("darkblock_signature", state.context.signature)
      data.set("name", name)
      data.set("download", isDownloadable)

      const URL = `https://api.darkblock.io/v1/darkblock/upgrade?apikey=${apiKey}`

      const xhr = new XMLHttpRequest()
      xhr.open("POST", URL, true)
      xhr.timeout = 900000

      xhr.upload.onprogress = function (e) {
        let percentComplete = Math.ceil((e.loaded / e.total) * 100)

        if (percentComplete > 10 && percentComplete <= 90) {
          setMintingStateMsg("Uploading to arweave...")
          setProgress(percentComplete)
        }
      }

      xhr.onerror = function () {
        setMintingState("error")
      }

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          setProgress(100)
          setTimeout(() => {
            clearForm()
            setMintingState("complete")
          }, 500)
        }
        if (this.status == 400 || this.status == 500) {
          clearForm()
          setMintingState("error")
        }
      }

      xhr.send(data)
    }
  }

  const initDarkblockCreation = async (e) => {
    e.preventDefault()

    setOpen(true)
    setMinting(true)
    setProgress(5)
    setMintingStateMsg("Hashing the file...")

    const fileHash = await HashUtil.getSHA256OfFileChunks(fileState)

    setProgress(10)
    setMintingStateMsg("Signing file for security...")

    if (state && state.context) {
      state.context.fileHash = fileHash
    }

    authenticate()
  }

  const charLimit = 250

  return (
    <div>
      {!minting ? (
        <form onSubmit={initDarkblockCreation} className="Darkblock-upgrade-form">
          <FileUpload fileState={fileState} setFileState={setFileState}></FileUpload>
          <h3 className="Darkblock-upgrade-title-input">Name</h3>
          <input
            type="text"
            className="Darkblock-upgrade-name-input"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <h3 className="Darkblock-upgrade-title-input">Description (optional)</h3>
          <textarea
            className="Darkblock-upgrade-description-input"
            cols={50}
            rows={3}
            maxLength={charLimit}
            value={darkblockDescription}
            onChange={(e) => {
              setDarkblockDescription(e.target.value)
            }}
          ></textarea>
          <p className="Darkblock-upgrade-description-char-count">{`${
            charLimit - darkblockDescription.length
          }/${charLimit} characters remaining`}</p>
          <br />
          <div className="Darkblock-allowDownload">
            <input
              className="Darkblock-downloadable-check"
              type="checkbox"
              checked={isDownloadable}
              onChange={(e) => {
                setIsDownloadable(e.target.checked)
              }}
            />
            <label className="Darkblock-downloadable-text">Allow download</label>
          </div>
          <button
            disabled={!fileState || !fileState.name || !name}
            type="submit"
            id="darkblock-submit"
            className="Darkblock-upgrade-create-button"
          >
            Create
          </button>
        </form>
      ) : null}
      {open ? (
        <div className="Darkblock-upgrade-modal-container">
          <div id="Darkblock-upgrade-modal-bg">
            <div>
              {mintingState === "starting" && (
                <>
                  <div className="Darkblock-minting-container">
                    <h3 className="Darkblock-minting-header-text">Your unlockable content is being created...</h3>
                    <div>
                      <video autoPlay playsInline loop className="Darkblock-minting-video-loop">
                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                      </video>
                    </div>
                    <div className="Darkblock-minting-progress-container">
                      <div className="Darkblock-minting-progress-bar" style={{ width: `${progress}%` }}>
                        {progress}%
                      </div>
                    </div>
                    <div className="Darkblock-minting-state-msg">{mintingStateMsg}</div>
                    <div className="Darkblock-minting-warning-container">
                      <p className="Darkblock-minting-warning">
                        Please DO NOT close this page until this process is finished. Depending on the file size and
                        your internet connection the upload time may take up to a few minutes.
                      </p>
                    </div>
                  </div>
                </>
              )}
              {mintingState === "complete" && (
                <>
                  <div className="Darkblock-minting-container">
                    <h3 className="Darkblock-minting-header-text">Your unlockable content has been created</h3>
                    <div>
                      <video className="Darkblock-minting-video-loop">
                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                      </video>
                    </div>
                    <button
                      className="Darkblock-minting-complete-add-another"
                      onClick={() => {
                        clearForm()
                        setMintingState("starting")
                        setMinting(false)
                        setOpen(false)
                        reset()
                      }}
                    >
                      Make Another
                    </button>
                    <button
                      className="Darkblock-minting-complete-done"
                      onClick={() => {
                        clearForm()
                        setMintingState("starting")
                        setMinting(false)
                        setOpen(false)
                        reset("finished")
                        onClose(true)
                      }}
                    >
                      I&apos;m Done
                    </button>
                  </div>
                </>
              )}
              {mintingState === "error" && (
                <>
                  <div className="Darkblock-minting-container">
                    <h3 className="Darkblock-minting-header-text">Error Trying to Upload File</h3>
                    <div>
                      <video className="Darkblock-minting-video-loop">
                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                      </video>
                    </div>
                    <button
                      className="Darkblock-minting-try-again"
                      onClick={() => {
                        setMintingState("starting")
                        setMinting(false)
                        setOpen(false)
                        reset()
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <FooterUpgrader />
    </div>
  )
}

export default UpgradeForm
