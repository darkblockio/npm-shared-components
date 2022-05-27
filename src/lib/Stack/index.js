import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faFilePdf, faFilm, faImage, faFileZipper, faMusic } from "@fortawesome/free-solid-svg-icons"
import Player from "../Player"
import Header from "../Header"
import "./Stack.css"
import "../db.css"

import StaticDBLogo from "../Panel/staticDBLogo"

const RenderIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("video") > -1) icon = faFilm
  if (filetype.indexOf("audio") > -1) icon = faMusic
  if (filetype.indexOf("image") > -1) icon = faImage
  if (filetype.indexOf("pdf") > -1) icon = faFilePdf
  if (filetype.indexOf("zip") > -1) icon = faFileZipper

  return <FontAwesomeIcon icon={icon} className="text-slate-400" />
}

const RowContent = ({ db, f = null }) => {
  let fn = f && typeof f === "function" ? f : () => {}
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)
  console.log(d)

  return (
    <tr className="row" onClick={fn}>
      <td className="name">
        <RenderIcon filetype={db.fileFormat} />
        {" " + db.details}
      </td>
      <td className="format">{db.fileFormat.substring(10, db.fileFormat.length - 1)}</td>
      <td className="date">{d.toLocaleString()}</td>
    </tr>
  )
}

const Stack = ({ state = null, authenticate, urls, config }) => {
  const [selected, setSelected] = useState()
  const [swapping, setSwapping] = useState(false)

  useEffect(() => {
    if (state.value === "display") {
      setSelected({ type: state.context.display.stack[0].fileFormat, mediaURL: urls[0] })
    }
  }, [state.value])

  useEffect(() => {
    if (swapping) {
      setSwapping(false)
    }
  }, [swapping])

  return (
    <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
      <div className="DarkblockWidget-App-Content">
        {state.value === "display" && selected && !swapping ? (
          <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
        ) : (
          <Header state={state} authenticate={() => authenticate()} />
        )}
        <div className="DarkblockWidget-Stack-Panel">
          <table className="min-w-full border-gray-300">
            <thead className="bg">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs sm:pl-6">
                  Name
                </th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-xs">
                  File Format
                </th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-xs">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody>
              {state.context.display.stack.map((db, i) => {
                if (state.value === "display") {
                  return (
                    <RowContent
                      db={db}
                      f={() => {
                        setSwapping(true)
                        setSelected({ type: db.fileFormat, mediaURL: urls[i] })
                      }}
                    />
                  )
                } else {
                  return <RowContent db={db} />
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="DarkblockWidget-Footer">
          Unlockable Content Powered by &nbsp;
          <StaticDBLogo />
        </div>
        {config.debug && <p>{state.value}</p>}
      </div>
    </div>
  )
}

export default Stack
