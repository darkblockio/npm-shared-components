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
              id="modal-bg-darkblock"
              className="modal-bg-darkblock"
            >
              <div id="modal-box-darkblock">
                <div
                  className="modal-box-darkblock"
                  onClick={() => onClose(true)}
                >
                  <FontAwesomeIcon icon={faClose} className="awesome absolute float-right" />
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
