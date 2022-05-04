import React, { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "./plyr.css";
import "./photoswipe.css";
import { VideoPlaceHolderBase64 } from "../imgBase64/VideoPlaceHolderBase64";
import Loading from "../Animations/Loading";
import OpenSeadragon from "openseadragon";

const MyGallery = ({ mediaURL, config }) => {
  var duomo = {
    Image: {
      Url: mediaURL,
      Overlap: "2",
      type: "image",
    },
  };

  const spinner = useRef(null);

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
    });
    viewer.addOnceHandler("tile-drawn", () => {
      spinner.current.style.display = "none";
    });
  }, []);

  return (
    <>
      <div
        id="seadragon-viewer"
        onContextMenu={() => false}
        style={{ width: "100%", height: "500px", position: "relative" }}
      >
        <div
          id="seadragon-viewer-spinner"
          style={{
            display: "flex",
            top: "39%",
            width: "80px",
            left: "50%",
            textAlign: "center",
            margin: "auto",
            height: "100px",
            verticalAlign: "bottom",
            position: "absolute",
            zIndex: "99999",
          }}
          ref={spinner}
        >
          <Loading />
        </div>
      </div>
    </>
  );
};

const MediaComp = ({ mediaURL, mediaType, config }) => {
  console.log("mediaType: ", mediaType);

  if (
    mediaType == "encrypted(application/pdf)" ||
    mediaType == "(application/pdf)"
  )
    return (
      <iframe
        allowFullScreen
        width="100%"
        style={{ border: "0px", minHeight: "500px", maxHeight: "600px" }}
        src={`https://d1jjf9b695fxyn.cloudfront.net/pdf/web/viewer.html?file=${encodeURIComponent(
          mediaURL
        )}`}
      />
    );

  if (mediaType == "encrypted(application/zip)") {
    return (
      <div>
        <h1>Zip</h1>
        <a href={mediaURL}>click here</a>
      </div>
    );
  }

  if (
    mediaType == "encrypted(image/svg+xml)" ||
    mediaType.indexOf("image") > -1
  )
    return <MyGallery mediaURL={mediaURL} config={config} />;

  const mediaSrc = {
    type: "",
    poster: VideoPlaceHolderBase64,
    sources: [
      {
        src: mediaURL,
      },
    ],
  };

  if (mediaType.indexOf("audio") > -1) {
    mediaSrc.type = "audio";
    return <Plyr style={{ maxHeight: "600px" }} source={mediaSrc} />;
  }

  mediaSrc.type = "video";
  return <Plyr style={{ maxHeight: "600px" }} source={mediaSrc} loop />;
};

const Player = ({ mediaURL, mediaType, config }) => {
  return (
    <div className="DarkblockWidget-Player">
      <div className="DarkblockWidget-Header-left" id="headerleft">
        <MediaComp mediaURL={mediaURL} mediaType={mediaType} config={config} />
      </div>
    </div>
  );
};

export default Player;
