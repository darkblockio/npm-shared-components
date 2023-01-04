import React from "react"
import "./Titles.css"
import "../../i18n"
import { useTranslation } from "react-i18next"

const Titles = ({ state }) => {
  const db = state.context.display.stack.length
  const { t } = useTranslation()

  return (
    <div className="Darkblock-rowheader Darkblock-TableHeaderText">
      <div className="Darkblock-name-header">
        <span>{`${db} `}</span>
        <span className="Darkblock-name-header-items-count">{db > 1 ? t("titles.items") : t("titles.item")}</span>
      </div>
      <div className="Darkblock-items-header">
        <div className="Darkblock-format-header">{t("titles.fileSize")}</div>
        <div className="Darkblock-format-date">{t("titles.dateAdded")}</div>
        <div className="Darkblock-format-icon">
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Titles
