import React, { useState } from "react"
import { RenderEllipsisIcon, RenderIcon } from "./AuxFunctions"

const RowContent = ({ db, f = null, selected = false, index = 0, showDetailModal }) => {
  const [selectedRow, setSelectedRow] = useState(false)
  const isRowActive = selected.i === index && selectedRow
  let fn = f && typeof f === "function" ? f : () => {
  }
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
          <div className="darkblock-right-text" style={{fontSize: '12px'}} onClick={fn}>
            {db.fileSize}
          </div>
          <div className="Darkblock-date" style={{fontSize: '12px'}} onClick={fn}>
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
