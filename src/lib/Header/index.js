import React from "react"
import "./Header.css"
import Logo from "../Animations/Logo"

const setHeader = (title, text, red = false, authenticate = null) => {
  return (
    <div className="DarkblockWidget-Header">
      <div className="DarkblockWidget-Header-Row">
        <div className="Darkblock-Icon">
          <Logo loop={false} />
        </div>
      </div>

      <div className="DarkblockWidget-Header-Row">
        <div className={red ? "title-red" : "title"}>{title}</div>
      </div>
      <div className="DarkblockWidget-Header-Row">
        <p className="content">{text}</p>
      </div>
      <div className="DarkblockWidget-Header-Row">
        {!!authenticate && (
          <button onClick={authenticate} className="inner-button">
            Authenticate Ownership
          </button>
        )}
      </div>
    </div>
  )
}

const Header = ({ state = null, authenticate }) => {
  if (state.value === "idle" || state.value === "loading_arweave") {
    return setHeader("", "")
  }

  if (state.value === "start_failure") {
    return setHeader("No Darkblock Detected", "This NFT has unlockable content which only the owner can access.")
  }

  if (state.value === "auth_failure" || state.value === "auth_cancel") {
    return setHeader(
      "Failed to Authenticate Ownership",
      "This wallet does not have access to this Darkblock. Make sure you are connected with the correct wallet.",
      true,
      authenticate
    )
  }

  if (state.value === "started" || state.value === "signing") {
    return setHeader(
      "Darkblock Unlockable Content",
      "Only the NFT owner can view the Darkblock. Authenticate ownership to decrypt and display the Darkblock."
    )
  }

  if (state.value === "wallet_connected") {
    return setHeader(
      "Darkblock Unlockable Content",
      "Only the NFT owner can view the Darkblock. Authenticate ownership to decrypt and display the Darkblock.",
      false,
      authenticate
    )
  }

  if (state.value === "authenticated" || state.value === "decrypting" || state.value === "display") {
    return setHeader("Ownership Authenticated", "Decrypting Darkblock...")
  }

  return setHeader("Error", "The widget went into an error state", true)
}

export default Header
