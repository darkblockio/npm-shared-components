import React from "react"
import "./Header.scoped.css"
import Logo from "../Animations/Logo"

const setHeader = (title, text, red = false, authenticate = null) => {
  return (
    <div className="DarkblockWidget-Header">
      <div className="DarkblockWidget-Header-Row">
        <div className={red ? "title-red" : "title"}>{title}</div>
        <div className="Darkblock-Icon">
          <div className="dbLogo">
            <Logo loop={false} />
          </div>
        </div>
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
    return setHeader(
      "Darkblock Detected",
      "Only the NFT owner can view the Darkblock. Authenticate ownership to decrypt and display the Darkblock."
    )
  }

  if (state.value === "start_failure") {
    return setHeader(
      "No Darkblock Detected",
      "A Darkblock is content that can only be accessed by the NFT owner. Only the creator of the NFT can create a Darkblock."
    )
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
      "Darkblock Detected",
      "Only the NFT owner can view the Darkblock. Authenticate ownership to decrypt and display the Darkblock."
    )
  }

  if (state.value === "wallet_connected") {
    return setHeader(
      "Darkblock Detected",
      "Only the NFT owner can view the Darkblock. Authenticate ownership to decrypt and display the Darkblock.",
      false,
      authenticate
    )
  }

  if (state.value === "authenticated" || state.value === "decrypting") {
    return setHeader("Ownership Authenticated", "Decrypting Darkblock...")
  }

  return setHeader("(Stateless)", "Error: the widget went into an error state", true)
}

export default Header
