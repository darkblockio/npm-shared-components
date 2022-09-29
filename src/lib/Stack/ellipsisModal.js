import React, { useState, useEffect } from "react"
import {
  faEllipsisVertical,
  faCircleInfo,
  faDownload,
  faUpRightFromSquare,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AiOutlineClose } from "react-icons/ai"
import { downloadFile } from "../utils"
import DetailModal from "./detailModal"

const RenderDetailIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical
  if (filetype.indexOf("info") > -1) icon = faCircleInfo
  if (filetype.indexOf("download") > -1) icon = faDownload
  if (filetype.indexOf("upRightFromSquare") > -1) icon = faUpRightFromSquare

  return <FontAwesomeIcon icon={icon} className="ellIcon" />
}
export default function EllipsisModal({ db, state = null, open, closeToggle }) {
  const url = db && db.url ? db.url : null
  const isDownloadable =
    state && state.value === "display" && url && db.downloadable.toString().toLowerCase() === "true"
  const [showDetailModal, setShowDetailModal] = useState(false)
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let truncateName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`

  return (
    <>
      {open ? (
        <div className="db-elipsis-detail-modal">
          <div className="db-dropdown">
            <div className="db-dropdown-content">
              <div className="db-titlebox-menu">
                {db.name}
                <button onClick={closeToggle}>
                  <AiOutlineClose />
                </button>
              </div>
              <a className="db-box-menu " onClick={() => setShowDetailModal(true)}>
                <span className="icons">
                  <RenderDetailIcon filetype={"info"} />
                </span>
                <span className="placeholder">Details</span>
              </a>
              <a
                className={`db-box-menu ${!isDownloadable ? "db-is-not-downloadable" : "db-is-downloadable"}`}
                onClick={() => {
                  if (isDownloadable) {
                    downloadFile(url, fileFormat, truncateName)
                  } else {
                    return null
                  }
                }}
              >
                <span className="icons">
                  <RenderDetailIcon filetype={"download"} />
                </span>
                <span className="placeholder">Download</span>
              </a>
              <a target="_blank" rel="noreferrer" className="db-box-menu" href={db.arweaveTXLink}>
                <span className="icons">
                  <RenderDetailIcon filetype={"upRightFromSquare"} />
                </span>
                <span className="placeholder">Arweave</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
      <DetailModal db={db} open={showDetailModal} onClose={() => setShowDetailModal(!showDetailModal)} />
    </>
  )
}
