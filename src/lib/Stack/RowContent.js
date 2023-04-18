import React, { useState } from "react"
import { RenderEllipsisIcon, RenderIcon } from "./AuxFunctions"
// import VerifiedIcon from "../../assets/images/verified.svg"

const RowContent = ({ db, f = null, selected = false, index = 0, showDetailModal, verified }) => {
  const [selectedRow, setSelectedRow] = useState(false)
  const isRowActive = selected.i === index && selectedRow
  let fn = f && typeof f === "function" ? f : () => {}
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)
  return (
    <>
      <div className={`dbdata ${isRowActive && "dbdataSelected"}`} onClick={() => setSelectedRow(true)}>
        <div className="Darkblock-name" onClick={fn}>
          <RenderIcon filetype={db.fileFormat} />
          <span className="Darkblock-truncate Darkblock-BodyText">{`${db.name}`}</span>
        </div>
        <div className="Darkblock-items Darkblock-BodyTextSmall">
          <div>
            {verified === "creator" && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.69025 11.7623L1.97284 11.3709C1.81671 11.3383 1.69181 11.2539 1.59813 11.1178C1.50446 10.9817 1.46803 10.8323 1.48884 10.6696L1.66058 8.82675L0.489624 7.42419C0.385539 7.30459 0.333496 7.16325 0.333496 7.00016C0.333496 6.83708 0.385539 6.69573 0.489624 6.57613L1.66058 5.17358L1.48884 3.33069C1.46803 3.1676 1.50446 3.01799 1.59813 2.88187C1.69181 2.74575 1.81671 2.66159 1.97284 2.62941L3.69025 2.238L4.59579 0.639739C4.67906 0.498396 4.79355 0.40598 4.93927 0.362489C5.08499 0.318999 5.23071 0.324436 5.37643 0.378798L7.00016 1.09638L8.62389 0.378798C8.76961 0.324436 8.91533 0.318999 9.06105 0.362489C9.20677 0.40598 9.32127 0.498396 9.40454 0.639739L10.3101 2.238L12.0275 2.62941C12.1836 2.66203 12.3085 2.74618 12.4022 2.88187C12.4959 3.01756 12.5323 3.16716 12.5115 3.33069L12.3397 5.17358L13.5107 6.57613C13.6148 6.69573 13.6668 6.83708 13.6668 7.00016C13.6668 7.16325 13.6148 7.30459 13.5107 7.42419L12.3397 8.82675L12.5115 10.6696C12.5323 10.8327 12.4959 10.9823 12.4022 11.1185C12.3085 11.2546 12.1836 11.3387 12.0275 11.3709L10.3101 11.7623L9.40454 13.3606C9.32127 13.5019 9.20677 13.5943 9.06105 13.6378C8.91533 13.6813 8.76961 13.6759 8.62389 13.6215L7.00016 12.9039L5.37643 13.6215C5.23071 13.6759 5.08499 13.6813 4.93927 13.6378C4.79355 13.5943 4.67906 13.5019 4.59579 13.3606L3.69025 11.7623ZM5.90727 8.85936C6.02176 8.97896 6.16748 9.03876 6.34443 9.03876C6.52137 9.03876 6.66709 8.97896 6.78158 8.85936L9.43576 6.08687C9.56066 5.9564 9.62311 5.80158 9.62311 5.6224C9.62311 5.44322 9.56066 5.28818 9.43576 5.15727C9.31086 5.0268 9.16243 4.96157 8.99048 4.96157C8.81853 4.96157 8.67032 5.0268 8.54583 5.15727L6.34443 7.45681L5.43888 6.52721C5.31398 6.40761 5.16555 6.35042 4.99361 6.35564C4.82166 6.36086 4.67864 6.42348 4.56457 6.54352C4.45007 6.66312 4.39283 6.81533 4.39283 7.00016C4.39283 7.185 4.45007 7.33721 4.56457 7.45681L5.90727 8.85936Z"
                  fill="#737373"
                />
              </svg>
            )}
            {verified === "ogc" && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.99992 7.00016C8.83325 7.00016 10.3333 5.50016 10.3333 3.66683C10.3333 1.8335 8.83325 0.333496 6.99992 0.333496C5.16658 0.333496 3.66659 1.8335 3.66659 3.66683C3.66659 5.50016 5.16658 7.00016 6.99992 7.00016ZM6.99992 7.8335C3.58325 7.8335 0.333252 10.0002 0.333252 12.0002C0.333252 13.6668 6.99992 13.6668 6.99992 13.6668C6.99992 13.6668 13.6666 13.6668 13.6666 12.0002C13.6666 10.0002 10.4166 7.8335 6.99992 7.8335Z"
                  fill="#737373"
                />
              </svg>
            )}
          </div>
          <div className="darkblock-right-text" onClick={fn}>
            {db.fileSize}
          </div>
          <div className="Darkblock-date" onClick={fn}>
            {d.toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
          <div className="darkblock-toggleBtn">
            <div
              onClick={() => {
                showDetailModal(db)
              }}
              className="darkblock-toggle-container"
            >
              <button className="darkblock-toggle">
                <RenderEllipsisIcon filetype={"ellipsis"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RowContent
