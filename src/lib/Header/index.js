import React, { useState, useEffect } from "react"
import "./Header.css"
import Logo from "../Animations/Logo"
import { AiOutlineClose } from "react-icons/ai"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWallet, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const RenderIcon = ({ filetype }) => {
  let icon = ""

  if (filetype == "check") icon = faCircleCheck
  if (filetype == "wallet") icon = faWallet
  return <FontAwesomeIcon icon={icon} className="w-6 h-6 awesome" />
}

const setHeader = (onClose, state, title, text, red = false, authenticate = null) => {
  return (
    <div className="DarkblockWidget-Header">
      <div className="m-auto">

        {onClose !== false && (
          <button className="DarkblockWidget-closeBtn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        )}

        <div className="DarkblockWidget-Header-Row">
          {state.value === "signing" && <FontAwesomeIcon icon={faWallet} className="w-6 h-6 awesome" />}
          {state.value === "display" && (
            <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6 text-green-500 awesome" />
          )}

          {(state.value === "auth_failure" || state.value === "start_failure" || state.value === "decrypt_error") && (
            <FontAwesomeIcon icon={faTriangleExclamation} className="w-6 h-6 text-red-500 awesome" />
          )}

          {state.value !== "auth_failure" &&
            state.value !== "start_failure" &&
            state.value !== "decrypt_error" &&
            state.value !== "signing" &&
            state.value !== "display" && (
              <div className="logo">
                <Logo className="Darkblock-Icon" />
              </div>
            )}

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
    </div>
  )
}

const Header = ({ onClose, state = null, authenticate }) => {
  if (state.value === "no_wallet") {
    return setHeader(
      false,
      state,
      "No wallet connected",
      "Please connect a wallet to view Darkblock unlockable content."
    )
  }
  if (state.value === "idle" || state.value === "loading_arweave") {
    return setHeader(false, state, "", "")
  }

  if (state.value === "start_failure") {
    return setHeader(false, state, "An Error Ocurred", "Please reload the page and try again")
  }

  if (state.value === "auth_failure" || state.value === "auth_cancel") {
    return setHeader(
      false,
      state,
      "Failed to Authenticate Ownership",
      "This wallet does not have access to this Darkblock.",
      true,
      authenticate
    )
  }

  if (state.value === "started") {
    return setHeader(
      false,
      state,
      "Darkblock Content",
      "This NFT has unlockable content which only the owner can access."
    )
  }
  if (state.value === "decrypt_error") {
    return setHeader(onClose, state, "An Error Ocurred", "Please try again.", true)
  }
  if (state.value === "signing") {
    return setHeader(false, state, "Signature Requested", "Please sign with your wallet")
  }

  if (state.value === "wallet_connected") {
    return setHeader(
      onClose,
      "Darkblock Content",
      "This NFT has unlockable content which only the owner can access.",
      false,
      state,
      authenticate
    )
  }

  if (state.value === "authenticated" || state.value === "decrypting") {
    return setHeader(false, state, "Ownership Authenticated", "Decrypting...")
  }

  if (state.value === "display") {
    return setHeader(onClose, state, "Ownership Authenticated", "You can now access the content")
  }

  return setHeader(onClose, state, "An Error Ocurred", "Please try again.", true)
}

export default Header
