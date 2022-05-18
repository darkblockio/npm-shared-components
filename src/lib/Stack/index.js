import React, { useState } from "react"
import Player from "../Player"
import Header from "../Header"
import "./Slack.css"

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

const FileRow = ({ file }) => {
  return (
    <div className="fileRow">
      <div className="field">{file.name}</div>
      <div className="field">{file.type}</div>
      <div className="field">{file.date}</div>
    </div>
  )
}

const Stack = ({ state = null, authenticate }) => {
  const files = [
    {
      name: "file1",
      type: "encrypted(image/jpeg)",
      date: "18 May",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=09e30f8a-b51a-41a3-8be0-ffc21aa5ff44&session_token=1652179213863_gVlfGyhkDIocRdfpOQatjWcB8wQKyLFPj3sx2FYcCr4hav2vMttznUWVT6TdSWTpQ5%2B16vGdOqUYMzv%2BLoinDQ%3D%3D_Solana&token_id=28qnjJqxMeVJFRyNDp8yfGwd5DRsRYtoUnQncHWtyfRb&contract=&platform=Solana",
    },
    {
      name: "file2",
      type: "encrypted(application/pdf)",
      date: "2 Feb",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=ededcbf7-6cf9-4e93-83aa-fa1ef22b74ce&session_token=1652831078563_nV4Ki1xE2zv1nV87RMCcqU8XTV4OTo7Gxqf74dzCIITIZs0ZWJzPbEQbmVW8yZj2IKjAHOgV1mTdGKveTT51Aw%3D%3D_Solana&token_id=412EiTpy6Uee5uB1GktpmTJaCUgFgDKLZDKQ419DCAGK&contract=&platform=Solana",
    },
    {
      name: "file3",
      type: "encrypted(video/mp4)",
      date: "11 Dec 2021",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=265bac7d-4818-4431-ad4a-af2ed6aab7cf&session_token=1652185493005_0x5b8bc96fcf80cf519aaaa32099c0ffc7e4701fde0469cd2ae4c034403eea722f3ad4e1e01a9ed1718b959df262f5e1dc6393661ca88741ab0ccd4cbc46ab99c31b&token_id=30553606573219150352991292921105176340809048341686170040023897674790759038977&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
    },
  ]
  const [selected, setSelected] = useState(files[0])

  return (
    <div>
      <div className="DarkblockWidget-App">
        {state.value === "display" ? (
          <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
        ) : (
          <Header
            state={state}
            authenticate={() => {
              alert("authnticate")
            }}
          />
        )}
        <ul>
          <li>
            <FileRow file={{ name: "Name", type: "File Format", date: "Creation date" }} />
          </li>
          {files.map((f) => {
            return (
              <li>
                <a onClick={() => setSelected(f)}>
                  <FileRow file={f} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Stack
