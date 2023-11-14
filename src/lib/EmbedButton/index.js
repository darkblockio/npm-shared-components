import React, { useState, useEffect } from "react"
import EmbedButtonIcon from "./../../assets/images/embed-this-button.svg"
import EmbedCodeModal from "../Stack/embedCodeModal"

const EmbedButton = ({ state }) => {
  const [embedCode, setEmbedCode] = useState("")
  const [showModal, setShowModal] = useState(false) // State to control modal visibility

  const platformMap = {
    "ethereum": "eth",
    "ethereum-goerli": "eth-goerli",
    "tezos": "tez",
    "tezos-ithaca": "tez-ithaca",
    "avalanche": "avax",
    "avalanche-fuji": "avax-fuji",
    "polygon": "matic",
    "polygon-mumbai": "matic-mumbai",
    "solana": "sol",
    "solana-devnet": "sol-devnet",
  }

  const getShortPlatform = (platform) => {
    return platformMap[platform.toLowerCase()] || ""
  }

  useEffect(() => {
    function generateEmbedCode() {
      // Function to construct the URL based on the state context
      function constructUrl() {
        if (!state || !state.context) return null

        const { platform, isCollectionLevel, contractAddress, tokenId } = state.context

        if (!platform || !contractAddress) return null

        const baseUrl = "https://app.darkblock.io/platform"
        const shortPlatform = getShortPlatform(platform)

        return isCollectionLevel
          ? `${baseUrl}/${shortPlatform}/embed/collection/${contractAddress}`
          : `${baseUrl}/${shortPlatform}/embed/nft/${contractAddress}/${tokenId}`
      }

      const currentUrl = constructUrl()

      if (!currentUrl) return ""

      return `<iframe
      allow="fullscreen"
      style="border: 1px solid var(--border-neutral-300, #d4d4d4); padding: 8px; border-radius: 12px; height: 540px; width: 550px;"
      title="darkblock"
      src="${currentUrl}">
      </iframe>`
    }

    setEmbedCode(generateEmbedCode())
  }, [state.value])

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
