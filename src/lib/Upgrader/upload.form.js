import React, { useEffect, useState } from "react"
import FileUpload from "./fileUpload"
import * as HashUtil from "../utils/hash-util"

const UpgradeForm = ({ state, onClose, authenticate }) => {
  const [darkblockDescription, setDarkblockDescription] = useState("")
  const [name, setName] = useState("")
  const [isDownloadable, setIsDownloadable] = useState(false)
  const [fileState, setFileState] = useState({})
  const [mintingState, setMintingState] = useState("starting")
  const [mintingStateMsg, setMintingStateMsg] = useState("")
  const [minting, setMinting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (fileState && fileState.name) {
      setName(fileState.name)
    }
  }, [fileState])


  useEffect(() => {
    console.log('UPLOAD FORM STATE', state.value, state)

    if (state.value === 'upload_file') {
      setProgress(state.context.uploadPercent)
    }


  }, [state.value])
  const getDarkblockSignature = async (fileHash) => {
    let signatureData, signature
    let platform = state.context.platform
    let contract = state.context.nftData.nft.contract
    let token = state.context.nftData.nft.token

    state.value = "signing"
    try {
      switch (platform.toLowerCase()) {
        case "avalanche":
        case "ethereum":
        case "polygon":
          signatureData = `${platform}${contract}:${token}${fileHash}`

          console.log("eth signatureData", signatureData)
          signature = "testing 1"
          // signature = await signTypedData(signatureData, wallet, platform).then((response) => {
          //   return response
          // })
          break
        case "solana":
          signatureData = `${platform}${token}${fileHash}`

          console.log("solana signatureData", signatureData)
          signature = "testing 2"
          // const encodedMessage = new TextEncoder().encode(signatureData)
          // const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8')
          // signature = btoa(String.fromCharCode.apply(null, signedMessage.signature))
          break
        case "tezos":
          signatureData = `${platform}${contract}:${token}${fileHash}`

          console.log("tezos signatureData", signatureData)
          signature = "testing 3"
          // signature = await signTezosData(signatureData, wallet).then((response) => {
          //   return response
          // })

          break
        default:
          break
      }
    } catch (e) {
      console.error(e)
    }
    return signature
  }

  const initDarkblockCreation = async (e) => {
    e.preventDefault()
    setMinting(true)
    setProgress(5)
    setMintingStateMsg("hashing the file...")

    const fileHash = await HashUtil.hashInChunks(fileState)

    setProgress(10)
    setMintingStateMsg("signing file for security...")

    console.log("fileHash", fileHash)
    state.context.fileHash = fileHash

    console.log("TRIGGER SIGNING HERE")
    authenticate()

    let darkblockSignature = await getDarkblockSignature(fileHash)

    console.log("darkblockSignature", darkblockSignature)

    // let darkblockSignature = await getDarkblockSignature(platform, nft.contract, nft.token, fileHash)

    let nftBlockchain = state.context.nftData.nft.blockchain.replace("ERC", "ERC-")

    console.log("+++++++++++++++")
    console.log("creator_address", state.context.wallet_address)
    console.log("nft_contract", state.context.nftData.nft.contract)
    console.log("nft_token", state.context.nftData.nft.token)
    console.log("nft_platform", state.context.platform)
    console.log("nft_standard", nftBlockchain)
    console.log("darkblock_description", darkblockDescription)
    console.log("name", name)
    console.log("download", isDownloadable)

    let data = new FormData()
    data.set("file", fileState)

    data.set("creator_address", state.context.wallet_address)
    data.set("nft_contract", state.context.nftData.nft.contract)
    data.set("nft_token", state.context.nftData.nft.token)
    data.set("nft_platform", state.context.platform)
    data.set("nft_standard", nftBlockchain)
    data.set("darkblock_description", darkblockDescription)
    // data.set('darkblock_signature', darkblockSignature)
    data.set("name", name)
    data.set("download", isDownloadable)

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

    setMintingStateMsg("starting file upload...")
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
      ) : (
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
                <div>
                  <p className="minting-warning">
                    Please DO NOT close this page until this process is finished. Depending on the file size and your
                    internet connection the upload time may take up to a few minutes.
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
                    setMinting(false)
                  }}
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default UpgradeForm
