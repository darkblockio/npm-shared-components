import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import signingImg from "../../assets/images/signing.jpg"
import completeImg from "../../assets/images/complete.jpg"
import errorImg from "../../assets/images/error.svg"

const Minter = ({ state, progress, mintingStateMsg }) => {
  const { t } = useTranslation()

  return (
    <div className="Darkblock-upgrade-modal-container">
      <div id="Darkblock-upgrade-modal-bg">
        <div>
          {state === "starting" && (
            <>
              <div className="Darkblock-minting-container">
                <h3 className="Darkblock-minting-header-text Darkblock-H1">{t("upgrader.minted")}</h3>
                <img className="Darkblock-image-upgrader" src={signingImg} />
                <div className="Darkblock-minting-progress-container">
                  <div className="Darkblock-minting-progress-bar" style={{ width: `${progress}%` }}>
                    {progress}%
                  </div>
                </div>
                <p className="Darkblock-detail-msg">{mintingStateMsg}</p>
                <div className="Darkblock-minting-warning-container">
                  <p className="Darkblock-minting-warning Darkblock-BodyText">{t("upgrader.mintingWarning")}</p>
                </div>
              </div>
            </>
          )}
          {state === "complete" && (
            <>
              <div className="Darkblock-minting-container">
                <h3 className="Darkblock-minting-header-text Darkblock-H1">{t("upgrader.minted")}</h3>
                <div>
                  <img className="Darkblock-image-upgrader" src={completeImg} />
                </div>
                <div className="Darkblock-complete-button-container">
                  <Button
                    layout="mintingAddAnother"
                    size="large"
                    variant="secondary"
                    color="gray"
                    onClick={() => {
                      clearForm()
                      setMintingState("starting")
                      setMinting(false)
                      setOpen(false)
                      reset()
                    }}
                  >
                    {t("upgrader.makeAnother")}
                  </Button>

                  <Button
                    layout="mintingDone"
                    variant="primary"
                    size="large"
                    color="white"
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
                  </Button>
                </div>
              </div>
            </>
          )}
          {state === "error" && (
            <>
              <div className="Darkblock-minting-container">
                <div>
                  <img className="Darkblock-error-icon-upgrader" src={errorImg} />
                </div>
                <h3 className="Darkblock-minting-header-error-text Darkblock-H1">{t("upgrader.error")}</h3>
                <p className="Darkblock-detail-msg Darkblock-BodyText">{t("upgrader.errorDetail")}</p>
                <Button
                  layout="mintingTryAgain"
                  size="large"
                  onClick={() => {
                    setMintingState("starting")
                    setMinting(false)
                    setOpen(false)
                    reset()
                  }}
                >
                  {t("upgrader.tryAgain")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Minter
