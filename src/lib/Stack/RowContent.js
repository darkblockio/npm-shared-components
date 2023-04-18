import React, { useState } from "react"
import { RenderEllipsisIcon, RenderIcon } from "./AuxFunctions"
// import VerifiedIcon from "../../assets/images/verified.svg"

const RowContent = ({ db, f = null, selected = false, index = 0, showDetailModal }) => {
  const [selectedRow, setSelectedRow] = useState(false)
  console.log(db, 'dbRowContent')
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.0281 17.7146L5.96721 17.2449C5.77986 17.2058 5.62998 17.1045 5.51756 16.9412C5.40515 16.7778 5.36144 16.5986 5.38642 16.4034L5.59251 14.1919L4.18735 12.5088C4.06245 12.3653 4 12.1957 4 12C4 11.8043 4.06245 11.6347 4.18735 11.4912L5.59251 9.8081L5.38642 7.59663C5.36144 7.40092 5.40515 7.2214 5.51756 7.05805C5.62998 6.8947 5.77986 6.79372 5.96721 6.7551L8.0281 6.2854L9.11475 4.36749C9.21468 4.19788 9.35207 4.08698 9.52693 4.03479C9.7018 3.9826 9.87666 3.98913 10.0515 4.05436L12 4.91547L13.9485 4.05436C14.1233 3.98913 14.2982 3.9826 14.4731 4.03479C14.6479 4.08698 14.7853 4.19788 14.8852 4.36749L15.9719 6.2854L18.0328 6.7551C18.2201 6.79424 18.37 6.89522 18.4824 7.05805C18.5948 7.22088 18.6386 7.4004 18.6136 7.59663L18.4075 9.8081L19.8126 11.4912C19.9375 11.6347 20 11.8043 20 12C20 12.1957 19.9375 12.3653 19.8126 12.5088L18.4075 14.1919L18.6136 16.4034C18.6386 16.5991 18.5948 16.7786 18.4824 16.942C18.37 17.1053 18.2201 17.2063 18.0328 17.2449L15.9719 17.7146L14.8852 19.6325C14.7853 19.8021 14.6479 19.913 14.4731 19.9652C14.2982 20.0174 14.1233 20.0109 13.9485 19.9456L12 19.0845L10.0515 19.9456C9.87666 20.0109 9.7018 20.0174 9.52693 19.9652C9.35207 19.913 9.21468 19.8021 9.11475 19.6325L8.0281 17.7146ZM10.6885 14.231C10.8259 14.3746 11.0008 14.4463 11.2131 14.4463C11.4254 14.4463 11.6003 14.3746 11.7377 14.231L14.9227 10.9041C15.0726 10.7475 15.1475 10.5617 15.1475 10.3467C15.1475 10.1317 15.0726 9.94562 14.9227 9.78853C14.7728 9.63197 14.5947 9.55368 14.3884 9.55368C14.182 9.55368 14.0042 9.63197 13.8548 9.78853L11.2131 12.548L10.1265 11.4325C9.97658 11.2889 9.79847 11.2203 9.59213 11.2266C9.38579 11.2328 9.21418 11.308 9.07728 11.452C8.93989 11.5955 8.87119 11.7782 8.87119 12C8.87119 12.2218 8.93989 12.4045 9.07728 12.548L10.6885 14.231Z"
                fill="#737373"
              />
            </svg>
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
