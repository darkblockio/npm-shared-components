import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Cross from "../Cross";
import QRCode from "qrcode.react";
import Button from "../Button";

const QrCodeModal = ({ open, onClose, db }) => {
  const url = db && db.url ? db.url : null;
  const { t } = useTranslation();
  const [screen, setScreen] = useState(window.innerHeight);
  const [modal, setModal] = useState(null);

  setTimeout(() => {
    if (document.querySelector("darkblock-modal-box")) {
      const boxModal = document.getElementById("darkblock-modal-box")
        .clientHeight;
      setModal(boxModal);
    }
  }, 100);

  const shareSite = "/https://share.emigre.network";
  const qrValue = url ? `${shareSite}?url=${encodeURIComponent(url)}` : "";

  return (
    <>
      {open ? (
        <>
          <div className="darkblock-modal-container">
            <div
              id={`darkblock-modal-bg-${
                screen >= modal ? "center" : "start"
              }`}
            >
              <div id="darkblock-modal-box">
                <div className="darkblock-modal-first-row">
                  <div className="darkblock-modal-first-row">
                    <hr className="darkblock-divider" />
                    <div className="darkblock-qr-container">
                      {url && <QRCode value={qrValue} />}
                    </div>
                  </div>
                  
                </div>
                <div className="darkblock-button-container">
                    <Button
                      variant="primary"
                      size="large"
                      layout="done"
                      onClick={() => onClose(true)}
                    >
                      {t("details.done")}
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default QrCodeModal;
