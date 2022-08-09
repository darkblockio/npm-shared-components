import React from "react"

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
  return (
    <div className="fileupload-container">
      <div>
        <h4 className="fileupload-header">Upload a file</h4>
        <p className="fileupload-header-supported">Supported File Formats:</p>
        <p className="fileupload-formats">{formats.join(", ")}</p>
        <p className="fileupload-info">Max file size 350MB</p>
        <div style={{ display: "flex", alignItems: "center" }} className="hidden">
          <span id="size" />
        </div>
      </div>
      <div className="fileupload-input-container">
        <input
          id="file-upload" //maybe not change this one
          type="file"
          name="fileUpload"
          accept={formats.join(" ")}
          onChange={(e) => {
            if (e.target.files) {
              let f = e.target.files[0]
              setFileState(f)
            }
          }}
        />

        <label htmlFor="file-upload">
          {fileState && /\.(?=gif|jpg|png|jpeg)/gi.test(fileState.name) && (
            <img src={URL.createObjectURL(fileState)} width="100px" height="100px" />
          )}
        </label>
      </div>
    </div>
  )
}

export default FileUpload
