import React from "react"
import { useTranslation } from "react-i18next"

const formats = [
  "aac",
  "bmp",
  "cbr",
  "epub",
  "flac",
  "gif",
  "glb",
  "html",
  "jpg",
  "m4a",
  "mkv",
  "mp3",
  "mp4",
  "mpeg",
  "ogg",
  "ogv",
  "opus",
  "pdf",
  "png",
  "svg",
  "tgz",
  "usdz",
  "wav",
  "webm",
  "zip",
]

const FileUpload = ({ fileState, setFileState }) => {
  const { t } = useTranslation()
  return (
    <div className="Darkblock-fileupload-container">
      <div>
        <h1 className="Darkblock-fileupload-header">{t("fileUpload")}</h1>
        <h3 className="Darkblock-fileupload-header-supported">{t("supportedFileFormats")}:</h3>
        <p className="Darkblock-fileupload-formats Darkblock-BodyText">{formats.join(", ")}</p>
        <p className="Darkblock-fileupload-info Darkblock-BodyText">{t("maxFileSize")}</p>
        <div style={{ display: "flex", alignItems: "center" }} className="hidden">
          <span id="size" />
        </div>
      </div>
      <div className="Darkblock-BodyText Darkblock-fileupload-input-container">
        <div className="Darkblock-file-upload-container">
          <div className="Darkblock-file-upload-input">
            <input
              id="file-upload" //maybe not change this one
              type="file"
              className="Darkblock-input-file"
              name="fileUpload"
              accept={formats.join(" ")}
              onChange={(e) => {
                if (e.target.files) {
                  let f = e.target.files[0]
                  setFileState(f)
                }
              }}
            />
            <label id="Darkblock-file-select" htmlFor="file-upload">
              {t("choose.file")}
            </label>
          </div>
        </div>
        {!fileState ? (
          <div className="Darkblock-file-upload-not-image-container">
            <span>{t("notFile")}</span>
          </div>
        ) : (
          <div className="Darkblock-file-upload-image-container">
            <div className="Darkblock-file-upload-image">
              <label htmlFor="file-upload">
                {fileState && /\.(?=gif|jpg|png|jpeg)/gi.test(fileState.name) && (
                  <img src={URL.createObjectURL(fileState)} width="100px" height="100px" />
                )}
              </label>
            </div>
            <div className="Darkblock-file-upload-image-name">
              <label htmlFor="file-upload">{fileState?.name}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload
