import React from "react"
import { storiesOf } from "@storybook/react"
import Stack from "../lib/Stack"
import "../lib/main.css"

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
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "HTML - Sample",
          details:
            "And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(text/html)",
          fileSize: "1 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "3D Animated - Sample",
          details:
            "And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(model/gltf-binary)",
          fileSize: "7.1 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Music - Sample",
          details:
            "But we’ve met before. That was a long time ago, I was a kid at St. Swithin’s, It used to be funded by the Wayne Foundation. It’s an orphanage. My mum died when I was small, it was a car accident. I don’t remember it. My dad got shot a couple of years later for a gambling debt. Oh I remember that one just fine. Not a lot of people know what it feels like to be angry in your bones.",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(audio/mp3)",
          fileSize: "12.2 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "d82c1f41-42c3-4257-ae9d-c9f611610be3",
          name: "Image - Sample",
          details:
            "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother’s keeper and the finder of lost children.",
          datecreated: "1653018985835",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(image/png)",
          fileSize: "5.5 MB",
          arweaveTX: "sAlhYHbB5teh2Npg0uyKSvfQmg1DoGlhjdhRWOR2etQ",
          arweaveTXLink: "https://viewblock.io/arweave/tx/sAlhYHbB5teh2Npg0uyKSvfQmg1DoGlhjdhRWOR2etQ",
          downloadable: "true",
        },
        {
          artId: "ad41e546-f023-4785-a232-095e3e1fa165",
          name: "Video - Sample",
          details:
            "And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
          datecreated: "1652708402066",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(video/mpeg)",
          fileSize: "14.3 MB",
          arweaveTX: "A5JTy7JOHnR6Ayhi-te1q7T1OJOPpjX44OCHlyXZgJE",
          arweaveTXLink: "https://viewblock.io/arweave/tx/A5JTy7JOHnR6Ayhi-te1q7T1OJOPpjX44OCHlyXZgJE",
          downloadable: "true",
        },
        {
          artId: "527c9adb-e8eb-46a2-b882-0b805d4776a7",
          name: "Big Video - Sample",
          details:
            "Now that we know who you are, I know who I am. I’m not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain’s going to be? He’s the exact opposite of the hero. And most times they’re friends, like you and me! ",
          datecreated: "1652708412041",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(video/mpeg)",
          fileSize: "392.7 MB",
          arweaveTX: "IbWbX6-NqaotJBmAiFllMIrcoRI3w0Yi0jDQyNAEa9E",
          arweaveTXLink: "https://viewblock.io/arweave/tx/IbWbX6-NqaotJBmAiFllMIrcoRI3w0Yi0jDQyNAEa9E",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "EPUB - Sample",
          details:
            "And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/epub+zip)",
          fileSize: "187 KB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "9e62a33b-d596-471f-bf07-d8dc704dda39",
          name: "Comic Book PDF - Sample",
          details:
            "Your bones don’t break, mine do. That’s clear. Your cells react to bacteria and viruses differently than mine. You don’t get sick, I do. That’s also clear. But for some reason, you and I react the exact same way to water.",
          datecreated: "1652708390592",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/pdf)",
          fileSize: "20.2 MB",
          arweaveTX: "llq3lkWWKohwP_K1I--7T0cNS4HIL5zK7xBonI4wWvw",
          arweaveTXLink: "https://viewblock.io/arweave/tx/llq3lkWWKohwP_K1I--7T0cNS4HIL5zK7xBonI4wWvw",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Archive ZIP - Sample",
          details:
            "Your bones don’t break, mine do. That’s clear. Your cells react to bacteria and viruses differently than mine. You don’t get sick, I do. That’s also clear. But for some reason, you and I react the exact same way to water.",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/zip)",
          fileSize: "5.5 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Other File Type - Sample 1",
          details: "other",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/other)",
          fileSize: "5.5 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Other File Type - Sample 2",
          details: "other",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/other)",
          fileSize: "5.5 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Other File Type - Sample 3",
          details: "other",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/other)",
          fileSize: "5.5 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
        {
          artId: "5bff5cc0-8505-45c5-aebd-28037d1b8a07",
          name: "Other File Type - Sample 4",
          details: "other",
          datecreated: "1652708376981",
          creatorLink: "https://opensea.io/0x438cba7e454b59a9f897d4731fd3eaef37160c0a",
          fileFormat: "encrypted(application/other)",
          fileSize: "5.5 MB",
          arweaveTX: "OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          arweaveTXLink: "https://viewblock.io/arweave/tx/OL5tuTkN5cVSWLXvZnr-7Mfiju3seVn2k2aDbOu25ws",
          downloadable: "true",
        },
      ],
    },
  },
}
const stackMediaURLs = [
  "https://darkblock-media.s3.amazonaws.com/samples/html.html",
  "https://darkblock-media.s3.amazonaws.com/samples/dancing.glb",
  "https://darkblock-media.s3.amazonaws.com/samples/music.mp3",
  "https://darkblock-media.s3.amazonaws.com/samples/image.png",
  "https://darkblock-media.s3.amazonaws.com/samples/movie.mp4",
  "https://darkblock-media.s3.amazonaws.com/samples/bigmovie.mp4",
  "https://darkblock-media.s3.amazonaws.com/samples/book.epub",
  "https://darkblock-media.s3.amazonaws.com/samples/document.pdf",
  "https://darkblock-media.s3.amazonaws.com/samples/archive.zip",
  "https://darkblock-media.s3.amazonaws.com/samples/archive.zip",
  "https://darkblock-media.s3.amazonaws.com/samples/archive.zip",
  "https://darkblock-media.s3.amazonaws.com/samples/archive.zip",
  "https://darkblock-media.s3.amazonaws.com/samples/archive.zip",
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
