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
      <div className="zip-panel">
        <div className="mt-20">
        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 19H11V22H13V19H16L12 15L8 19ZM16 4H13V1H11V4H8L12 8L16 4ZM4 9V11H20V9H4Z" fill="black" />
          <path d="M4 12H20V14H4V12Z" fill="black" />
        </svg>
        <p>Compressed file</p>
        <a href={mediaURL}>
          <svg width="110" height="26" viewBox="0 0 110 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H106C108.209 0 110 1.79086 110 4V22C110 24.2091 108.209 26 106 26H4C1.79086 26 0 24.2091 0 22V4Z"
              fill="white"
            />
            <path
              d="M13.75 19H24.25V17.5H13.75V19ZM24.25 10.75H21.25V6.25H16.75V10.75H13.75L19 16L24.25 10.75Z"
              fill="black"
            />
            <path
              d="M40.1364 18H36.9325V8.54545H40.201C41.1397 8.54545 41.946 8.73473 42.62 9.11328C43.2971 9.48875 43.8172 10.0289 44.1804 10.7337C44.5436 11.4384 44.7251 12.2817 44.7251 13.2635C44.7251 14.2483 44.542 15.0947 44.1758 15.8026C43.8126 16.5104 43.2879 17.0536 42.6016 17.4322C41.9183 17.8107 41.0966 18 40.1364 18ZM38.6452 16.5181H40.0533C40.7119 16.5181 41.2612 16.3981 41.7013 16.158C42.1415 15.9149 42.4723 15.5533 42.6939 15.0732C42.9155 14.59 43.0263 13.9867 43.0263 13.2635C43.0263 12.5402 42.9155 11.9401 42.6939 11.4631C42.4723 10.983 42.1445 10.6244 41.7106 10.3874C41.2797 10.1474 40.7442 10.0273 40.104 10.0273H38.6452V16.5181ZM49.1116 18.1385C48.4192 18.1385 47.819 17.9862 47.3112 17.6815C46.8034 17.3768 46.4094 16.9505 46.1294 16.4027C45.8524 15.8549 45.7139 15.2147 45.7139 14.4822C45.7139 13.7498 45.8524 13.1081 46.1294 12.5572C46.4094 12.0063 46.8034 11.5785 47.3112 11.2738C47.819 10.9691 48.4192 10.8168 49.1116 10.8168C49.8041 10.8168 50.4042 10.9691 50.9121 11.2738C51.4199 11.5785 51.8123 12.0063 52.0893 12.5572C52.3693 13.1081 52.5094 13.7498 52.5094 14.4822C52.5094 15.2147 52.3693 15.8549 52.0893 16.4027C51.8123 16.9505 51.4199 17.3768 50.9121 17.6815C50.4042 17.9862 49.8041 18.1385 49.1116 18.1385ZM49.1209 16.7997C49.4963 16.7997 49.8103 16.6966 50.0626 16.4904C50.315 16.2811 50.5027 16.0011 50.6258 15.6502C50.752 15.2994 50.8151 14.9085 50.8151 14.4776C50.8151 14.0437 50.752 13.6513 50.6258 13.3004C50.5027 12.9465 50.315 12.6649 50.0626 12.4556C49.8103 12.2463 49.4963 12.1417 49.1209 12.1417C48.7362 12.1417 48.4161 12.2463 48.1606 12.4556C47.9083 12.6649 47.719 12.9465 47.5928 13.3004C47.4697 13.6513 47.4081 14.0437 47.4081 14.4776C47.4081 14.9085 47.4697 15.2994 47.5928 15.6502C47.719 16.0011 47.9083 16.2811 48.1606 16.4904C48.4161 16.6966 48.7362 16.7997 49.1209 16.7997ZM54.9281 18L52.9245 10.9091H54.628L55.8744 15.8949H55.9391L57.2132 10.9091H58.8982L60.1724 15.8672H60.2416L61.4696 10.9091H63.1777L61.1695 18H59.4291L58.0996 13.2081H58.0026L56.6731 18H54.9281ZM65.7557 13.8452V18H64.0845V10.9091H65.6818V12.114H65.7649C65.928 11.717 66.1881 11.4015 66.5451 11.1676C66.9052 10.9337 67.3499 10.8168 67.8793 10.8168C68.3686 10.8168 68.7949 10.9214 69.158 11.1307C69.5243 11.34 69.8074 11.6431 70.0075 12.0401C70.2106 12.4371 70.3106 12.9188 70.3075 13.4851V18H68.6364V13.7436C68.6364 13.2696 68.5133 12.8988 68.2671 12.631C68.0239 12.3633 67.6869 12.2294 67.256 12.2294C66.9637 12.2294 66.7036 12.294 66.4759 12.4233C66.2512 12.5495 66.0742 12.7326 65.945 12.9727C65.8188 13.2127 65.7557 13.5036 65.7557 13.8452ZM73.4176 8.54545V18H71.7464V8.54545H73.4176ZM77.9691 18.1385C77.2766 18.1385 76.6765 17.9862 76.1687 17.6815C75.6608 17.3768 75.2669 16.9505 74.9868 16.4027C74.7099 15.8549 74.5714 15.2147 74.5714 14.4822C74.5714 13.7498 74.7099 13.1081 74.9868 12.5572C75.2669 12.0063 75.6608 11.5785 76.1687 11.2738C76.6765 10.9691 77.2766 10.8168 77.9691 10.8168C78.6616 10.8168 79.2617 10.9691 79.7695 11.2738C80.2773 11.5785 80.6697 12.0063 80.9467 12.5572C81.2268 13.1081 81.3668 13.7498 81.3668 14.4822C81.3668 15.2147 81.2268 15.8549 80.9467 16.4027C80.6697 16.9505 80.2773 17.3768 79.7695 17.6815C79.2617 17.9862 78.6616 18.1385 77.9691 18.1385ZM77.9783 16.7997C78.3538 16.7997 78.6677 16.6966 78.9201 16.4904C79.1724 16.2811 79.3602 16.0011 79.4833 15.6502C79.6095 15.2994 79.6726 14.9085 79.6726 14.4776C79.6726 14.0437 79.6095 13.6513 79.4833 13.3004C79.3602 12.9465 79.1724 12.6649 78.9201 12.4556C78.6677 12.2463 78.3538 12.1417 77.9783 12.1417C77.5936 12.1417 77.2735 12.2463 77.0181 12.4556C76.7657 12.6649 76.5765 12.9465 76.4503 13.3004C76.3272 13.6513 76.2656 14.0437 76.2656 14.4776C76.2656 14.9085 76.3272 15.2994 76.4503 15.6502C76.5765 16.0011 76.7657 16.2811 77.0181 16.4904C77.2735 16.6966 77.5936 16.7997 77.9783 16.7997ZM84.5657 18.1431C84.1164 18.1431 83.7117 18.0631 83.3516 17.9031C82.9946 17.7399 82.7114 17.4999 82.5021 17.1829C82.2959 16.8659 82.1928 16.475 82.1928 16.0103C82.1928 15.6102 82.2667 15.2794 82.4144 15.0178C82.5622 14.7562 82.7637 14.5469 83.0192 14.3899C83.2746 14.233 83.5624 14.1145 83.8825 14.0344C84.2056 13.9513 84.5395 13.8913 84.8842 13.8544C85.2997 13.8113 85.6367 13.7728 85.8953 13.739C86.1538 13.7021 86.3415 13.6467 86.4585 13.5728C86.5785 13.4959 86.6385 13.3774 86.6385 13.2173V13.1896C86.6385 12.8419 86.5354 12.5726 86.3292 12.3817C86.123 12.1909 85.826 12.0955 85.4382 12.0955C85.0289 12.0955 84.7042 12.1848 84.4641 12.3633C84.2272 12.5418 84.0671 12.7526 83.984 12.9957L82.4237 12.7741C82.5468 12.3433 82.7499 11.9832 83.033 11.6939C83.3162 11.4015 83.6624 11.183 84.0717 11.0384C84.4811 10.8906 84.9335 10.8168 85.429 10.8168C85.7706 10.8168 86.1107 10.8568 86.4492 10.9368C86.7878 11.0168 87.0971 11.1491 87.3771 11.3338C87.6572 11.5154 87.8819 11.7631 88.0511 12.0771C88.2235 12.391 88.3097 12.7834 88.3097 13.2543V18H86.7031V17.0259H86.6477C86.5462 17.2229 86.4031 17.4076 86.2184 17.5799C86.0368 17.7492 85.8075 17.8861 85.5306 17.9908C85.2566 18.0923 84.935 18.1431 84.5657 18.1431ZM84.9997 16.9151C85.3351 16.9151 85.626 16.849 85.8722 16.7166C86.1184 16.5812 86.3077 16.4027 86.44 16.1811C86.5754 15.9595 86.6431 15.7179 86.6431 15.4563V14.6207C86.5908 14.6638 86.5016 14.7038 86.3754 14.7408C86.2523 14.7777 86.1138 14.81 85.9599 14.8377C85.806 14.8654 85.6537 14.89 85.5029 14.9116C85.352 14.9331 85.2212 14.9516 85.1105 14.967C84.8612 15.0008 84.638 15.0562 84.4411 15.1332C84.2441 15.2101 84.0887 15.3178 83.9748 15.4563C83.8609 15.5917 83.804 15.7672 83.804 15.9826C83.804 16.2904 83.9163 16.5227 84.141 16.6797C84.3657 16.8366 84.6519 16.9151 84.9997 16.9151ZM92.3615 18.1246C91.8044 18.1246 91.3058 17.9815 90.8657 17.6953C90.4256 17.4091 90.0778 16.9936 89.8224 16.4489C89.567 15.9041 89.4392 15.2424 89.4392 14.4638C89.4392 13.6759 89.5685 13.0111 89.827 12.4695C90.0886 11.9247 90.441 11.5138 90.8842 11.2369C91.3274 10.9568 91.8213 10.8168 92.3661 10.8168C92.7816 10.8168 93.1232 10.8875 93.3909 11.0291C93.6587 11.1676 93.8711 11.3353 94.028 11.5323C94.185 11.7262 94.3065 11.9093 94.3927 12.0817H94.462V8.54545H96.1377V18H94.4943V16.8828H94.3927C94.3065 17.0552 94.1819 17.2383 94.0188 17.4322C93.8557 17.623 93.6402 17.7861 93.3725 17.9215C93.1047 18.0569 92.7677 18.1246 92.3615 18.1246ZM92.8277 16.7536C93.1817 16.7536 93.4833 16.6581 93.7326 16.4673C93.9818 16.2734 94.1711 16.0041 94.3004 15.6594C94.4296 15.3147 94.4943 14.9131 94.4943 14.4545C94.4943 13.996 94.4296 13.5974 94.3004 13.2589C94.1742 12.9203 93.9865 12.6572 93.7372 12.4695C93.491 12.2817 93.1878 12.1879 92.8277 12.1879C92.4553 12.1879 92.1445 12.2848 91.8952 12.4787C91.6459 12.6726 91.4582 12.9403 91.332 13.282C91.2058 13.6236 91.1427 14.0144 91.1427 14.4545C91.1427 14.8977 91.2058 15.2932 91.332 15.641C91.4613 15.9857 91.6505 16.258 91.8998 16.4581C92.1522 16.6551 92.4615 16.7536 92.8277 16.7536Z"
              fill="black"
            />
          </svg>
        </a>
        </div>
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
      <div className="audioPlayer mx-4 mt-28 pt-2">
        <Plyr source={mediaSrc} />
      </div>
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
