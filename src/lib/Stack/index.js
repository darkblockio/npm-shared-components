import React, { useState, useEffect } from "react"
import Player from "../Player"
import Header from "../Header"
import "./Stack.css"

const config = {
  customCssClass: "", // pass here a class name you plan to use
  debug: true, // debug flag to console.log some variables
  imgViewer: {
    // image viewer control parameters
    showRotationControl: true,
    autoHideControls: true,
    controlsFadeDelay: true,
  },
}

const FileRow = ({ db }) => {
  return (
    <div className="row">
      <div className="field">{db.details}</div>
      <div className="field">{db.fileFormat}</div>
      <div className="field">{db.datecreated}</div>
    </div>
  )
}

const Stack = ({ state = null, authenticate, urls }) => {
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (state.value === "display") {
      setSelected({ type: state.context.display.stack[0].fileFormat, mediaURL: urls[0] })
    }
  }, [state.value])

  return (
    <div className="DarkblockWidget-App">
      {state.value === "display" && selected ? (
        <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
      ) : (
        <Header state={state} authenticate={() => authenticate()} />
      )}
      <ul>
        <li className="fileRow header">
          <div className="row">
            <div className="field">Name</div>
            <div className="field">File Type</div>
            <div className="field">Creation Date</div>
          </div>
        </li>
        {state.context.display.stack.map((db, i) => {
          return (
            <li className="fileRow">
              {state.value === "display" ? (
                <a onClick={() => setSelected({ type: db.fileFormat, mediaURL: urls[i] })}>
                  <FileRow db={db} />
                </a>
              ) : (
                <FileRow db={db} />
              )}
            </li>
          )
        })}
      </ul>
      {config.debug && <p>{state.value}</p>}
    </div>
  )
}

export default Stack
