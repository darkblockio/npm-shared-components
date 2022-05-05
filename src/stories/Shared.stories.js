import React from "react"
import { storiesOf } from "@storybook/react"
import Header from "../lib/Header"

const stories = storiesOf("Shared", module)

stories.add("Header", () => {
  return (
    <Header
      state={{ value: "idle" }}
      authenticate={() => {
        alert("auth")
      }}
    />
  )
})

stories.add("Header auth", () => {
  return (
    <Header
      state={{ value: "wallet_connected" }}
      authenticate={() => {
        alert("auth")
      }}
    />
  )
})
