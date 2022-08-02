import React, { useState, useEffect } from "react"
import "./Header.css"
import Logo from "../Animations/Logo"
//import CloseButton from "./closeButton"



const setHeader = (onClose, title, text, red = false, authenticate = null) => {
  const [showHeaderModal, setShowHeaderModal] = useState(true)
  
  const [showModal, setShowModal] = useState(true)
  // const setModal = () => {
  //   setShowHeaderModal(false)
  //   console.log("hola")
  // }
  return (
    <div className='DarkblockWidget-Header'>
   
        <button onClick={onClose}>X</button>  
      <div className='DarkblockWidget-Header-Row'>
        <div className='logo'>
          <Logo className='Darkblock-Icon' />
        </div>
        <div className='titleStack'>
          <div className={red ? "title-red" : "title"}>{title}</div>
          <div className='content'>{text}</div>
        </div>

        {!!authenticate && (
          <div className='authButton'>
            <button onClick={authenticate} className='inner-button'>
              Authenticate Ownership
            </button>
          </div>
        )}
      </div>
     
    </div>
  )
}

const Header = ({onClose, state = null, authenticate }) => {
  if (state.value === "no_wallet") {
    return setHeader(onClose, "No wallet connected", "Please connect a wallet to view Darkblock unlockable content.")
   
  }
  if (state.value === "idle" || state.value === "loading_arweave") {
    return setHeader(onClose, "", "")
  }

  if (state.value === "start_failure") {
    return setHeader(onClose, "An Error Ocurred", "Please try again.")
  }

  if (state.value === "auth_failure" || state.value === "auth_cancel") {
    return setHeader(
      onClose,
      "Failed to Authenticate Ownership",
      "This wallet does not have access to this Darkblock. Make sure you are connected with the correct wallet.",
      true,
      authenticate
      
    )
  }

  if (state.value === "started") {
    return setHeader(onClose, "Darkblock Content", "This NFT has unlockable content which only the owner can access.")
  }

  if (state.value === "signing") {
    return setHeader(onClose, "Darkblock Unlockable Content", "This NFT has unlockable content which only the owner can access.")
  }

  if (state.value === "wallet_connected") {
    return setHeader(
      onClose,
      "Darkblock Content",
      "This NFT has unlockable content which only the owner can access.",
      false,
      authenticate
    )
  }

  if (state.value === "authenticated" || state.value === "decrypting" || state.value === "display") {
    return setHeader(onClose, "Ownership Authenticated", "Decrypting...")
  }

  return setHeader(onClose, "An Error Ocurred", "Please try again.", true)
}

export default Header
