import React, { useState, useEffect } from "react"
import "./Header.css"
import Logo from "../Animations/Logo"
import { AiOutlineClose } from "react-icons/ai"

const setHeader = (onClose, title, text, red = false, authenticate = null) => {
  return (
    <div className="DarkblockWidget-Header">
      {onClose !== false && (
        <button className="DarkblockWidget-closeBtn" onClick={onClose}>
          <AiOutlineClose />
        </button>
      )}
      <div className="DarkblockWidget-Header-Row">
        <div className="logo">
          <Logo className="Darkblock-Icon" />
        </div>
        <div className="titleStack">
          <div className={red ? "title-red" : "title"}>{title}</div>
          <div className="content">{text}</div>
        </div>

        {!!authenticate && (
          <div className="authButton">
            <button onClick={authenticate} className="inner-button">
              Authenticate Ownership
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Header = ({ onClose, state = null, authenticate }) => {
  if (state.value === "no_wallet") {
    return setHeader(false, "No wallet connected", "Please connect a wallet to view Darkblock unlockable content.")
  }
  if (state.value === "idle" || state.value === "loading_arweave") {
    return setHeader(false, "", "")
  }

  if (state.value === "start_failure") {
    return setHeader(false, "An Error Ocurred", "Please reload the page and try again")
  }

  if (state.value === "auth_failure" || state.value === "auth_cancel") {
    return setHeader(
      false,
      "Failed to Authenticate Ownership",
      "This wallet does not have access to this Darkblock.",
      true,
      authenticate
    )
  }

  if (state.value === "started") {
    return setHeader(false, "Darkblock Content", "This NFT has unlockable content which only the owner can access.")
  }

  if (state.value === "signing") {
    return setHeader(false, "Signature Requested", "Please sign with your wallet")
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

  if (state.value === "authenticated" || state.value === "decrypting") {
    return setHeader(false, "Ownership Authenticated", "Decrypting...")
  }

  if (state.value === "display") {
    return setHeader(onClose, "Ownership Authenticated", "You can now access the content")
  }

  return setHeader(onClose, "An Error Ocurred", "Please try again.", true)
}

export default Header
