import React from "react"
import { storiesOf } from "@storybook/react"
import Header from "../lib/Header"
import Panel from "../lib/Panel"
import Player from "../lib/Player"
import "../lib/main.css"

const stories = storiesOf("Shared components - image", module)
const state = {
  value: "",
  context: {
    display: {
      fileFormat: "encrypted(image/jpeg)",
      fileSize: "421.86 kB",
      arweaveTXLink: "arweaveTXLink",
      arweaveTX: "Eaw4uaBnij0tgA8QpeyIOBixcZeDXFxBSVljEA3uEtw",
    },
  },
}
const mediaURL =
  "https://gateway.darkblock.io/proxy?artid=09e30f8a-b51a-41a3-8be0-ffc21aa5ff44&session_token=1652179213863_gVlfGyhkDIocRdfpOQatjWcB8wQKyLFPj3sx2FYcCr4hav2vMttznUWVT6TdSWTpQ5%2B16vGdOqUYMzv%2BLoinDQ%3D%3D_Solana&token_id=28qnjJqxMeVJFRyNDp8yfGwd5DRsRYtoUnQncHWtyfRb&contract=&platform=Solana"

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
