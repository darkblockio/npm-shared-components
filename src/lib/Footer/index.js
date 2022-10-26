import React, { useState } from "react"
import StaticDBLogo from "../Panel/staticDBLogo"
import '../../i18n'
import { useTranslation } from "react-i18next"
import i18n from "../../i18n"

export default function FooterSharedComponents(config, state) {
  const { t } = useTranslation()

  const [language, setLanguage] = useState('en')
  const ChangeLenguage = (language) => {
    language == 'en' ? setLanguage('es') : setLanguage('en')
    i18n.changeLanguage(language)
  }
  return (
    <>
      <div className="DarkblockWidget-Footer">
        <p>{t('footer.poweredBy')} &nbsp;</p>
        <div>
          <StaticDBLogo />
        </div>

        {config.debug && <p>state: {state.value}</p>}
      </div>
      <button type={"button"} onClick={() => ChangeLenguage(language)} className="text-xl border border-black">
        Change language
      </button>
    </>
  )
}
