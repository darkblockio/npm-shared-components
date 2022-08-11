import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import UpgradeModal from "./upgrade.modal"
import "./Upgrader.css"

const Upgrader = ({ state = null, config, apiKey = null, authenticate }) => {
  const [showButton, setShowButton] = useState(false)
  const [apiKeyValid, setApiKeyValid] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(() => {
    if (apiKey && apiKey.length > 0) {
      setApiKeyValid(apiKey)
    }
  }, [apiKey])

  useEffect(() => {
    if (
      state.value === "show_upgrade" ||
      state.value === "show_upgrade_complete" ||
      state.value === "show_upgrade_error"
    ) {
      setShowButton(true)
    }
  }, [state.value])

  if (showButton && apiKeyValid) {
    return (
      <div
        className={
          config.customCssClass ? `DarkblockWidget-Upgrader ${config.customCssClass}` : `DarkblockWidget-Upgrader`
        }
      >
        <>
          <div>shared library button</div>
          <button type={"button"} onClick={() => setShowUpgrade(true)} className="upgrade-add-content">
            <FontAwesomeIcon icon={faPlus} />
            Add Content
          </button>
          <UpgradeModal
            apiKey={apiKey}
            state={state}
            open={showUpgrade}
            onClose={() => setShowUpgrade(false)}
            className="upgrade-modal"
            authenticate={authenticate}
          />
        </>
      </div>
    )
  } else {
    return <></>
  }
}

export default Upgrader
