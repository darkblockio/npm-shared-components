import React, { useState, useEffect } from "react"
import {
  faQrcode,
  faShareFromSquare,
  faEllipsisVertical,
  faCircleInfo,
  faDownload,
  faUpRightFromSquare,
  faQuestionCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { downloadFile } from "../utils"
import DetailModal from "./detailModal"
import QrCodeModal from "./qrCodeModal"
import SendToKindleModal from "./modals/sendToKindleModal"
import { useTranslation } from "react-i18next"
import Cross from "../Cross"

const RenderDetailIcon = ({ filetype, grayedOut = false }) => {
  let icon = faQuestionCircle
  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical
  if (filetype.indexOf("info") > -1) icon = faCircleInfo
  if (filetype.indexOf("download") > -1) icon = faDownload
  if (filetype.indexOf("qrCode") > -1) icon = icon = faQrcode
  if (filetype.indexOf("upRightFromSquare") > -1) icon = faUpRightFromSquare
  if (filetype.indexOf("eye") > -1) icon = faEye
  if (filetype.indexOf("closedEye") > -1) icon = faEyeSlash
  if (filetype.indexOf("shareFromSquare") > -1) icon = faShareFromSquare

  return <FontAwesomeIcon icon={icon} className={`Darkblock-ellIcon ${grayedOut ? "text-neutral-400" : ""}`} />
}
export default function EllipsisModal({ db, state = null, open, closeToggle, walletAddress }) {
  const url = db && db.url ? db.url : null
  const isDownloadable =
    state && state.value === "display" && url && db.downloadable.toString().toLowerCase() === "true"
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [senToKindleModal, setSendToKindleModal] = useState(false)
  const [showQrCodeModal, setShowQrCodeModal] = useState(false)
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  const fileNameTag = db.fileNameTag

  let truncateName = db.name.length > 35 ? `${db.name.substr(0, 17)}...${db.name.substr(-17)}` : db.name

  const { t } = useTranslation()

  const qrCodeClass = isDownloadable ? "darkblock-box-menu darkblock-is-downloadable" : "darkblock-is-not-downloadable"

  const isKindleSupported = (fileFormat) => {
    const kindleFormats = [
      "text/plain",
      "application/rtf",
      "application/epub+zip",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/gif",
      "application/pdf",
    ]
    return kindleFormats.includes(fileFormat)
  }

  return (
    <>
      {open ? (
        <div className="darkblock-elipsis-detail-modal">
          <div className="darkblock-dropdown">
            <div className="darkblock-dropdown-content">
              <div className="darkblock-titlebox-menu">
                <span className="darkblock-title-menu Darkblock-TableHeaderText">{truncateName}</span>
                <button className="darkblock-elipsis-cross-button" onClick={closeToggle}>
                  <Cross />
                </button>
              </div>
              <div className="darkblock-box-menu-items">
                {/* details Section */}
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

                {/* arweave Section */}
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

                {/* download Section */}
                <a
                  className={`Darkblock-BodyText ${
                    !isDownloadable ? "darkblock-is-not-downloadable" : "darkblock-cursor-pointer"
                  }`}
                  onClick={() => {
                    if (isDownloadable) {
                      downloadFile(url, fileFormat, truncateName, fileNameTag)
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

                {/* qrCode Section */}
                <div className={qrCodeClass}>
                  <a
                    className={`Darkblock-BodyText darkblock-box-menu ${
                      !isDownloadable ? "darkblock-is-not-downloadable" : "darkblock-cursor-pointer"
                    }`}
                    onClick={() => {
                      if (isDownloadable) {
                        setShowQrCodeModal(true)
                      } else {
                        return null
                      }
                    }}
                  >
                    <span className="darkblock-icons">
                      <RenderDetailIcon filetype={"qrCode"} grayedOut={!isDownloadable} />
                    </span>
                    <span className={`darkblock-placeholder ${!isDownloadable ? "text-neutral-400" : ""}`}>
                      Scan QR code to download
                    </span>
                  </a>
                </div>

                {/* send to kindle section | faShareFromSquare */}
                {isKindleSupported(fileFormat) && (
                  <>
                    <div>
                      <a
                        className={`Darkblock-BodyText darkblock-box-menu ${
                          state && state.value !== "display" ? "darkblock-is-not-active" : "darkblock-cursor-pointer"
                        }`}
                        onClick={(event) => {
                          // Prevent onClick event if the state is not 'display'
                          if (state && state.value !== "display") {
                            event.preventDefault()
                            return
                          }

                          if (isKindleSupported(fileFormat)) {
                            setSendToKindleModal(true)
                          }
                        }}
                      >
                        <span className="darkblock-icons">
                          <RenderDetailIcon
                            filetype={"shareFromSquare"}
                            grayedOut={state && state.value !== "display"}
                          />
                        </span>
                        <span
                          className={`darkblock-placeholder ${
                            state && state.value !== "display" ? "text-neutral-400" : ""
                          }`}
                        >
                          Send to Kindle
                        </span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <DetailModal db={db} open={showDetailModal} onClose={() => setShowDetailModal(!showDetailModal)} state={state} />
      <QrCodeModal db={db} open={showQrCodeModal} onClose={() => setShowQrCodeModal(!showQrCodeModal)} state={state} />
      <SendToKindleModal
        db={db}
        open={senToKindleModal}
        onClose={() => setSendToKindleModal(!senToKindleModal)}
        state={state}
        url={db.url}
        walletAddress={walletAddress}
      />
    </>
  )
}
