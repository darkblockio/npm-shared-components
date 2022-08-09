import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import "./playerModal.css"

const PlayerModal = ({ state = null, urls, children, open, onClose }) => {
 
 

  return (
    <>
      {open ?
        (
            <>
              <div className='container'>
                <div className='modal-bg-darkblock'>
   
                    <div onClick={() => onClose(true)}>
                      <FontAwesomeIcon icon={faClose} className='awesomePlayerButton' />
                     
                    </div>
                  
                  <div className='content'>{children}</div>
                </div>
              </div>
            </>
          )
        : null}
    </>
  )
}

export default PlayerModal
