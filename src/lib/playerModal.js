import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

const PlayerModal = ({ children, open, onClose }) => {
  return (
    <>
      {open ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 m-4 outline-none focus:outline-none">
            <div
              id="modal-bg"
              className="fixed inset-0 z-9998 items-center justify-center overflow-auto bg-black bg-opacity-90"
            >
              <div id="modal-box">
                <div
                  className="cursor-pointer z-9997 text-white bg-black text-right pr-5"
                  onClick={() => onClose(true)}
                >
                  <FontAwesomeIcon icon={faClose} className="awesome" /> Close
                </div>
                <div className="mx-auto block w-screen h-full">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default PlayerModal
