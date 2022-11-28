import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Cross from "../Cross"

const DetailModal = ({ db, open, onClose }) => {
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)
  const { t } = useTranslation()

  return (
    <>
      {open ? (
        <>
          <div className="darkblock-modal-container">
            <div id="darkblock-modal-bg" onClick={() => onClose(true)}>
              <div id="darkblock-modal-box">
                <div className="darkblock-modal-box-container">
                  <div id="darkblock-modal-box">
                    <div className="darkblock-modal-first-row">
                      <div className="darkblock-modal-first-row-container"></div>
                      <div className="darkblock-modal-title">{t("details.title")}</div>
                      {/* <img className='darkblock-cross-button' src="https://img.icons8.com/ios/50/000000/multiply.png" /> */}
                      <button className="darkblock-cross-button">
                        <Cross />
                      </button>
                    </div>
                    <hr className="darkblock-divider" />
                    <div className="darkblock-detail-container">
                      <div className="darkblock-modal-name">{db.name}</div>
                      <div className="darkblock-modal-detail">{db.details}</div>
                      <div className="darkblock-detail-subtitle">{t("details.size")}: </div>
                      <div className="darkblock-detail-subtitle-text">{db.fileSize}</div>
                      <div className="darkblock-detail-subtitle">{t("details.fileType")}: </div>
                      <div className="darkblock-detail-subtitle-text">{fileFormat}</div>
                      <div className="darkblock-detail-subtitle">{t("details.dateAdded")}:</div>
                      <div className="darkblock-detail-subtitle-text">
                        {d.toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>

                      <div className="darkblock-detail-subtitle">Arweave TX: </div>
                      <div className="darkblock-detail-subtitle-text">{db.arweaveTX}</div>
                    </div>
                    <div className="darkblock-button-container">
                      <Button variant="primary" size="large" layout="done" onClick={() => onClose(true)}>
                        {t("details.done")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default DetailModal
