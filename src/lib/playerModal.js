import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import './playerModal.css'

const PlayerModal = ({ children, open, onClose }) => {
  return (
    <>
      {open ? (
        <>
          <div className="container">
            <div
              id="modal-bg"
              className="modal-bg"
            >
              <div id="modal-box">
                <div
                  className="modal-box"
                  onClick={() => onClose(true)}
                >
                  <FontAwesomeIcon icon={faClose} className="awesome" />
                </div>
                <div className="content">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default PlayerModal
