import React, { useState } from "react"
import EmbedButtonIcon from "./../../assets/images/embed-this-button.svg"
import EmbedCodeModal from "../Stack/embedCodeModal"

const EmbedButton = () => {
  const [embedCode, setEmbedCode] = useState("")
  const [showModal, setShowModal] = useState(false) // State to control modal visibility

  const defaultEmbedUrl =
    "https://staging.darkblock.io/platform/avax/embed/collection/0x7bdc01a74dd59759c3965eb11fd086e225a37563"

  React.useEffect(() => {
    // Function to generate the embed code
    function generateEmbedCode() {
      // Use a default URL if window is not available
      const currentUrl = typeof window !== "undefined" ? window.location.href : defaultEmbedUrl
      return `<iframe src="${currentUrl}" width="550px" height="600px" frameborder="0"></iframe>`
    }

    setEmbedCode(generateEmbedCode())
  }, [defaultEmbedUrl])

  const handleEmbedClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <button className="Darkblock-Footer-Embed" onClick={handleEmbedClick}>
        <img src={EmbedButtonIcon} alt="Embed" />
      </button>
      <EmbedCodeModal embedCode={embedCode} open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default EmbedButton
