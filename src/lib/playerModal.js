import React from "react"
import "./playerModal.css"

const PlayerModal = ({ state = null, children, open }) => {

  return (
    <>
      {open ?  (
        <div className='Darkblock-container'>
          <div className='modal-bg-darkblock'>
            <div className='Darkblock-content'>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PlayerModal
