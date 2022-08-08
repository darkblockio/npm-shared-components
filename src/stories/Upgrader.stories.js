import React from "react"
import { storiesOf } from "@storybook/react"
import Upgrader from "../lib/Upgrader"
import "../lib/main.css"

const stories = storiesOf("Shared components - upgrader", module)
const state = {
  value: "idle",
}

const config = {
  customCssClass: "", // pass here a class name you plan to use
  debug: false, // debug flag to console.log some variables
}

const apiKey = "0ta7b7hp0sm59vq79d0j63che64c" //internal DB key - not for public use

const widget = (stateval) => {
  state.value = stateval
  return <Upgrader state={state} config={config} apiKey={state.value === "no_api_key" ? null : apiKey} />
}

const states = ["idle", "loading_arweave", "show_upgrade"]

states.forEach((s) =>
  stories.add(s, () => {
    return widget(s)
  })
)
