import React, { useState } from "react"
import Player from "../Player"
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
      {/* <div className="field">{file.mediaURL}</div> */}
    </div>
  )
}

const Stack = ({ state = null, authenticate }) => {
  const files = [
    {
      name: "file1",
      type: "encrypted(image/jpeg)",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=09e30f8a-b51a-41a3-8be0-ffc21aa5ff44&session_token=1652179213863_gVlfGyhkDIocRdfpOQatjWcB8wQKyLFPj3sx2FYcCr4hav2vMttznUWVT6TdSWTpQ5%2B16vGdOqUYMzv%2BLoinDQ%3D%3D_Solana&token_id=28qnjJqxMeVJFRyNDp8yfGwd5DRsRYtoUnQncHWtyfRb&contract=&platform=Solana",
    },
    {
      name: "file2",
      type: "encrypted(application/pdf)",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=7064bd50-4692-4ebc-981f-c70c5aac494c&session_token=1652186033579_0x5da98a575a204075a04e4655b4144e9a807b495129bd895a708de5570e3dc96a1310b18274b6b2570fb45e795760db8adbcbdcc3569d74a24fc0f3570e1d1ca71b&token_id=3&contract=0xfe82c554abdee9ec7b9a0a1807620b6583e3bfe8&platform=Ethereum",
    },
    {
      name: "file3",
      type: "encrypted(video/mp4)",
      mediaURL:
        "https://gateway.darkblock.io/proxy?artid=265bac7d-4818-4431-ad4a-af2ed6aab7cf&session_token=1652185493005_0x5b8bc96fcf80cf519aaaa32099c0ffc7e4701fde0469cd2ae4c034403eea722f3ad4e1e01a9ed1718b959df262f5e1dc6393661ca88741ab0ccd4cbc46ab99c31b&token_id=30553606573219150352991292921105176340809048341686170040023897674790759038977&contract=0x495f947276749ce646f68ac8c248420045cb7b5e&platform=Ethereum",
    },
  ]
  const [selected, setSelected] = useState(files[0])
  return (
    <div>
      <div className="DarkblockWidget-App">
        {/* <p>{JSON.stringify(selected)}</p> */}
        <Player mediaType={selected.type} mediaURL={selected.mediaURL} config={config.imgViewer} />
        <ul>
          <li>
            <a onClick={() => setSelected(files[0])}>
              <FileRow file={files[0]} />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a onClick={() => setSelected(files[1])}>
              <FileRow file={files[1]} />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a onClick={() => setSelected(files[2])}>
              <FileRow file={files[2]} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Stack
