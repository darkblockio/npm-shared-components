import React, { useState, useEffect } from "react"
import {
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
import { useTranslation } from "react-i18next"
import Cross from "../Cross"

const RenderDetailIcon = ({ filetype }) => {
  let icon = faQuestionCircle
  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical
  if (filetype.indexOf("info") > -1) icon = faCircleInfo
  if (filetype.indexOf("download") > -1) icon = faDownload
  if (filetype.indexOf("upRightFromSquare") > -1) icon = faUpRightFromSquare
  if (filetype.indexOf("eye") > -1) icon = faEye
  if (filetype.indexOf("closedEye") > -1) icon = faEyeSlash

  return <FontAwesomeIcon icon={icon} className="Darkblock-ellIcon" />
}
export default function EllipsisModal({ db, state = null, open, closeToggle }) {
  const url = db && db.url ? db.url : null
  const isDownloadable =
    state && state.value === "display" && url && db.downloadable.toString().toLowerCase() === "true"
  const [showDetailModal, setShowDetailModal] = useState(false)
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  let truncateName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

//This needs to be adjusted to show and hide only the one darkblock
  const combinedData = `Arweave TX: ${db.arweaveTX}, NFT ID: ${db.nftId}`;

  const toggleVisibility = async (isVisible) => {
    const status = isVisible ? "hidden" : "visible"
    
    const response = await fetch(
      //"https://dev1.darkblock.io/v1/darkblock/update/status?apikey=hcwmyaeyetmgcbkksr9nmdyeg9c4",
      // add tx-id and nft-id to the url below <epoch>_<signature> walletaddress to the json body
      "https://api.darkblock.io/v1/darkblock/update/status?apikey=hcwmyaeyetmgcbkksr9nmdyeg9c4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: db.id, //check where this is coming from
          status: status,
          nft_id: db.nft_id,
          platform: state.context.platform, //check that this is correct
        }),
      }
      )
     
    const data = await response.json()
    
    if (data.message === "Operation Successful") {
      // Update the UI to reflect the new status 
      setIsVisible(!isVisible)
      
    } else {
      "Sorry we couldn't hide this darkblock"
    }
  }
  
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

                <a className="Darkblock-BodyText darkblock-box-menu darkblock-cursor-pointer">
                  <span className="darkblock-icons">
                    {/* <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.777778 0.987778L1.77333 0L14.7778 13.0044L13.79 14L11.3944 11.6044C10.5 11.9 9.55111 12.0556 8.55556 12.0556C4.66667 12.0556 1.34556 9.63667 0 6.22222C0.536667 4.85333 1.39222 3.64778 2.48111 2.69111L0.777778 0.987778ZM8.55556 3.88889C9.17439 3.88889 9.76789 4.13472 10.2055 4.57231C10.6431 5.00989 10.8889 5.60338 10.8889 6.22222C10.8893 6.48711 10.8446 6.75013 10.7567 7L7.77778 4.02111C8.02765 3.93321 8.29067 3.8885 8.55556 3.88889ZM8.55556 0.388889C12.4444 0.388889 15.7656 2.80778 17.1111 6.22222C16.4763 7.83472 15.3976 9.23433 14 10.2589L12.8956 9.14667C13.9711 8.40263 14.8386 7.39593 15.4156 6.22222C14.7868 4.93884 13.8106 3.8576 12.5979 3.10139C11.3852 2.34519 9.9847 1.94435 8.55556 1.94444C7.70778 1.94444 6.87556 2.08444 6.09778 2.33333L4.9 1.14333C6.02 0.661111 7.25667 0.388889 8.55556 0.388889ZM1.69556 6.22222C2.32434 7.5056 3.30056 8.58685 4.51323 9.34305C5.72591 10.0993 7.12642 10.5001 8.55556 10.5C9.09222 10.5 9.62111 10.4456 10.1111 10.3367L8.33778 8.55556C7.79657 8.49755 7.29153 8.25601 6.90665 7.87113C6.52176 7.48625 6.28023 6.98121 6.22222 6.44L3.57778 3.78778C2.80778 4.44889 2.16222 5.27333 1.69556 6.22222Z"
                        fill="currentColor"
                      />
                    </svg> */}
                    <RenderDetailIcon filetype={"closedEye"} />
                  </span>
                  <span onClick={toggleVisibility} className="darkblock-placeholder">{t("elipsis.showHide")}</span>
                </a>

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
      <DetailModal db={db} open={showDetailModal} onClose={() => setShowDetailModal(!showDetailModal)} state={state} />
    </>
  )
}


// function isCreator() {
  //   const darkblockCreator = db.find((tag) => tag.name === "NFT-Creator").value
  //   const dbstackCreators = db.dbstack.map((db) => {
  //     return db.find((tag) => tag.name === "NFT-Creator").value
  //   })

  //   console.log(dbstackCreators, "DarkblockCreator")
  //   return darkblockCreator === creatorAddress || dbstackCreators.includes(creatorAddress)
  // }
  // isCreator()