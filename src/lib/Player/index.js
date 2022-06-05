import React, { useEffect, useRef } from "react"
import Plyr from "plyr-react"
import "./plyr.css"
import "./Player.css"
import { VideoPlaceHolderBase64 } from "../imgBase64/VideoPlaceHolderBase64"
import Loading from "../Animations/Logo"
import OpenSeadragon from "openseadragon"

const MyGallery = ({ mediaURL, config }) => {
  var duomo = {
    Image: {
      Url: mediaURL,
      Overlap: "2",
      type: "image",
    },
  }

  const spinner = useRef(null)

  useEffect(() => {
    var viewer = OpenSeadragon({
      id: "seadragon-viewer",
      showRotationControl: config.showRotationControl,
      autoHideControls: config.autoHideControls,
      controlsFadeDelay: config.controlsFadeDelay,
      prefixUrl: "//openseadragon.github.io/openseadragon/images/",
      tileSources: {
        url: mediaURL,
        type: "image",
      },
    })
    viewer.addOnceHandler("tile-drawn", () => {
      spinner.current.style.display = "none"
    })

    // load 3d modal viewer script
     const script = document.createElement('script');
     script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
     script.async = true
     script.type = 'module'
     document.body.appendChild(script);

     return () => {
       document.body.removeChild(script);
     }

  }, [])

  return (
    <>
      <div
        id="seadragon-viewer"
        onContextMenu={() => false}
        className="h-64 md:h-72 lg:h-96"
      >
        <div id="seadragon-viewer-spinner" ref={spinner}>
          <div
            style={{
              display: "flex",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "80px",
              height: "80px",
              textAlign: "center",
              margin: "auto",
              justifyContent: "center",
              position: "absolute",
              zIndex: "99999",
            }}
          >
            <Loading />
          </div>
        </div>
      </div>
    </>
  )
}

const MediaComp = ({ mediaURL, mediaType, config }) => {

  if (mediaType == "encrypted(model/gltf-binary)" || mediaType == "(model/gltf-binary)")
     return (
       <div>
         <model-viewer
           alt="testing"
           ar
           autoplay
           ar-modes="webxr scene-viewer quick-look"
           camera-controls
           enable-pan
           seamless-poster
           shadow-intensity="1"
           src={mediaURL}
           class="h-64 md:h-72 lg:h-96 w-full"
         />
       </div>
     )

  if (mediaType == "encrypted(application/pdf)" || mediaType == "(application/pdf)")
    return (
      <iframe
        allowFullScreen
        className="w-full h-64 md:h-72 lg:h-96"
        src={`https://d1jjf9b695fxyn.cloudfront.net/pdf/web/viewer.html?file=${encodeURIComponent(mediaURL)}`}
      />
    )

  if (mediaType == "encrypted(application/zip)") {
    return (
      <div className="zip-panel h-64 md:h-72 lg:h-96">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 19H11V22H13V19H16L12 15L8 19ZM16 4H13V1H11V4H8L12 8L16 4ZM4 9V11H20V9H4Z" fill="black" />
          <path d="M4 12H20V14H4V12Z" fill="black" />
        </svg>
        <p>Compressed file</p>
      </div>
    )
  }

  if (mediaType == "encrypted(image/svg+xml)" || mediaType.indexOf("image") > -1)
    return <MyGallery mediaURL={mediaURL} config={config} />

  const mediaSrc = {
    type: "",
    poster: VideoPlaceHolderBase64,
    sources: [
      {
        src: mediaURL,
      },
    ],
  }

  if (mediaType.indexOf("audio") > -1) {
    mediaSrc.type = "audio"
    return (
      <>
      <div className="h-24 bg-black h-64 md:h-72 lg:h-96">{db.name}</div>
      <div className="audioPlayer flex items-center justify-center">
        <Plyr source={mediaSrc} />
      </div>
      </>
    )
  }

  if (mediaType.indexOf("video") > -1) {
    mediaSrc.type = "video"
    return (
      <div className="videoPlayer">
        <Plyr source={mediaSrc} loop />
      </div>
    )
  }

  return <p>Unknown format</p>
}

const PlayerTemp = ({ mediaURL, mediaType, config }) => {
  return (
    <div className="DarkblockWidget-Player">
      <div className="DarkblockWidget-Player-Content h-64 md:h-72 lg:h-96">
        <MediaComp mediaURL={mediaURL} mediaType={mediaType} config={config} />
      </div>
    </div>
  )
}

const Player = React.memo(PlayerTemp)

export default Player
