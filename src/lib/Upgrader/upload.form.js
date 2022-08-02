import React, { useEffect, useState } from "react"
import FileUpload from "./fileUpload"
import * as HashUtil from '../utils/hash-util'

const UpgradeForm = ({ nft, wallet = null, address = null, publicKey = null, platform, onClose }) => {
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

  const getDarkblockSignature = async (platform, contract, token, fileHash) => {
    console.log("getDarkblockSignature")
    console.log("platform", platform)
    console.log("contract", contract)
    console.log("token", token)
    console.log("fileHash", fileHash)
  }

  const initDarkblockCreation = async (e) => {
    e.preventDefault()
    setMinting(true)
    setProgress(5)
    setMintingStateMsg("hashing the file...")

    const fileHash = await HashUtil.hashInChunks(fileState)

    setProgress(10)
    setMintingStateMsg('signing file for security...')

    console.log('fileHash', fileHash)


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

          <button type="submit" id="darkblock-submit" className="upgrade-create-button">
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
                <p className="minting-complete-info">
                  Your unlockable content creation is complete. It may take a few minutes before the Darkblock content
                  appears.
                </p>
                <button
                  className="minting-complete-add-another"
                  onClick={() => {
                    setMinting(false)
                  }}
                >
                  Add Another
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
