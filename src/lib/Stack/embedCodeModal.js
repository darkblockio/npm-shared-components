import React from "react"
import Button from "../Button"
import Cross from "../Cross"
import { useTranslation } from "react-i18next"

const EmbedCodeModal = ({ embedCode, open, onClose }) => {
  const { t } = useTranslation()

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      alert("Embed code copied to clipboard!")
      onClose(true) // Close the modal after copying
    } catch (err) {
      console.error("Could not copy text: ", err)
    }
  }

  return (
    <>
      {open && (
        <div className="darkblock-modal-container">
          <div id="darkblock-modal-bg-center">
            <div id="darkblock-modal-box" style={{ width: "50%" }}>
              <div className="darkblock-modal-first-row">
                <h3 className="darkblock-modal-title Darkblock-H3">{t("embed.modalTitle")}</h3>
                <button className="darkblock-cross-button" onClick={() => onClose(true)}>
                  <Cross />
                </button>
              </div>
              <hr className="darkblock-divider" />
              <div className="darkblock-detail-container">
                {/* Use a textarea or div with overflow handling */}
                <textarea
                  readOnly
                  value={embedCode}
                  className="darkblock-modal-detail-embed Darkblock-BodyText"
                  style={{
                    overflow: "auto",
                    resize: "none",
                    width: "100%",
                    height: "150px",
                    margin: "10px 0",
                    padding: "5px",
                    border: "2px solid #000000",
                    boxShadow: "0 0 3px #000000",
                    borderRadius: "3px",
                  }}
                />
              </div>
              <div className="darkblock-button-container">
                <Button variant="primary" size="large" layout="done" onClick={handleCopyClick}>
                  {t("embed.copyButtonText")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmbedCodeModal
