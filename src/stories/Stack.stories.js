import React from "react"
import { storiesOf } from "@storybook/react"
import Stack from "../lib/Stack"
import "../lib/db.css"

const stories = storiesOf("Shared components - stack", module)
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
const mediaURL = [
  {
    type: "img",
    mediaURL:
      "https://gateway.darkblock.io/proxy?artid=09e30f8a-b51a-41a3-8be0-ffc21aa5ff44&session_token=1652179213863_gVlfGyhkDIocRdfpOQatjWcB8wQKyLFPj3sx2FYcCr4hav2vMttznUWVT6TdSWTpQ5%2B16vGdOqUYMzv%2BLoinDQ%3D%3D_Solana&token_id=28qnjJqxMeVJFRyNDp8yfGwd5DRsRYtoUnQncHWtyfRb&contract=&platform=Solana",
  },
  {
    type: "pdf",
    mediaURL:
      "https://gateway.darkblock.io/proxy?artid=7064bd50-4692-4ebc-981f-c70c5aac494c&session_token=1652186033579_0x5da98a575a204075a04e4655b4144e9a807b495129bd895a708de5570e3dc96a1310b18274b6b2570fb45e795760db8adbcbdcc3569d74a24fc0f3570e1d1ca71b&token_id=3&contract=0xfe82c554abdee9ec7b9a0a1807620b6583e3bfe8&platform=Ethereum",
  },
  {
    type: "video",
    mediaURL:
      "https://gateway.darkblock.io/proxy?artid=265bac7d-4818-4431-ad4a-af2ed6aab7cf&session_token=1652185493005_0x5b8bc96fcf80cf519aaaa32099c0ffc7e4701fde0469cd2ae4c034403eea722f3ad4e1e01a9ed1718b959df262f5e1dc6393661ca88741ab0ccd4cbc46ab99c31b&token_id=30553606573219150352991292921105176340809048341686170040023897674790759038977&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
  },
]

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
      <Stack state={state} />
    </div>
  )
}

const states = [
  "idle",
  "loading_arweave",
  "started",
  "start_failure",
  "wallet_connected",
  "no_wallet_connected",
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
