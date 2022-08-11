import React, { useEffect, useState } from "react"
// import axios from "axios"
import FileUpload from "./fileUpload"
import * as HashUtil from "../utils/hash-util"

const UpgradeForm = ({ apiKey, state, onClose, authenticate }) => {
  const [darkblockDescription, setDarkblockDescription] = useState("")
  const [name, setName] = useState("")
  const [isDownloadable, setIsDownloadable] = useState(false)
  const [fileState, setFileState] = useState({})
  const [mintingState, setMintingState] = useState("starting")
  const [mintingStateMsg, setMintingStateMsg] = useState("")
  const [minting, setMinting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

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
        setMintingState("error")
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
      setDarkblockDescription("")
      setIsDownloadable(false)
      setName("")
      setFileState({})
      setMintingStateMsg("")
      setMinting(false)
      setProgress(0)
      setOpen(false)
    }
  }, [mintingState])

  const uploadFile = async () => {
    let nftBlockchain = state.context.nftData.nft.blockchain.replace("ERC", "ERC-")
    let data = new FormData()

    data.set("file", fileState)
    data.set("creator_address", state.context.wallet_address)
    data.set("nft_contract", state.context.nftData.nft.contract)
    data.set("nft_token", state.context.nftData.nft.token)
    data.set("nft_platform", state.context.platform)
    data.set("nft_standard", nftBlockchain)
    data.set("darkblock_description", darkblockDescription)
    data.set("darkblock_signature", state.context.signature)
    data.set("name", name)
    data.set("download", isDownloadable)

    setMintingStateMsg("starting file upload...")

    const options = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=---011000010111000001101001",
      },
      timeout: 900000, // 15 minutes
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)

        if (percent > 10 && percent <= 100) {
          setMintingStateMsg("uploading file...")
          setProgress(percent)
        }
      },
    }

    const URL = `https://api.darkblock.io/v1/darkblock/upgrade?apikey=${apiKey}`
    // axios
    //   .post(URL, data, options)
    //   .then((response) => {
    //     setDarkblockDescription("")
    //     setFileState(null)
    //     setMintingState("complete")
    //     setIsDownloadable(false)
    //
    //     return response
    //   })
    //   .catch(() => {
    //     showErrorState()
    //   })
  }

  const showErrorState = () => {
    setDarkblockDescription("")
    setFileState(null)
    setMintingState("error")
    setIsDownloadable(false)
    setName("")
    setMintingStateMsg("")
    setMinting(false)
    setOpen(false)
    setProgress(0)
  }

  const initDarkblockCreation = async (e) => {
    e.preventDefault()

    setOpen(true)
    setMinting(true)
    setProgress(5)
    setMintingStateMsg("hashing the file...")

    const fileHash = await HashUtil.hashInChunks(fileState)

    setProgress(10)
    setMintingStateMsg("signing file for security...")

    if (state && state.context && state.context.fileHash) {
      state.context.fileHash = fileHash
    }

    authenticate()
  }

  return (
    <div>
      {!minting ? (
        <form onSubmit={initDarkblockCreation} className="upgrade-form">
          <FileUpload fileState={fileState} setFileState={setFileState}></FileUpload>
          <input
            type="text"
            className="upgrade-name-input"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <textarea
            className="upgrade-description-input"
            placeholder="Description (optional)"
            cols={50}
            rows={3}
            maxLength={450}
            value={darkblockDescription}
            onChange={(e) => {
              setDarkblockDescription(e.target.value)
            }}
          ></textarea>
          <p className="upgrade-description-char-count">{`${darkblockDescription.length}/450 characters remaining`}</p>
          <br />
          <input
            className="downloadable-check"
            type="checkbox"
            checked={isDownloadable}
            onChange={(e) => {
              setIsDownloadable(e.target.checked)
            }}
          />
          <label className="downloadable-text">Allow download</label>

          <button
            disabled={!fileState || !fileState.name || !name}
            type="submit"
            id="darkblock-submit"
            className="upgrade-create-button"
          >
            Create
          </button>
        </form>
      ) : null}
      {open ? (
        <div className="upgrade-modal-container">
          <div id="upgrade-modal-bg">
            <div>
              {mintingState === "starting" && (
                <>
                  <div className="minting-container">
                    <h3 className="minting-header-text">Your unlockable content is being created...</h3>
                    <div>
                      <video autoPlay playsInline loop className="minting-video-loop">
                        <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                      </video>
                    </div>
                    <div className="minting-progress-container">
                      <div className="minting-progress-bar" style={{ width: `${progress}%` }}>
                        {progress}%
                      </div>
                    </div>
                    <div className="minting-state-msg">{mintingStateMsg}</div>
                    <div className="minting-warning-container">
                      <p className="minting-warning">
                        Please DO NOT close this page until this process is finished. Depending on the file size and
                        your internet connection the upload time may take up to a few minutes.
                      </p>
                    </div>
                  </div>
                </>
              )}
              {mintingState === "complete" && (
                <>
                  <div className="minting-container">
                    <h3 className="minting-complete-header">Success!</h3>
                    <p className="minting-complete-info">Your unlockable content has been created</p>
                    <button
                      className="minting-complete-add-another"
                      onClick={() => {
                        setMinting(false)
                        setOpen(false)
                      }}
                    >
                      Make Another
                    </button>
                    <button className="minting-complete-done" onClick={onClose}>
                      I&apos;m Done
                    </button>
                  </div>
                </>
              )}
              {mintingState === "error" && (
                <>
                  <div className="minting-container">
                    <h3 className="minting-error-msg">Error Trying to Upload File</h3>
                    <button
                      className="minting-try-again"
                      onClick={() => {
                        setMintingState("starting")
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
    </div>
  )
}

export default UpgradeForm
