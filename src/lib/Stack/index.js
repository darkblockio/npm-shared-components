import React, { useState, useEffect } from "react"

import RowContent from "./RowContent"
import FooterSharedComponents from "../Footer"
import Player from "../Player"
import Header from "../Header"
import Titles from "../Titles"
import PlayerModal from "../playerModal"
import EmptyTable from "../EmptyTable"
import EllipsisModal from "./ellipsisModal"

import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RenderArrowIcon } from "./AuxFunctions"

import "./Stack.css"
import "../db.css"
import "../../i18n"

const Stack = ({ state = null, authenticate, urls, config }) => {
  const [selected, setSelected] = useState()
  const [swapping, setSwapping] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [opacity, setOpacity] = useState(0.4)
  const [showDetails, setShowDetails] = useState(false)
  const [detailDB, setDetailDB] = useState(null)
  const [height, setHeight] = useState(window.innerHeight)
  const [controls, setcontrols] = useState("default")
  const [onButtons, setOnButtons] = useState(false)
  const doc = document.documentElement

  const handleOnClose = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setShowModal(false)
    }
  }

  const handleControlsHeader = () => {
    if (controls === "fadeOut") return "darkblock-player-modal-fadeout-up"
    if (controls === "hidden") return "darkblock-player-modal-header-hidden"
    else return "darkblock-player-modal"
  }

  const handleControlsFooter = () => {
    if (controls === "fadeOut") return "m-auto animate-fadeDown"
    if (controls === "hidden") return "darkblock-player-modal-footer-hidden"
    else return "m-auto"
  }

  const handleChangeEffect = (event) => {
    event.preventDefault()
    setcontrols("default")
    setOnButtons(true)
  }

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

  const documentHeight = () => {
    setHeight(window.innerHeight)
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
  }

  const stateValue = ["idle", "loading_arweave", "started", "start_failure", "no_darkblock"]

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey, false)
    return () => {
      document.removeEventListener("keydown", handleEscKey, false)
    }
  }, [])

  useEffect(() => {
    !onButtons &&
      controls === "default" &&
      setTimeout(() => {
        setcontrols("fadeOut")
      }, 3000)
    !onButtons &&
      controls === "fadeOut" &&
      setTimeout(() => {
        setcontrols("hidden")
      }, 800)
  }, [controls, onButtons])

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

  useEffect(() => {
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
    window.addEventListener("resize", documentHeight)
    return () => {
      window.removeEventListener("resize", documentHeight)
    }
  }, [height])

  return (
    <>
      <PlayerModal showModal={showModal} open={showModal} onClose={(e) => handleOnClose(e)}>
        {state.value === "display" && selected && !swapping && (
          <div className="Darkblock-player-modal-container">
            <div
              className={`${handleControlsHeader()}`}
              onMouseOver={handleChangeEffect}
              onMouseLeave={() => setOnButtons(false)}
            >
              <div className="w-5 px-2"></div>
              <div className="Darkblock-player-modal-container-title-name">{selected.db.name}</div>

              <div className="Darkblock-player-modal-close-button">
                <div onClick={(e) => handleOnClose(e)}>
                  <FontAwesomeIcon icon={faClose} className="Darkblock-awesomePlayerButton" />
                </div>
              </div>
            </div>

            <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />

            <div
              className="darkblock-arrows-container"
              onMouseOver={handleChangeEffect}
              onMouseLeave={() => setOnButtons(false)}
            >
              <div className={`${handleControlsFooter()}`}>
                <button
                  onClick={() => previousDb()}
                  className={selected.i > 0 ? "Darkblock-playerBtn" : "Darkblock-playerBtn Darkblock-playerBtnDisabled"}
                >
                  <RenderArrowIcon filetype={"faArrowLeft"} />
                </button>
                <button
                  onClick={() => nextDb()}
                  className={
                    selected.i + 1 !== state.context.display.stack.length
                      ? "Darkblock-playerBtn"
                      : "Darkblock-playerBtn Darkblock-playerBtnDisabled"
                  }
                >
                  <RenderArrowIcon filetype={"faArrowRight"} />
                </button>
              </div>
            </div>
          </div>
        )}
      </PlayerModal>
      <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
        {!showHeader ? (
          <Header
            className="popHeader"
            onClose={() => {
              setShowHeader(!showHeader)
            }}
            state={state}
            authenticate={() => authenticate()}
          />
        ) : null}

        {detailDB && showDetails && (
          <EllipsisModal
            db={detailDB}
            open={showDetails}
            state={state}
            closeToggle={() => {
              setDetailDB(null)
              setShowDetails(false)
            }}
          />
        )}

        {!stateValue.includes(state.value) ? (
          <div className="DarkblockWidget-Stack-Panel">
            <div className="Darkblock-Stack-Table" style={{ opacity: opacity }}>
              <div>
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
                        selected={selected}
                        state={state.value}
                        url={urls[i]}
                        showDetailModal={(value) => {
                          value.url = urls[i]
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
                        selected={selected}
                        showDetailModal={(value) => {
                          value.url = null
                          setDetailDB(value)
                          setShowDetails(true)
                        }}
                        f={() => {
                          setShowHeader(!showHeader)
                        }}
                      />
                    )
                  }
                })}
              </div>
            </div>
          </div>
        ) : (
          <EmptyTable />
        )}
        <FooterSharedComponents config={config} state={state} />
      </div>
    </>
  )
}

export default Stack
