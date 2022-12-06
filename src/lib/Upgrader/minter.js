import React from "react"
import { useTranslation } from "react-i18next"

const Minter = ({ state, progress, mintingStateMsg }) => {
  const { t } = useTranslation()

  return (
    <div className="Darkblock-upgrade-modal-container">
      <div id="Darkblock-upgrade-modal-bg">
        <div>
          {state === "starting" && (
            <>
              <div className="Darkblock-minting-container">
                <h3 className="Darkblock-minting-header-text">{t("upgrader.minting")}</h3>
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
                  <p className="Darkblock-minting-warning">{t("upgrader.mintingWarning")}</p>
                </div>
              </div>
            </>
          )}
          {state === "complete" && (
            <>
              <div className="Darkblock-minting-container">
                <h3 className="Darkblock-minting-header-text">{t("upgrader.minted")}</h3>
                <div>
                  <video className="Darkblock-minting-video-loop">
                    <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                  </video>
                </div>
                <button
                  layout="mintingAddAnother"
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
                  layout="mintingDone"
                  onClick={() => {
                    clearForm()
                    setMintingState("starting")
                    setMinting(false)
                    setOpen(false)
                    reset("finished")
                    onClose(true)
                  }}
                >
                  {t("upgrader.done")}
                </button>
              </div>
            </>
          )}
          {state === "error" && (
            <>
              <div className="Darkblock-minting-container">
                <h3 className="Darkblock-minting-header-text">{t("upgrader.error")}</h3>
                <div>
                  <video className="Darkblock-minting-video-loop">
                    <source src={"https://darkblock-media.s3.amazonaws.com/upload/loading.mp4"} type="video/mp4" />
                  </video>
                </div>
                <button
                  className="white"
                  onClick={() => {
                    setMintingState("starting")
                    setMinting(false)
                    setOpen(false)
                    reset()
                  }}
                >
                  {t("upgrader.tryAgain")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Minter
