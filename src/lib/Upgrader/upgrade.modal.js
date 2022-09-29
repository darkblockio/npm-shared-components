import React from "react"
import UpgradeForm from "./upload.form"

const UpgradeModal = ({ apiKey, state, open, onClose, authenticate, reset }) => {
  return (
    <>
      {open ? (
        <div className="upgrade-modal-container">
          <div id="upgrade-modal-bg">
            <div id="upgrade-modal-box">
              <div className="upgrade-modal-box-container">
                <div id="upgrade-modal-box">
                  <div className="upgrade-modal-first-row">
                    <div className="upgrade-modal-first-row-container"></div>
                    <div className="upgrade-modal-title">Create Unlockable Content</div>
                    <img
                      alt={"close"}
                      className="upgrade-cross-button"
                      onClick={() => onClose(true)}
                      src="https://img.icons8.com/ios/50/000000/multiply.png"
                    />
                  </div>
                  <hr className="upgrade-line-break" />
                  <div className="upgrade-container">
                    <UpgradeForm
                      apiKey={apiKey}
                      state={state}
                      onClose={() => onClose(true)}
                      authenticate={authenticate}
                      reset={reset}
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
