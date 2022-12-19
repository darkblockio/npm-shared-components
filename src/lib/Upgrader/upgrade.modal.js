import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Cross from "../Cross"
import FooterUpgrader from "../FooterUpgrader"
import UpgradeForm from "./upload.form"

const UpgradeModal = ({ apiKey, state, open, onClose, authenticate, reset, dev }) => {
  const [screen, setScreen] = useState(window.innerHeight)
  const [modal, setModal] = useState(794)

  const { t } = useTranslation()
  const handleUploadChange = () => {
    let boxes
    setTimeout(() => {
      boxes = document.querySelector("#Darkblock-upgrade-modal-box")?.clientHeight
      setModal(boxes)
    }, 100)
  }

  function changeScreen(e) {
    setScreen(e.srcElement.innerHeight)
  }
  window.addEventListener("resize", changeScreen)
  return (
    <>
      {open ? (
        <div className="Darkblock-upgrade-modal-container">
          <div id="Darkblock-upgrade-modal-bg">
            <div className={`Darkblock-upgrade-modal-box-container-${screen >= modal ? "center" : "start"}`}>
              <div id="Darkblock-upgrade-modal-box">
                <div className="Darkblock-upgrade-modal-first-row">
                  <div className="Darkblock-upgrade-modal-first-row-container"></div>
                  <div className="Darkblock-upgrade-modal-title">{t("upgrader.title")}</div>

                  <button className="Darkblock-upgrade-cross-button" onClick={() => onClose(true)}>
                    <Cross />
                  </button>
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
                    handleUpload={handleUploadChange}
                  />
                </div>
                <div className="Darkblock-Upload-Footer">
                  <FooterUpgrader />
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
