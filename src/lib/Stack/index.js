import React, { useState, useEffect } from "react"
import Player from "../Player"
import Header from "../Header"
import "./Stack.css"
import StaticDBLogo from "../Panel/staticDBLogo"

const FileRow = ({ db }) => {
  return (
    <div className="row">
      <div className="field">{db.details}</div>
      <div className="field">{db.fileFormat}</div>
      <div className="field">{db.datecreated}</div>
    </div>
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
      {state.value === "display" && selected && !swapping ? (
        <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
      ) : (
        <Header state={state} authenticate={() => authenticate()} />
      )}
      <div className="DarkblockWidget-Stack-Panel">
        <ul>
          <li className="header">
            <div className="row">
              <div className="field">Name</div>
              <div className="field">File Type</div>
              <div className="field">Creation Date</div>
            </div>
          </li>
          {state.context.display.stack.map((db, i) => {
            return (
              <li className="fileRow" key={i}>
                {state.value === "display" ? (
                  <a
                    onClick={() => {
                      setSwapping(true)
                      setSelected({ type: db.fileFormat, mediaURL: urls[i] })
                    }}
                  >
                    <FileRow db={db} />
                  </a>
                ) : (
                  <FileRow db={db} />
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="DarkblockWidget-Footer">
        Unlockable Content Powered by &nbsp;
        <StaticDBLogo />
      </div>
      {config.debug && <p>{state.value}</p>}
    </div>
  )
}

export default Stack
