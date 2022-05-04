// import "./Main.scoped.scss"
import React from "react"
import "./Panel.scoped.css"

function Panel({ state = null }) {
  let ctx = state.context.display

  return (
    <div className="DarkblockWidget-Main">
      <div className="row-db">
        <div className="col-left">
          <div className="heading">Owner</div>
          <div className="content">
            <a className="simple-text" href={ctx.ownerLink} target="_blank">
              {ctx.owner}
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="heading">Creator</div>
          <div className="content">
            <a className="simple-text" href={ctx.creatorLink} target="_blank">
              {ctx.creator}
            </a>
          </div>
        </div>
      </div>

      <div className="row-db">
        <div className="col-left">
          <div className="heading">File Format</div>
          <div className="content">{ctx.fileFormat}</div>
        </div>
        <div className="col-right">
          <div className="heading">File Size</div>
          <div className="content">{ctx.fileSize}</div>
        </div>
      </div>

      <div className="row-db">
        <div className="col-full">
          <div className="heading">Arweave Tx</div>
          <div className="content">
            <div className="underline">
              <a className="underline" target="_blank" href={ctx.arweaveTXLink}>
                {ctx.arweaveTX}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row-db">
        <div className="col-full">
          <div className="heading">About the Darkblock</div>
          <div className="content">{ctx.details}</div>
        </div>
      </div>
    </div>
  )
}

export default Panel
