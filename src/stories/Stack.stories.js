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
      details: "Description maybe?",
      stack: [
        {
          artId: "d82c1f41-42c3-4257-ae9d-c9f611610be3",
          details: "Description maybe?",
          datecreated: "1653018985835",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(image/png)",
          fileSize: "788.94 kB",
          arweaveTX: "sAlhYHbB5teh2Npg0uyKSvfQmg1DoGlhjdhRWOR2etQ",
          arweaveTXLink: "https://viewblock.io/arweave/tx/sAlhYHbB5teh2Npg0uyKSvfQmg1DoGlhjdhRWOR2etQ",
        },
        {
          artId: "ad41e546-f023-4785-a232-095e3e1fa165",
          details: "webm",
          datecreated: "1652708402066",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(video/webm)",
          fileSize: "259.4 kB",
          arweaveTX: "A5JTy7JOHnR6Ayhi-te1q7T1OJOPpjX44OCHlyXZgJE",
          arweaveTXLink: "https://viewblock.io/arweave/tx/A5JTy7JOHnR6Ayhi-te1q7T1OJOPpjX44OCHlyXZgJE",
        },
        {
          artId: "527c9adb-e8eb-46a2-b882-0b805d4776a7",
          details: "hey punk",
          datecreated: "1652708412041",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(image/png)",
          fileSize: "696.92 kB",
          arweaveTX: "IbWbX6-NqaotJBmAiFllMIrcoRI3w0Yi0jDQyNAEa9E",
          arweaveTXLink: "https://viewblock.io/arweave/tx/IbWbX6-NqaotJBmAiFllMIrcoRI3w0Yi0jDQyNAEa9E",
        },
        {
          artId: "9e62a33b-d596-471f-bf07-d8dc704dda39",
          details: "pdf",
          datecreated: "1652708390592",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/pdf)",
          fileSize: "723.25 kB",
          arweaveTX: "llq3lkWWKohwP_K1I--7T0cNS4HIL5zK7xBonI4wWvw",
          arweaveTXLink: "https://viewblock.io/arweave/tx/llq3lkWWKohwP_K1I--7T0cNS4HIL5zK7xBonI4wWvw",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          details: "mp3",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(audio/mpeg)",
          fileSize: "210.02 kB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
        },
      ],
    },
  },
}
const stackMediaURLs = [
  "https://gateway.darkblock.io/proxy?artid=d82c1f41-42c3-4257-ae9d-c9f611610be3&session_token=1653341464767_0x3239c6b08bfabfdbdb6e490d217107dd175f8005d6283daf4be726b04ae9a01f1bdd1216d7b648fb69214cf8661dd5f5229128987620cafe52f3404498ec3d891b&token_id=30553606573219150352991292921105176340809048341686170040023897679188805550081&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
  "https://gateway.darkblock.io/proxy?artid=ad41e546-f023-4785-a232-095e3e1fa165&session_token=1653341464767_0x3239c6b08bfabfdbdb6e490d217107dd175f8005d6283daf4be726b04ae9a01f1bdd1216d7b648fb69214cf8661dd5f5229128987620cafe52f3404498ec3d891b&token_id=30553606573219150352991292921105176340809048341686170040023897679188805550081&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
  "https://gateway.darkblock.io/proxy?artid=527c9adb-e8eb-46a2-b882-0b805d4776a7&session_token=1653341464767_0x3239c6b08bfabfdbdb6e490d217107dd175f8005d6283daf4be726b04ae9a01f1bdd1216d7b648fb69214cf8661dd5f5229128987620cafe52f3404498ec3d891b&token_id=30553606573219150352991292921105176340809048341686170040023897679188805550081&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
  "https://gateway.darkblock.io/proxy?artid=9e62a33b-d596-471f-bf07-d8dc704dda39&session_token=1653341464767_0x3239c6b08bfabfdbdb6e490d217107dd175f8005d6283daf4be726b04ae9a01f1bdd1216d7b648fb69214cf8661dd5f5229128987620cafe52f3404498ec3d891b&token_id=30553606573219150352991292921105176340809048341686170040023897679188805550081&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
  "https://gateway.darkblock.io/proxy?artid=5bff5cc0-8505-45c5-aebd-28037d1b8a07&session_token=1653341464767_0x3239c6b08bfabfdbdb6e490d217107dd175f8005d6283daf4be726b04ae9a01f1bdd1216d7b648fb69214cf8661dd5f5229128987620cafe52f3404498ec3d891b&token_id=30553606573219150352991292921105176340809048341686170040023897679188805550081&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
]

const config = {
  customCssClass: "", // pass here a class name you plan to use
  debug: false, // debug flag to console.log some variables
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
      <Stack state={state} authenticate={() => send({ type: "SIGN" })} urls={stackMediaURLs} config={config} />
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
