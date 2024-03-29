import React from "react"
import StaticDBLogo from "../Panel/staticDBLogo"
import "../Upgrader"
import "../../i18n"
import { useTranslation } from "react-i18next"

export default function FooterUpgrader() {
  const { t } = useTranslation()

  return (
    <>
      <div className="DarkblockWidget-Footer">
        <p className="Darkblock-FooterText">{t("footer.poweredBy")} &nbsp;</p>
        <div>
          <StaticDBLogo />
        </div>
      </div>
    </>
  )
}
