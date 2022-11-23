import React from "react"

import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWallet, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import "../../i18n"
import LoadSpinnerState from "../Animations/LoadSpinnerState"
import Darkblocklogo from "../Animations/Logo/DarklblockLogo"
import Cross from "../Cross"
import Button from "../Button"

const setHeader = (onClose, state, title, text, red = false, authenticate = null) => {
  const { t } = useTranslation()
  const errorState = ["auth_failure", "start_failure", "decrypt_error"]
  const successState = ["loading_arweave", "authenticated", "decrypting"]
  const walletState = ["no_wallet", "wallet_connected", "display"]
  const moreStates = [...errorState, ...successState, "signing", "display"]

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
        {onClose !== false &&
          (state.value === "no_wallet" || state.value === "wallet_connected" || state.value === "display") && (
            <button className="DarkblockWidget-closeBtn" onClick={onClose}>
              <Cross />
            </button>
          )}

        <div className="DarkblockWidget-Header-Row">
          {state.value === "signing" && <FontAwesomeIcon icon={faWallet} className="Darkblock-FaWalletIcon awesome" />}
          {state.value === "display" && (
            <FontAwesomeIcon icon={faCircleCheck} className="Darkblock-FaCheckIcon awesome" />
          )}

          {errorState.includes(state.value) && (
            <FontAwesomeIcon icon={faTriangleExclamation} className="Darkblock-FaTriangleIcon awesome" />
          )}

          {!moreStates.includes(state.value) && (
            <div className="DarkblockWidget-Header-logo">
              <Darkblocklogo />
            </div>
          )}

          {successState.includes(state.value) && <LoadSpinnerState className="Darkblock-Icon" />}

          {(title || text) && (
            <div className="DarkblockWidget-Header-titleStack">
              <h3 className={red ? "Darkblock-title Darkblock-title-red" : "Darkblock-title"}>{title}</h3>
              <div className="Darkblock-dialog-message">{text}</div>
            </div>
          )}

          {!!authenticate && (
            <div className="DarkblockWidget-Header-authButton">
              <Button variant="secondary" className="Darkblock-auth-button" onClick={authenticate}>
                {t("header.authenticate")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Header = ({ onClose, state = null, authenticate }) => {
  var title = ""
  var text = ""
  const { t } = useTranslation()
  const authErrorState = ["auth_failure", "auth_cancel"]
  const authState = [...authErrorState, "wallet_connected"]

  switch (state.value) {
    case "no_wallet":
      title = t("state.noWalletTitle")
      text = t("state.noWalletText")
      break
    case "start_failure":
      title = t("state.startFailureTitle")
      text = t("state.startFailureText")
      break
    case "no_darkblock":
      if (state && state.context && state.context.display && state.context.display.rental) {
        title = t("state.rentalNftTitle")
        text = t("state.rentalNftText")
      } else {
        title = t("state.noDarkblockTitle")
        text = t("state.noDarkblockText")
      }
      break
    case "auth_failure":
      title = t("state.authFailureTitle")
      text = t("state.authFailureText")
      break
    case "auth_cancel":
      title = t("state.authCancelTitle")
      text = t("state.authCancelText")
      break
    case "started":
      title = t("state.startedTitle")
      text = t("state.startedText")
      break
    case "wallet_connected":
      title = t("state.walletConnectedTitle")
      text = t("state.walletConnectedText")
      break
    case "decrypt_error":
      title = t("state.decryptErrorTitle")
      text = t("state.decryptErrorText")
      break
    case "signing":
      title = t("state.signingTitle")
      text = t("state.signingText")
      break
    case "authenticated":
      title = t("state.ownershipAuth")
      text = t("state.decrypting")
      break
    case "decrypting":
      title = t("state.ownershipAuth")
      text = t("state.decrypting")
      break
    case "display":
      title = t("state.ownershipAuth")
      text = t("state.displayText")
      break
    default:
  }

  return setHeader(
    onClose,
    state,
    title,
    text,
    authErrorState.includes(state.value) ? true : false,
    authState.includes(state.value) ? authenticate : null
  )
}

export default Header
