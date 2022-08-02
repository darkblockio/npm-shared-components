import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import UpgradeModal from "./upgrade.modal"
import "./Upgrader.css"

const Upgrader = ({ state = null, config, apiKey = null }) => {
  const [showButton, setShowButton] = useState(false)
  const [apiKeyValid, setApiKeyValid] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(() => {
    setApiKeyValid(apiKey && apiKey.length > 0)
  }, [apiKey])

  useEffect(() => {
    if (state.value === "authorized") {
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
        <button type={"button"} onClick={() => setShowUpgrade(true)} className="upgrade-add-content">
          <FontAwesomeIcon icon={faPlus} />
          Add Content
        </button>
        <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} className="upgrade-modal" />
      </div>
    )
  } else if (!apiKeyValid) {
    return <div>Valid API key required</div>
  } else {
    return <div></div>
  }
}

export default Upgrader
