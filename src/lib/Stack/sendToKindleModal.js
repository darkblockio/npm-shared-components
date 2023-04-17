import React, { useState, useEffect } from "react";
import Button from "../Button";

const SenToKindleModal = ({ open, onClose }) => {
  const [screen, setScreen] = useState(window.innerHeight);
  const [modal, setModal] = useState(null);
  const [dotAnimation, setDotAnimation] = useState(".");

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setDotAnimation((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  setTimeout(() => {
    if (document.querySelector("darkblock-modal-box")) {
      const boxModal = document.getElementById("darkblock-modal-box")
        .clientHeight;
      setModal(boxModal);
    }
  }, 100);

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
                    <div className="darkblock-text-container">
                      <p>Sending to Kindle <br></br> {dotAnimation}</p>
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
                        Done
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

export default SenToKindleModal;
