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
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faArrowRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"
import FooterSharedComponents from "../Footer"
import Player from "../Player"
import Header from "../Header"
import Titles from "../Titles"

import "./Stack.css"
import "../db.css"
import PlayerModal from "../playerModal"

import EmptyTable from "../EmptyTable"
import EllipsisModal from "./ellipsisModal"

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
  if (filetype.indexOf("chevronLeft") > -1) icon = faChevronLeft
  if (filetype.indexOf("chevronRight") > -1) icon = faChevronRight

  return <FontAwesomeIcon icon={icon} className='awesome' />
}

const RenderArrowIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("faArrowLeft") > -1) icon = faArrowLeft
  if (filetype.indexOf("faArrowRight") > -1) icon = faArrowRight

  return <FontAwesomeIcon icon={icon} className='arrowIcons' />
}

const RenderEllipsisIcon = ({ filetype }) => {
  let icon = faQuestionCircle

  if (filetype.indexOf("ellipsis") > -1) icon = faEllipsisVertical

  return <FontAwesomeIcon icon={icon} className='toggleIcon' />
}

const RowContent = ({
  db,

  f = null,
  counter = "",
  selected = false,
  index = 0,
  showDetailModal,
}) => {
  let fn = f && typeof f === "function" ? f : () => {}
  let d = new Date(0)
  d.setUTCMilliseconds(db.datecreated)
  let truncatedName = `${db.name.substr(0, 25)}${db.name.length > 25 ? "..." : ""}`

  const fileFormat = db.fileFormat.substring(10, db.fileFormat.length - 1)
  const isRowActive = selected.i === index

  const [showEll, setShowEll] = useState(false)

  const showToggle = e => {
    setShowEll(!showEll)
  }

  const closeToggle = () => {
    setShowEll(!showEll)
  }

  return (
    <>
      <tr className={`dbdata ${isRowActive ? "dbdataSelected" : ""}`}>
        <td className='name' onClick={fn}>
          <RenderIcon filetype={db.fileFormat} />
          <span>{`${counter} ${truncatedName}`}</span>
        </td>
        <td className='text-right size' onClick={fn}>
          {db.fileSize}
        </td>
        <td className='date' onClick={fn}>
          {d.toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </td>

        <td className='toggleBtn'>
          <div
            onClick={() => {
              showDetailModal(db)
              // showToggle()
            }}
            className='toggleContainer'
          >
            <button className='toggle'>
              <RenderEllipsisIcon filetype={"ellipsis"} />
            </button>
          </div>
        </td>
      </tr>
    </>
  )
}

const Stack = ({ state = null, authenticate, urls, config }) => {
  const [selected, setSelected] = useState()
  const [swapping, setSwapping] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [opacity, setOpacity] = useState(0.4)
  const [showDetails, setShowDetails] = useState(false)
  const [detailDB, setDetailDB] = useState(null)

  useEffect(() => {
    if (state.value === "display") {
      setSelected({
        type: state.context.display.stack[0].fileFormat,
        mediaURL: urls[0],
        i: 0,
        db: state.context.display.stack[0],
      })
    }
  }, [state.value])

  useEffect(() => {
    if (state.value == "display") {
      setOpacity(1)
      setTimeout(() => {
        setShowHeader(true) //it has reverse logic
      }, 1500)
    }
  }, [state.value])

  useEffect(() => {
    if (swapping) {
      setSwapping(false)
    }
  }, [swapping])

  const previousDb = () => {
    if (selected.i === 0) return

    const nextIndex = selected.i - 1
    const nextDb = state.context.display.stack[nextIndex]

    setSwapping(true)
    setSelected({ type: nextDb.fileFormat, mediaURL: urls[nextIndex], i: nextIndex, db: nextDb })
  }

  const nextDb = () => {
    const dbCount = state.context.display.stack.length
    if (dbCount === selected.i + 1) return

    const nextIndex = selected.i + 1
    const nextDb = state.context.display.stack[nextIndex]

    setSwapping(true)
    setSelected({ type: nextDb.fileFormat, mediaURL: urls[nextIndex], i: nextIndex, db: nextDb })
  }

  return (
    <div>
      <PlayerModal showModal={showModal} open={showModal} onClose={() => setShowModal(false)}>
        {state.value === "display" && selected && !swapping && (
          <>
            <div>
              <div className='playerModal'>
                <div>{selected.db.name}</div>
              </div>
              <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
            </div>
            <div className='px-3 mt-1 mb-1 fa-2xl'>
              {selected.i > 0 && (
                <button onClick={() => previousDb()} className='playerBtn '>
                  <RenderArrowIcon filetype={"faArrowLeft"} />
                </button>
              )}
              {selected.i + 1 !== state.context.display.stack.length && (
                <button onClick={() => nextDb()} className='playerBtn'>
                  <RenderArrowIcon filetype={"faArrowRight"} />
                </button>
              )}
            </div>
          </>
        )}
      </PlayerModal>
      <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
        {/* {state.value === "display" && selected && !swapping ? (

          <div></div>
        ) :  */}
        {!showHeader ? (
          <Header
            className='popHeader'
            onClose={() => {
              setShowHeader(!showHeader)
            }}
            state={state}
            authenticate={() => authenticate()}
          />
        ) : null}

        {state.value !== "no_wallet" &&
        state.value !== "idle" &&
        state.value !== "loading_arweave" &&
        state.value !== "started" &&
        state.value !== "start_failure" &&
        state.value !== "no_darkblock" ? (
          <div className='DarkblockWidget-Stack-Panel'>
            <table className='table-auto stack-table' style={{ opacity: opacity }}>
              <tbody>
                <Titles state={state} />
                {state.context.display.stack.map((db, i) => {
                  if (state.value === "display") {
                    let sel = selected ? selected.i === i : false
                    return (
                      <RowContent
                        db={db}
                        sel={sel}
                        f={() => {
                          setSwapping(true)
                          setSelected({ type: db.fileFormat, mediaURL: urls[i], i: i, db: db })
                          setShowModal(true)
                        }}
                        index={i}
                        key={i}
                        counter={state.context.display.stack.length > 10 ? `${i + 1}. ` : ""}
                        selected={selected}
                        state={state.value}
                        url={urls[i]}
                        showDetailModal={value => {
                          setDetailDB(value)
                          setShowDetails(true)
                        }}
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
                        showDetailModal={value => {
                          setDetailDB(value)
                          setShowDetails(true)
                        }}
                      />
                    )
                  }
                })}
              </tbody>
            </table>

            {detailDB && showDetails && (
              <EllipsisModal
                state={state}
                url={urls}
               
                db={detailDB}
                open={showDetails}
                closeToggle={() => {
                  setDetailDB(null)
                  setShowDetails(false)
                }}
              />
            )}
          </div>
        ) : (
          <EmptyTable />
        )}
        <FooterSharedComponents config={config} state={state} />
      </div>
    </div>
  )
}

export default Stack
