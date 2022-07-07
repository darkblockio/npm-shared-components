import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGlobe,
  faQuestionCircle,
  faFilePdf,
  faFilm,
  faImage,
  faFileZipper,
  faMusic,
  faCube,
  faAngleDown,
  faAngleUp,
  faBook,
} from "@fortawesome/free-solid-svg-icons"
import Player from "../Player"
import Header from "../Header"
import { downloadFile } from "../utils"
import "./Stack.css"
import "../db.css"

import StaticDBLogo from "../Panel/staticDBLogo"

const RenderIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("html") > -1) icon = faGlobe
  if (filetype.indexOf("video") > -1) icon = faFilm
  if (filetype.indexOf("audio") > -1) icon = faMusic
  if (filetype.indexOf("image") > -1) icon = faImage
  if (filetype.indexOf("pdf") > -1) icon = faFilePdf
  if (filetype.indexOf("zip") > -1) icon = faFileZipper
  if (filetype.indexOf("model") > -1) icon = faCube
  if (filetype.indexOf("usdz") > -1) icon = faCube
  if (filetype.indexOf("up") > -1) icon = faAngleUp
  if (filetype.indexOf("down") > -1) icon = faAngleDown
  if (filetype.indexOf("epub") > -1) icon = faBook

  return <FontAwesomeIcon icon={icon} className="awesome" />
}

const RowContent = ({
                      db,
                      sel = false,
                      f = null,
                      state = null,
                      url = null,
                      counter = "",
                      selected = false,
                      index = 0,
                    }) => {
  const [showDetails, setShowDetails] = useState(false)

  let fn = f && typeof f === "function" ? f : () => {
  }
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)
  let truncatedName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`
  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  const isRowActive = selected.i === index

  return (
    <>
      <tr className={`dbdata ${isRowActive ? "dbdataSelected" : ""}`} onClick={fn}>
        <td className="name">
          <RenderIcon filetype={db.fileFormat} />
          <span>{`${counter} ${truncatedName}`}</span>
        </td>
        <td className="size">{db.fileSize}</td>
        <td className="pulldown" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <RenderIcon filetype={"up"} /> : <RenderIcon filetype={"down"} />}
        </td>
      </tr>
      {showDetails && (
        <tr className="details" onClick={fn}>
          <td colSpan="3">
            <div className="more">{" " + db.details}</div>
            <div className="dates">
              Date Added: {d.toLocaleString([], { year: "numeric", month: "numeric", day: "numeric" })}
            </div>
            <div className="filetypes">File Type: {fileFormat}</div>
            <div className="artx">Arweave TX:{" " + db.arweaveTX}</div>
            {state && state === "display" && url && db.downloadable.toString().toLowerCase() === "true" && (
              <div className="flex flex-wrap">
                <button className="download" onClick={() => downloadFile(url, fileFormat, truncatedName)}>
                  download
                </button>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  )
}

const Stack = ({ state = null, authenticate, urls, config }) => {
  const [selected, setSelected] = useState()
  const [swapping, setSwapping] = useState(false)

  useEffect(() => {
    if (state.value === "display") {
      setSelected({ type: state.context.display.stack[0].fileFormat, mediaURL: urls[0], i: 0 })
    }
  }, [state.value])

  useEffect(() => {
    if (swapping) {
      setSwapping(false)
    }
  }, [swapping])

  return (
    <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
      {state.value === "display" && selected && !swapping ? (
        <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
      ) : (
        <Header state={state} authenticate={() => authenticate()} />
      )}
      <div className="DarkblockWidget-Stack-Panel">
        <table className="stack-table">
          <thead className="">
          <tr className="rowheader">
            <th scope="col" className="name-header">
              Name
            </th>
            <th scope="col" className="format-header">
              File Size
            </th>
            <th scope="col" className="format-header"></th>
          </tr>
          </thead>
          <tbody>
          {state.context.display.stack.map((db, i) => {
            if (state.value === "display") {
              let sel = selected ? selected.i === i : false
              return (
                <RowContent
                  db={db}
                  sel={sel}
                  f={() => {
                    setSwapping(true)
                    setSelected({ type: db.fileFormat, mediaURL: urls[i], i: i })
                  }}
                  index={i}
                  key={i}
                  counter={state.context.display.stack.length > 10 ? `${i + 1}. ` : ""}
                  selected={selected}
                  state={state.value}
                  url={urls[i]}
                />
              )
            } else {
              return (
                <RowContent
                  db={db}
                  index={i}
                  key={i}
                  counter={state.context.display.stack.length > 10 ? `${i + 1}. ` : ""}
                  selected={selected}
                />
              )
            }
          })}
          </tbody>
        </table>
      </div>
      <div className="DarkblockWidget-Footer">
        Unlockable Content Powered by &nbsp;
        <StaticDBLogo />
        {config.debug && <p>state: {state.value}</p>}
      </div>
    </div>
  )
}

export default Stack
