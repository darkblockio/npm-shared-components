import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import UpgradeModal from "./upgrade.modal"
import "./Upgrader.css"
import '../../i18n'
import { useTranslation } from "react-i18next"
import i18n from "../../i18n"

const Upgrader = ({ state = null, config, apiKey = null, authenticate, reset }) => {
  const [showButton, setShowButton] = useState(false)
  const [apiKeyValid, setApiKeyValid] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [language, setLanguage] = useState('en')
  const { t } = useTranslation()

  useEffect(() => {
    if (apiKey && apiKey.length > 0) {
      setApiKeyValid(apiKey)
    }
  }, [apiKey])

  useEffect(() => {
    if (
      state.value === "show_upgrade" ||
      state.value === "show_upgrade_signing" ||
      state.value === "show_upgrade_complete" ||
      state.value === "show_upgrade_error"
    ) {
      setShowButton(true)
    }
  }, [state.value])

  const ChangeLenguage = (language) => {
    language == 'en' ? setLanguage('es') : setLanguage('en')
    i18n.changeLanguage(language)
  }

  if (showButton && apiKeyValid) {
    return (
      <div
        className={
          config.customCssClass ? `DarkblockWidget-Upgrader ${config.customCssClass}` : `DarkblockWidget-Upgrader`
        }
      >
        <>
          <button type={"button"} onClick={() => setShowUpgrade(true)} className="Darkblock-upgrade-add-content">
            <FontAwesomeIcon icon={faPlus} />
            {t('upgrader.addContent')}
          </button>
          <button type={"button"} onClick={() => ChangeLenguage(language)} className="Darkblock-upgrade-add-content">
            Cambiar idioma
          </button>
          <UpgradeModal
            apiKey={apiKey}
            state={state}
            open={showUpgrade}
            onClose={() => setShowUpgrade(false)}
            className="Darkblock-upgrade-modal"
            authenticate={authenticate}
            reset={reset}
          />
        </>
      </div>
    )
  } else {
    return <></>
  }
}

export default Upgrader
