import React from "react"
import { storiesOf } from "@storybook/react"
import Upgrader from "../lib/Upgrader"
import { send } from "xstate"
import "../lib/main.css"

const stories = storiesOf("Shared components - upgrader", module)
const state = {
  value: "idle",
}

const config = {
  customCssClass: "api_key_goes_here", // pass here a class name you plan to use
  debug: false, // debug flag to console.log some variables
}

const apiKey = "api_key_goes_here" //Darkblock API key goes here

const widget = (stateval) => {
  state.value = stateval
  return (
    <Upgrader
      state={state}
      config={config}
      apiKey={state.value === "no_api_key" ? null : apiKey}
      authenticate={() => send({ type: "SIGN" })}
    />
  )
}

const states = [
  "idle",
  "loading_arweave",
  "show_upgrade",
  "show_upgrade_signing",
  "show_upgrade_complete",
  "show_upgrade_error",
]

states.forEach((s) =>
  stories.add(s, () => {
    return widget(s)
  })
)
