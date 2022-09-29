import React, { useEffect, useState, useRef } from "react"
import OpenSeadragon from "openseadragon"
import Plyr from "plyr-react"
import { ReactReader, ReactReaderStyle } from "react-reader"
import Logo from "../Animations/Logo"
import { getJsonData } from "../utils"
import { VideoPlaceHolderBase64 } from "../imgBase64/VideoPlaceHolderBase64"
import "./plyr.css"
import "./Player.css"

const MyGallery = ({ mediaURL, config }) => {
  const spinner = useRef(null)

  useEffect(() => {
    var viewer = OpenSeadragon({
      id: "seadragon-viewer",
      showRotationControl: config.showRotationControl,
      autoHideControls: config.autoHideControls,
      controlsFadeDelay: config.controlsFadeDelay,
      prefixUrl: "//app.darkblock.io/opensea/",
      tileSources: {
        url: mediaURL,
        type: "image",
      },
      toolbar: "toolbarDiv",
    })
    viewer.addOnceHandler("tile-drawn", () => {
      spinner.current.style.display = "none"
    })
  }, [])

  return (
    <>
      <div id="seadragon-viewer" onContextMenu={() => false}>
        <div
          id="toolbarDiv"
      
        ></div>

        <div id="seadragon-viewer-spinner" ref={spinner}>
          <Logo loop="true" />
        </div>
      </div>
    </>
  )
}

const MediaComp = ({ mediaURL, mediaType, config, posterUrl }) => {
  const renditionRef = useRef(null)
  const [selections, setSelections] = useState([])
  const [location, setLocation] = useState(0)

  if (typeof window === "undefined") {
    return <></>
  }

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi)
  }

  const epubRef = useRef(null)
  const epubStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: "black",
    },
  }

  const mediaSrc = {
    type: "",
    poster: posterUrl || VideoPlaceHolderBase64,
    sources: [
      {
        src: mediaURL,
      },
    ],
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (renditionRef.current) {
        const setRenderSelection = (cfiRange, contents) => {
          setSelections(
            selections.concat({
              text: renditionRef.current.getRange(cfiRange).toString(),
              cfiRange,
            })
          )
          contents.window.getSelection().removeAllRanges()
        }
        renditionRef.current.on("selected", setRenderSelection)
        return () => {
          renditionRef.current.off("selected", setRenderSelection)
        }
      }
    }
  }, [setSelections, selections])

  if (mediaType == "encrypted(application/epub+zip)" && typeof window !== "undefined") {
    return (
      <div className="reactReader">
        <ReactReader
          epubInitOptions={{ openAs: "epub" }}
          location={location}
          locationChanged={locationChanged}
          ref={epubRef}
          styles={epubStyles}
          url={mediaURL}
          getRendition={(rendition) => {
            rendition.themes.register("custom", {
              p: {
                color: "black",
              },
            })
            rendition.themes.select("custom")
          }}
        />
      </div>
    )
  }

  if (mediaType == "encrypted(text/html)") {
    return <iframe id="pdf-html-iframe" allowFullScreen className="htmlPlayer" src={mediaURL} />
  }

  if (mediaType == "encrypted(model/gltf-binary)" || mediaType == "(model/gltf-binary)") {
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
        />
      </div>
    )
  }
  if (mediaType == "encrypted(application/pdf)" || mediaType == "(application/pdf)") {
    return (
      <iframe
        id="pdf-iframe"
        allowFullScreen
        className="pdfPlayer"
        src={`https://darkblockio.github.io/pdf.viewer.io/pdfjs/web/viewer.html?file=${encodeURIComponent(mediaURL)}`}
      />
    )
  }
  if (mediaType == "encrypted(application/zip)") {
    return (
      <>
        <div className="zip-panel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 19H11V22H13V19H16L12 15L8 19ZM16 4H13V1H11V4H8L12 8L16 4ZM4 9V11H20V9H4Z" fill="black" />
            <path d="M4 12H20V14H4V12Z" fill="black" />
          </svg>
          <p>Compressed file</p>
        </div>
      </>
    )
  }

  if (mediaType == "encrypted(image/svg+xml)" || mediaType.indexOf("image") > -1)
    return <MyGallery mediaURL={mediaURL} config={config} />

  if (mediaType.indexOf("audio") > -1) {
    mediaSrc.type = "audio"
    return (
      <>
        <div className="audioPlayer">
          <Plyr source={mediaSrc} />
        </div>
      </>
    )
  }

  if (mediaType.indexOf("video") > -1) {
    mediaSrc.type = "video"

    return (
      <div className="videoPlayer">
        <div className="videoPlayer-safeZone">
          <Plyr source={mediaSrc} loop />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="zip-panel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M496 288h-96V256l64 .0002c8.838 0 16-7.164 16-15.1v-15.1c0-8.838-7.162-16-16-16L384 208c-17.67 0-32 14.33-32 32v47.1l-64 .0005v-192c0-17.64 14.36-32 32-32s32 14.36 32 32v16c0 8.836 7.164 16 16 16h32c8.838 0 16-7.164 16-16v-16c0-59.2-53.85-106-115.1-94.14C255.3 10.71 224 53.36 224 99.79v188.2L160 288V240c0-17.67-14.33-32-32-32L48 208c-8.836 0-16 7.162-16 16v15.1C32 248.8 39.16 256 48 256l64-.0002V288h-96c-8.836 0-16 7.164-16 16v32c0 8.836 7.164 16 16 16h480c8.836 0 16-7.164 16-16V304C512 295.2 504.8 288 496 288zM32 416c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-32H32V416z"
            fill="black"
          />
        </svg>
        <p>Other file type</p>
      </div>
    </>
  )
}

const PlayerTemp = ({ mediaURL, mediaType, config }) => {
  const [loaded, setLoaded] = useState(false)
  const [mUrl, setMUrl] = useState(mediaURL)
  const [mType, setMType] = useState(mediaType)
  const [posterUrl, setPosterUrl] = useState(null)

  useEffect(() => {
    // load 3d modal viewer script
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      script.async = true
      script.type = "module"
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  async function jsonParse(mediaType) {
    if (mediaType == "encrypted(application/json)") {
      await getJsonData(mediaURL).then((json) => {
        if (json && json.type && json.type.toLowerCase() === "movie" && json.url) {
          setMUrl(json.url)
          setMType("json/video")

          if (json.posterUrl) {
            setPosterUrl(json.posterUrl)
          }
        }
      })
    }
    setLoaded(true)
  }

  useEffect(() => {
    jsonParse(mediaType)
  }, [mediaType])

  return (
    <div className="DarkblockWidget-Player">
      <div className="DarkblockWidget-Player-Content">
        {loaded && <MediaComp mediaURL={mUrl} mediaType={mType} config={config} posterUrl={posterUrl} />}
      </div>
    </div>
  )
}

const Player = React.memo(PlayerTemp)

export default Player
