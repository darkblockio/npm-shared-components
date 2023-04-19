import React, { useState, useEffect } from "react"
import {
  faEllipsisVertical,
  faCircleInfo,
  faDownload,
  faUpRightFromSquare,
  faQuestionCircle,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { downloadFile } from "../utils"
import DetailModal from "./detailModal"
import { useTranslation } from "react-i18next"
import Cross from "../Cross"

const RenderDetailIcon = ({ filetype }) => {
  let icon = faQuestionCircle
  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical
  if (filetype.indexOf("info") > -1) icon = faCircleInfo
  if (filetype.indexOf("download") > -1) icon = faDownload
  if (filetype.indexOf("upRightFromSquare") > -1) icon = faUpRightFromSquare
  if(filetype.indexOf("eye") > -1) icon = faEye
  if(filetype.indexOf("closedEye") > -1 ) icon = faEyeSlash

  return <FontAwesomeIcon icon={icon} className="Darkblock-ellIcon" />
}
export default function EllipsisModal({ db, state = null, open, closeToggle }) {
  const url = db && db.url ? db.url : null
  const isDownloadable =
    state && state.value === "display" && url && db.downloadable.toString().toLowerCase() === "true"
  const [showDetailModal, setShowDetailModal] = useState(false)
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let truncateName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`
 
  // const [isVisible, setIsVisible ] = useState(true)
  // const handleVisibility = () => {
  //   setIsVisible(!isVisible)
  // }

  const { t } = useTranslation()
  return (
    <>
      {open ? (
        <div className="darkblock-elipsis-detail-modal">
          <div className="darkblock-dropdown">
            <div className="darkblock-dropdown-content">
              <div className="darkblock-titlebox-menu">
                <span className="darkblock-title-menu Darkblock-TableHeaderText">{db.name}</span>
                <button className="darkblock-elipsis-cross-button" onClick={closeToggle}>
                  <Cross />
                </button>
              </div>
              <div className="darkblock-box-menu-items">
                <a
                  className="Darkblock-BodyText darkblock-box-menu darkblock-cursor-pointer"
                  onClick={() => setShowDetailModal(true)}
                >
                  <span className="darkblock-icons">
                    <RenderDetailIcon filetype={"info"} />
                  </span>
                  <span className="darkblock-placeholder">{t("elipsis.details")}</span>
                </a>


                {/* <a
                  className="Darkblock-BodyText darkblock-box-menu darkblock-cursor-pointer"
                  onClick={() => setIsVisible(false)}
                >
                  <span className="darkblock-icons">
                    <RenderDetailIcon filetype={"eye"} />
                  </span>
                  <span className="darkblock-placeholder">{t("elipsis.showHide")}</span>
                </a> */}


                <a
                  className={`Darkblock-BodyText ${
                    !isDownloadable ? "darkblock-is-not-downloadable" : "darkblock-cursor-pointer"
                  }`}
                  onClick={() => {
                    if (isDownloadable) {
                      downloadFile(url, fileFormat, truncateName)
                    } else {
                      return null
                    }
                  }}
                >
                  <span className="darkblock-icons">
                    <RenderDetailIcon filetype={"download"} />
                  </span>
                  <span className="darkblock-placeholder">{t("elipsis.download")}</span>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="darkblock-box-menu Darkblock-BodyText"
                  href={db.arweaveTXLink}
                >
                  <span className="darkblock-icons">
                    <RenderDetailIcon filetype={"upRightFromSquare"} />
                  </span>
                  <span className="darkblock-placeholder">Arweave</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <DetailModal db={db} open={showDetailModal} onClose={() => setShowDetailModal(!showDetailModal)} state={state}/>
    </>
  )
}
