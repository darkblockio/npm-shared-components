import React from "react"
import { useTranslation } from "react-i18next"
import UpgradeForm from "./upload.form"

const UpgradeModal = ({ apiKey, state, open, onClose, authenticate, reset, dev }) => {
  const { t } = useTranslation()
  return (
    <>
      {open ? (
        <div className="Darkblock-upgrade-modal-container">
          <div id="Darkblock-upgrade-modal-bg">
            <div id="Darkblock-upgrade-modal-box">
              <div className="Darkblock-upgrade-modal-box-container">
                <div id="Darkblock-upgrade-modal-box">
                  <div className="Darkblock-upgrade-modal-first-row">
                    <div className="Darkblock-upgrade-modal-first-row-container"></div>
                    <div className="Darkblock-upgrade-modal-title">{t("upgrader.title")}</div>
                    <img
                      alt={"close"}
                      className="Darkblock-upgrade-cross-button"
                      onClick={() => onClose(true)}
                      src="https://img.icons8.com/ios/50/000000/multiply.png"
                    />
                  </div>
                  <hr className="Darkblock-upgrade-line-break" />
                  <div className="Darkblock-upgrade-container">
                    <UpgradeForm
                      apiKey={apiKey}
                      state={state}
                      onClose={() => onClose(true)}
                      authenticate={authenticate}
                      reset={reset}
                      dev={dev}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UpgradeModal
