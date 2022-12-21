import React, { useEffect, useMemo, useState, useRef } from "react"

import Plyr from "plyr-react"
import LoadSpinner from "../Animations/LoadSpinner"

import { ReactReader, ReactReaderStyle } from "react-reader"
import { getJsonData } from "../utils"
import { VideoPlaceHolderBase64 } from "../imgBase64/VideoPlaceHolderBase64"
import { t } from "i18next"

import "./plyr.css"
import "./Player.css"
import "../../i18n"

const MediaComp = ({ mediaURL, mediaType, posterUrl }) => {
  const renditionRef = useRef(null)
  const [selections, setSelections] = useState([])
  const [location, setLocation] = useState(0)
  const mediaTypeBinaryAndPdf = [
    "encrypted(model/gltf-binary)",
    "(model/gltf-binary)",
    "encrypted(application/pdf)",
    "(application/pdf)",
  ]

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
      <div className="Darkblock-reactReader">
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
    return <iframe id="Darkblock-pdf-html-iframe" allowFullScreen className="Darkblock-htmlPlayer" src={mediaURL} />
  }

  if (mediaType == "encrypted(application/zip)") {
    return (
      <>
        <div className="Darkblock-zip-panel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 19H11V22H13V19H16L12 15L8 19ZM16 4H13V1H11V4H8L12 8L16 4ZM4 9V11H20V9H4Z" fill="white" />
            <path d="M4 12H20V14H4V12Z" fill="white" />
          </svg>
          <p>{t("player.compressedFile")}</p>
        </div>
      </>
    )
  }

  if (mediaType.indexOf("image/gif") > -1) {
    return <img id="Darkblock-gif" className="Darkblock-gifViewer Darkblock-dynamicImageSize" src={mediaURL} />
  }

  if (mediaType == "encrypted(image/svg+xml)" || mediaType.indexOf("image") > -1)
    return <img className="Darkblock-imageViewer Darkblock-dynamicImageSize" src={mediaURL} />

  if (mediaType.indexOf("audio") > -1) {
    mediaSrc.type = "audio"

    const source = useMemo(
      () => ({ type: mediaSrc.type, poster: mediaSrc.poster, sources: mediaSrc.sources }),
      [mediaSrc]
    )

    const plyrVideo = useMemo(() => <Plyr source={source} />, [source])

    return (
      <>
        <div className="Darkblock-audioPlayer">{plyrVideo}</div>
      </>
    )
  }

  if (mediaType.indexOf("video") > -1) {
    mediaSrc.type = "video"

    const source = useMemo(
      () => ({ type: mediaSrc.type, poster: mediaSrc.poster, sources: mediaSrc.sources }),
      [mediaSrc]
    )

    const plyrVideo = useMemo(() => <Plyr source={source} loop />, [source])

    return <div className="Darkblock-videoPlayer">{plyrVideo}</div>
  }

  if (mediaTypeBinaryAndPdf.includes(mediaType)) {
    return ""
  }

  return (
    <>
      <div className="Darkblock-zip-panel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M496 288h-96V256l64 .0002c8.838 0 16-7.164 16-15.1v-15.1c0-8.838-7.162-16-16-16L384 208c-17.67 0-32 14.33-32 32v47.1l-64 .0005v-192c0-17.64 14.36-32 32-32s32 14.36 32 32v16c0 8.836 7.164 16 16 16h32c8.838 0 16-7.164 16-16v-16c0-59.2-53.85-106-115.1-94.14C255.3 10.71 224 53.36 224 99.79v188.2L160 288V240c0-17.67-14.33-32-32-32L48 208c-8.836 0-16 7.162-16 16v15.1C32 248.8 39.16 256 48 256l64-.0002V288h-96c-8.836 0-16 7.164-16 16v32c0 8.836 7.164 16 16 16h480c8.836 0 16-7.164 16-16V304C512 295.2 504.8 288 496 288zM32 416c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-32H32V416z"
            fill="white"
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
  const mediaTypeBinary = ["encrypted(model/gltf-binary)", "(model/gltf-binary)"]
  const mediaTypePdf = ["encrypted(application/pdf)", "(application/pdf)"]
  const mediaTypeBinaryAndPdf = [...mediaTypeBinary, ...mediaTypePdf]

  const onDisableRightClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

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

    if (!mediaTypeBinaryAndPdf.includes(mediaType)) {
      setLoaded(true)
    }
  }

  useEffect(() => {
    if (mediaTypeBinary.includes(mediaType)) {
      const modelViewer = document.getElementById("modelViewer")
      if (modelViewer && modelViewer !== null) {
        modelViewer.addEventListener("progress", (event) => {
          if (event.detail.totalProgress === 1) {
            setLoaded(true)
          }
        })
      }
    }
  }, [])

  const onPDFloaded = () => {
    setLoaded(true)
  }

  useEffect(() => {
    jsonParse(mediaType)
  }, [mediaType])

  return (
    <div className="DarkblockWidget-Player">
      <div className="DarkblockWidget-Player-Content" onContextMenu={(e) => onDisableRightClick(e)}>
        {loaded ? (
          <MediaComp mediaURL={mUrl} mediaType={mType} config={config} posterUrl={posterUrl} />
        ) : (
          <div id="Darkblock-seadragon-viewer-spinner">
            <LoadSpinner />
          </div>
        )}

        {mediaTypePdf.includes(mediaType) && (
          <iframe
            id="Darkblock-pdf-iframe"
            allowFullScreen
            onLoad={onPDFloaded}
            className="Darkblock-pdfPlayer"
            src={`https://pdf.darkblock.io/pdfjs/web/viewer.html?file=${encodeURIComponent(mediaURL)}`}
          />
        )}

        {/* 3d Model player separated of mediaComp because it has to be added an event listener when is fully rendered */}
        {mediaTypeBinary.includes(mediaType) && (
          <div className="Darkblock-model-viewer-player">
            <model-viewer
              id="modelViewer"
              alt="testing"
              ar
              autoplay
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              loaded
              enable-pan
              seamless-poster
              shadow-intensity="1"
              src={mediaURL}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const Player = React.memo(PlayerTemp)

export default Player
