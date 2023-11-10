import React from "react"
import StaticDBLogo from "../Panel/staticDBLogo"
import "../../i18n"
import { useTranslation } from "react-i18next"
import Info from "../../assets/images/info-button.svg"
import EmbedButton from "./../EmbedButton"

export default function FooterSharedComponents(config, state) {
  const { t } = useTranslation()

  return (
    <div className="DarkblockWidget-Footer">
      <div className="Darkblock-Footer-Content">
        <p className="Darkblock-FooterText-Embed">{t("footer.poweredBy")} &nbsp;</p>
        <a href="https://darkblock.io" target="_blank" rel="noopener noreferrer">
          <StaticDBLogo />
        </a>
      </div>
      <div className="Darkblock-Footer-Buttons">
        <div className="Darkblock-Footer-Info">
          <img src={Info} alt="Info" />
        </div>
        <EmbedButton />
      </div>
      {config.debug && <p className="Darkblock-Footer-Debug">state: {state.value}</p>}
    </div>
  )
}
