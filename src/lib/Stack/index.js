import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faFilePdf, faFilm, faImage, faFileZipper, faMusic, faCube, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
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
  if (filetype.indexOf("model") > -1) icon = faCube
  if (filetype.indexOf("usdz") > -1) icon = faCube
  if (filetype.indexOf("up") > -1) icon = faAngleUp
  if (filetype.indexOf("down") > -1) icon = faAngleDown

  return <FontAwesomeIcon icon={icon} className="h-4 w-4 mx-auto rounded p-1 mt-1 mr-2 text-gray-900" />
}

const RowContent = ({ db, sel = false, f = null }) => {
  const [showDetails, setShowDetails] = useState(false)
  let fn = f && typeof f === "function" ? f : () => {}
  let rowcss = sel ? "row selected" : "row"
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)

  return (
    <>
    <tr className="border-t border-gray-300 hover:bg-gray-200 cursor-pointer" onClick={fn}>
      <td className="whitespace-nowrap truncate py-2 pr-3 text-xs md:text-sm pl-2">
        <RenderIcon filetype={db.fileFormat} />
        <span className="truncate relative -top-2">{" " + db.name}</span>
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs md:text-sm pl-2">{db.fileSize}</td>
      <td className="hidden md:block whitespace-nowrap py-2 pr-3 text-xs md:text-sm pl-2" onClick={fn}>{db.fileFormat.substring(10, db.fileFormat.length - 1)}</td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs md:text-sm pl-2" onClick={fn}>{d.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})}</td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs md:text-sm pl-2" onClick={() => setShowDetails(!showDetails)}>{showDetails ? <RenderIcon filetype={'up'} /> : <RenderIcon filetype={'down'} />}</td>
    </tr>
    {showDetails && (
    <tr className="border-t border-gray-300 hover:bg-gray-200 cursor-pointer" onClick={fn}>
      <td colSpan="5" className="py-2 text-xs md:text-sm px-4 bg-gray-100">
        <div className="relative w-full">
          <div className="flex flex-wrap border-b border-gray-300 py-4">{" " + db.details}</div>
          <div className="flex flex-wrap pt-4 pb-2 truncate">Arweave TX:{" " + db.arweaveTX}</div>
          {db.downloadable && (
            <div className="flex flex-wrap">
              <button
                className="mt-4 inline-block bg-gray-300 font-bold rounded w-full md:w-1/3  text-black hover:text-white hover:bg-gray-500 border border-black mr-2 text-center mb-4 py-2"
                onClick={() => console.log('download file')}
              >
                download
              </button>
            </div>
          )}
        </div>
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
      console.log(selected)
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
      <div className="DarkblockWidget-Stack-Panel h-72 overflow-y-scroll">
        <table className="stack-table">
          <thead className="bg">
            <tr className="rowheader">
              <th scope="col" className="name-header">
                Name
              </th>
              <th scope="col" className="format-header">
                File Size
              </th>
              <th scope="col" className="hidden md:block format-header">
                File Format
              </th>
              <th scope="col" className="date-header">
                Date Added
              </th>
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
                    key={i}
                  />
                )
              } else {
                return <RowContent db={db} key={i} />
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
