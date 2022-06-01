import React from "react"
import { storiesOf } from "@storybook/react"
import Header from "../lib/Header"
import Panel from "../lib/Panel"
import Player from "../lib/Player"
import "../lib/main.css"

const stories = storiesOf("Shared components - video", module)
const state = {
  value: "",
  context: {
    display: {
      fileFormat: "encrypted(video/mp4)",
      fileSize: "2.81 MB",
      arweaveTXLink: "arweaveTXLink",
      arweaveTX: "eHRg9voGgrtgeV1odjprbjhExzEPJtaTmjPyN5m0zbA",
    },
  },
}
const mediaURL =
  "https://gateway.darkblock.io/proxy?artid=265bac7d-4818-4431-ad4a-af2ed6aab7cf&session_token=1652185493005_0x5b8bc96fcf80cf519aaaa32099c0ffc7e4701fde0469cd2ae4c034403eea722f3ad4e1e01a9ed1718b959df262f5e1dc6393661ca88741ab0ccd4cbc46ab99c31b&token_id=30553606573219150352991292921105176340809048341686170040023897674790759038977&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum"

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

const widget = (stateval) => {
  state.value = stateval
  return (
    <div>
      <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
        {state.value === "display" ? (
          <Player mediaType={state.context.display.fileFormat} mediaURL={mediaURL} config={config.imgViewer} />
        ) : (
          <Header state={state} authenticate={() => send({ type: "SIGN" })} />
        )}
        <Panel state={state} />
        {config.debug && <p>{state.value}</p>}
      </div>
    </div>
  )
}

const states = [
  "idle",
  "loading_arweave",
  "started",
  "start_failure",
  "wallet_connected",
  "authenticated",
  "auth_failure",
  "decrypting",
  "decrypt_error",
  "signing",
  "display",
]

states.forEach((s) =>
  stories.add(s, () => {
    return widget(s)
  })
)
