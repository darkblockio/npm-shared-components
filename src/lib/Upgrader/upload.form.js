import React, { useEffect, useState } from "react"
import FileUpload from "./fileUpload"

const UpgradeForm = ({ nft, wallet = null, address = null, publicKey = null, platform, onClose }) => {
  const [darkblockDescription, setDarkblockDescription] = useState("")
  const [name, setName] = useState("")
  const [isDownloadable, setIsDownloadable] = useState(false)
  const [fileState, setFileState] = useState({})

  useEffect(() => {
    if (fileState && fileState.name) {
      setName(fileState.name)
    }
  }, [fileState])

  return (
    <div>
      <form onSubmit={() => alert("submit")} className="upgrade-form">
        <FileUpload fileState={fileState} setFileState={setFileState}></FileUpload>
        <input
          type="text"
          className="upgrade-name-input"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <textarea
          className="upgrade-description-input"
          placeholder="Description (optional)"
          cols={50}
          rows={3}
          maxLength={450}
          value={darkblockDescription}
          onChange={(e) => {
            setDarkblockDescription(e.target.value)
          }}
        ></textarea>
        <p className="upgrade-description-char-count">{`${darkblockDescription.length}/450 characters remaining`}</p>

        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-500 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          checked={isDownloadable}
          onChange={(e) => {
            setIsDownloadable(e.target.checked)
          }}
        />
        <label className="downloadable-text">Allow download</label>

        <button type="submit" id="darkblock-submit" className="downloadable-check">
          Create
        </button>
      </form>
    </div>
  )
}

export default UpgradeForm
