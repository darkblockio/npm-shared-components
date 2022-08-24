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
export default function EllipsisModal({ db, state = null, urls = null, open, closeToggle }) {
  
  const isDownloadable = state && state.value === "display" && urls && db.downloadable.toString().toLowerCase() === "true"
  const [showDetailModal, setShowDetailModal] = useState(false)
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let truncatedName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`


  return (
    <>
      {open ? (
        <div>
          <div className="dropdown">
            <div className="dropdownContent">
              <div className="titleBoxMenu">
                {db.name}
                <button onClick={closeToggle}>
                  <AiOutlineClose />
                </button>
              </div>
              <a className="boxMenu" onClick={() => setShowDetailModal(true)}>
                <span className="icons">
                  <RenderDetailIcon filetype={"info"} />
                </span>
                <span className="placeHolder">Details</span>
              </a>
              <a
                className={`boxMenu ${!isDownloadable ? "cursor-not-allowed text-gray-300" : ""}`}
                onClick={() => {
                  if (isDownloadable=true) {
                    downloadFile(urls, fileFormat, truncatedName)
                  } else {
                    return null
                  }
                }}
              >
                <span className="icons">
                  <RenderDetailIcon filetype={"download"} />
                </span>
                <span className="placeHolder">Download</span>
              </a>
              <a target="_blank" rel="noreferrer" className="boxMenu" href={db.arweaveTXLink}>
                <span className="icons">
                  <RenderDetailIcon filetype={"upRightFromSquare"} />
                </span>
                <span className="placeHolder">Arweave</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
      <DetailModal db={db} open={showDetailModal} onClose={() => setShowDetailModal(!showDetailModal)} />
    </>
  )
}
