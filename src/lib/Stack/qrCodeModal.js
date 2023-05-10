import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Cross from "../Cross";
import QRCode from "qrcode.react";
import Button from "../Button";

const QrCodeModal = ({ open, onClose, db }) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(window.innerHeight);
  const [modal, setModal] = useState(null);
  const modalRef = useRef();

  setTimeout(() => {
    if (document.querySelector("darkblock-modal-box")) {
      const boxModal = document.getElementById("darkblock-modal-box")
        .clientHeight;
      setModal(boxModal);
    }
  }, 100);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const url = db && db.url ? db.url : null;
  // const title = null;
  // const text = null;
  // const shareSite = "/https://share.emigre.network";
  const qrValue = url
    // ? `${shareSite}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
    //     title
    //   )}&text=${encodeURIComponent(text)}`
    // : "";

  return (
    <>
      {open ? (
        <>
          <div
            className="darkblock-modal-container"
            onClick={handleClickOutside}
          >
            <div
              id={`darkblock-modal-bg-${screen >= modal ? "center" : "start"}`}
            >
              <div id="darkblock-modal-box" ref={modalRef}>
                <div className="darkblock-modal-first-row">
                  <div className="darkblock-modal-first-row">
                    <hr className="darkblock-divider" />
                    <div className="darkblock-qr-container">
                      {url && <QRCode size={256} value={qrValue} />}
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
