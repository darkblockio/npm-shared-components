import React from "react"
import { storiesOf } from "@storybook/react"
import Header from "../lib/Header"
import Panel from "../lib/Panel"
import Player from "../lib/Player"
import "../lib/main.css"

const stories = storiesOf("Shared components - pdf", module)
const state = {
  value: "",
  context: {
    display: {
      fileFormat: "encrypted(application/pdf)",
      fileSize: "128.23 MB",
      arweaveTXLink: "arweaveTXLink",
      arweaveTX: "gDYkHILjsdb3hOHlTkVnlBlr-v-glLOoLzpWoLJac40",
    },
  },
}
const mediaURL =
  "https://gateway.darkblock.io/proxy?artid=7064bd50-4692-4ebc-981f-c70c5aac494c&session_token=1652186033579_0x5da98a575a204075a04e4655b4144e9a807b495129bd895a708de5570e3dc96a1310b18274b6b2570fb45e795760db8adbcbdcc3569d74a24fc0f3570e1d1ca71b&token_id=3&contract=0xfe82c554abdee9ec7b9a0a1807620b6583e3bfe8&platform=Ethereum"

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
