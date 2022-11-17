// import "./Main.scoped.scss"
import React from "react"
import { useTranslation } from "react-i18next"
import "../../i18n"
import "./Panel.scoped.css"

function Panel({ state = null }) {
  let ctx = state.context.display
  const { t } = useTranslation()

  return (
    <div className="DarkblockWidget-Main">
      <div className="row-db">
        <div className="col-left">
          <div className="heading">{t("panel.fileFormat")}</div>
          <div className="content">{ctx.fileFormat}</div>
        </div>
        <div className="col-right">
          <div className="heading">{t("panel.fileSize")}</div>
          <div className="content">{ctx.fileSize}</div>
        </div>
      </div>

      <div className="row-db">
        <div className="col-full">
          <div className="heading">Arweave Tx</div>
          <div className="content">
            <div className="underline">
              <a className="underline" target="_blank" rel="noreferrer" href={ctx.arweaveTXLink}>
                {ctx.arweaveTX}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
