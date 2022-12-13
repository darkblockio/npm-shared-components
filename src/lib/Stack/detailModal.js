import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Cross from "../Cross"

const DetailModal = ({ db, open, onClose }) => {
  console.log(db)
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
              <div className="darkblock-modal-box-container"></div>
              <div id="darkblock-modal-box">
                <div className="darkblock-modal-first-row">
                  <div className="darkblock-modal-first-row-container"></div>
                  <h3 className="darkblock-modal-title">{t("details.title")}</h3>
                  {/* <img className='darkblock-cross-button' src="https://img.icons8.com/ios/50/000000/multiply.png" /> */}
                  <button className="darkblock-cross-button">
                    <Cross />
                  </button>
                </div>
                <hr className="darkblock-divider" />
                <div className="darkblock-detail-container">
                  <h1 className="darkblock-modal-name">{db.name}</h1>
                  <div className="darkblock-modal-detail Darkblock-BodyText">{db.details}</div>
                  <h3 className="darkblock-detail-subtitle">{t("details.size")}: </h3>
                  <div className="darkblock-detail-subtitle-text Darkblock-BodyText">{db.fileSize}</div>
                  <h3 className="darkblock-detail-subtitle">{t("details.fileType")}: </h3>
                  <div className="darkblock-detail-subtitle-text Darkblock-BodyText">{fileFormat}</div>
                  <h3 className="darkblock-detail-subtitle">{t("details.dateAdded")}:</h3>
                  <div className="darkblock-detail-subtitle-text Darkblock-BodyText">
                    {d.toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="darkblock-detail-subtitle">Arweave TX: </h3>
                  <div className="darkblock-detail-subtitle-text Darkblock-BodyText">{db.arweaveTX}</div>
                  <h3 className="darkblock-detail-subtitle">Downloadable:</h3>
                  <div className="darkblock-detail-subtitle-text Darkblock-BodyText">
                    {db.downloadable ? "Yes" : "No"}
                  </div>
                </div>
                <div className="darkblock-button-container">
                  <Button variant="primary" size="large" layout="done" onClick={() => onClose(true)}>
                    {t("details.done")}
                  </Button>
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
