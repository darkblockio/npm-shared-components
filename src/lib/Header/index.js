import React from "react"
import "./Header.css"
import Logo from "../Animations/Logo"
import { AiOutlineClose } from "react-icons/ai"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWallet, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const setHeader = (onClose, state, title, text, red = false, authenticate = null) => {
  return (
    <div
      className="DarkblockWidget-Header"
      style={{
        borderColor:
          state.value === "auth_failure" || state.value === "start_failure" || state.value === "decrypt_error"
            ? "#EF4444"
            : state.value === "display"
            ? "#22C55E"
            : "rgb(243 244 246)",
      }}
    >
      <div className="DarkblockWidget-HeaderContent">
        {onClose !== false && (
          <button className="DarkblockWidget-closeBtn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        )}

        <div className="DarkblockWidget-Header-Row">
          {state.value === "signing" && <FontAwesomeIcon icon={faWallet} className="FaWalletIcon awesome" />}
          {state.value === "display" && <FontAwesomeIcon icon={faCircleCheck} className="FaCheckIcon awesome" />}

          {(state.value === "auth_failure" || state.value === "start_failure" || state.value === "decrypt_error") && (
            <FontAwesomeIcon icon={faTriangleExclamation} className="FaTriangleIcon awesome" />
          )}

          {state.value !== "auth_failure" &&
            state.value !== "start_failure" &&
            state.value !== "decrypt_error" &&
            state.value !== "signing" &&
            state.value !== "display" && (
              <div className="DarkblockWidget-Header-logo">
                <Logo className="Darkblock-Icon" />
              </div>
            )}

          {(title || text) && (
            <div className="DarkblockWidget-Header-titleStack">
              <div className={red ? "Darkblock-title Darkblock-title-red" : "Darkblock-title"}>{title}</div>
              <div className="Darkblock-content">{text}</div>
            </div>
          )}

          {!!authenticate && (
            <div className="DarkblockWidget-Header-authButton">
              <button onClick={authenticate} className="Darkblock-inner-button">
                Authenticate Ownership
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Header = ({ onClose, state = null, authenticate, show = true }) => {
  var title = ""
  var text = ""

  switch (state.value) {
    case "no_wallet":
      title = "No wallet connected"
      text = "Please connect a wallet to view Darkblock unlockable content."

      break
    case "start_failure":
      title = "An Error Ocurred"
      text = "Please reload the page and try again"
      break

    case "no_darkblock":
      title = "No Darkblock Content"
      text =
        "There is no unlockable content here or if a new NFT, there might be a slight delay between creation of NFT and unlockables because of indexing"
      break
    case "auth_failure":
      title = "Failed to Authenticate Ownership"
      text = "This wallet does not have access to this Darkblock."
      break
    case "auth_cancel":
      title = "Failed to Authenticate Ownership"
      text = "This wallet does not have access to this Darkblock."
      break
    case "started":
      title = "Darkblock Content"
      text = "This NFT has unlockable content which only the owner can access."
      break
    case "wallet_connected":
      title = "Darkblock Content"
      text = "This NFT has unlockable content which only the owner can access."
      break
    case "decrypt_error":
      title = "An Error Ocurred"
      text = "Please try again."
      break
    case "signing":
      title = "Signature Requested"
      text = "Please sign with your wallet"
      break
    case "authenticated":
      title = "Ownership Authenticated"
      text = "Decrypting..."
      break
    case "decrypting":
      title = "Ownership Authenticated"
      text = "Decrypting..."
      break
    case "display":
      title = "Ownership Authenticated"
      text = "You can now access the content"
      break
    default:
  }

  return setHeader(
    onClose,
    state,
    title,
    text,
    state.value === "auth_failure" || state.value === "auth_cancel" ? true : false,
    state.value === "auth_failure" || state.value === "auth_cancel" || state.value === "wallet_connected"
      ? authenticate
      : null
  )
}

export default Header
