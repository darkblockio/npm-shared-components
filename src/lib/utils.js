export function shortenEthAddr(addr, platform) {
  if (platform.toLowerCase().includes("solana")) {
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 4)
  }

  return "0x" + (addr.slice(2, 6) + "..." + addr.slice(addr.length - 4)).toUpperCase()
}

export function humanFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i]
}

export async function getJsonData(url) {
  return await fetch(url)
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON
    })
    .catch((error) => {
      return { error: error }
    })
}

export async function getNFTData(contract, id, platform, dev = false) {
  const pageSize = 50
  const baseUrl = dev ? "https://dev1.darkblock.io/v1" : "https://api.darkblock.io/v1"

  return await fetch(
    `${baseUrl}/nft/metadata?platform=${platform}&contract=${contract}&token=${id}&offest=0&page_size=${pageSize}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        nft: data.data,
      }
    })
    .catch((error) => {
      console.log(error)
      return {
        nft: null,
      }
    })
}

export async function getArweaveData(
  id,
  platform,
  dev = false,
  verified = "",
  isCollectionLevel = false,
  connectedWallet = null
) {
  const baseUrl = dev ? "https://dev1.darkblock.io/v1" : "https://api.darkblock.io/v1"
  let endpoint = "/darkblock/info"
  const params = new URLSearchParams()

  if (verified) {
    params.append("verified", verified)
  }

  if (isCollectionLevel) {
    // If it's collection level, use the 'id' as the collection identifier
    const [collectionId] = id.split(":") // Split the 'id' and take the first part as the collection identifier
    endpoint += "/collection"
    params.set("id", collectionId)
    params.set("platform", platform) // Use 'platform' for collection endpoint
  } else {
    // If it's not collection level, use the 'id' as the individual NFT identifier
    params.set("nft_id", id)
    params.set("nft_platform", platform) // Use 'nft_platform' for individual NFT endpoint
  }

  if (connectedWallet) {
    params.append("wallet", connectedWallet)
  }

  const fullUrl = `${baseUrl}${endpoint}?${params.toString()}`

  try {
    const response = await fetch(fullUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (verified) {
      const verifiedTypes = verified.split("::")
      if (data.dbstack) {
        data.dbstack = data.dbstack.filter((item) => item.tags.some((tag) => verifiedTypes.includes(tag.value)))
      }
    }

    return data
  } catch (e) {
    // Handle errors more gracefully here
    console.error(e)
    return {
      status: "Not Found",
      dbs_count: 0,
      dbstack: [],
      info: e.message,
    }
  }
}

export async function getOwner(contractAddr, tokenId, platform, owner = "", dev = false) {
  const baseUrl = dev ? "https://dev1.darkblock.io/v1" : "https://api.darkblock.io/v1"

  try {
    const response = await fetch(
      `${baseUrl}/nft/owner?platform=${platform}&contract_address=${contractAddr}&token_id=${tokenId}&owner=${owner}`
    )
    const asset = await response.json()
    return asset
  } catch (e) {
    return []
  }
}

export async function getCreator(contractAddr, tokenId, platform, dev = false) {
  const baseUrl = dev ? "https://dev1.darkblock.io/v1" : "https://api.darkblock.io/v1"

  // Function to make the fetch request
  async function fetchCreator(refresh = false) {
    const refreshParam = refresh ? "&refresh=true" : ""
    const response = await fetch(
      `${baseUrl}/nft/creator?platform=${platform}&contract_address=${contractAddr}${
        tokenId && tokenId !== "undefined" ? `&token_id=${tokenId}` : ""
      }${refreshParam}`
    )
    return response.json()
  }

  try {
    // First attempt without refresh
    let asset = await fetchCreator()

    // Check if the 'creator_address' is empty or 'all_creators' array is empty
    if (!asset.creator_address || (Array.isArray(asset.all_creators) && asset.all_creators.length === 0)) {
      // If data is empty, make a second attempt with refresh
      asset = await fetchCreator(true)
    }

    return asset
  } catch (e) {
    console.error(e) // It's better to log the error for debugging
    return []
  }
}

export function getProxyAsset(artID, sessionToken, tokenId, contract, nonce, platform, owner) {
  let ownerParam = ""
  if (owner && owner.length > 0) {
    ownerParam = `&owner=${encodeURIComponent(owner)}`
  }

  if (nonce) {
    return `https://gateway.darkblock.io/proxy?artid=${artID}&session_token=${sessionToken}&token_id=${tokenId}&contract=${contract}&nonce=${nonce}&platform=${platform}${ownerParam}`
  } else {
    return `https://gateway.darkblock.io/proxy?artid=${artID}&session_token=${sessionToken}&token_id=${tokenId}&contract=${contract}&platform=${platform}${ownerParam}`
  }
}

import mime from "mime"

export async function downloadFile(url, fileFormat, filename = "", fileNameTag = "") {
  filename = !filename || filename === "" ? "unlockable" : filename
  const res = await fetch(url, { "Access-Control-Expose-Headers": "Content-Disposition" })
  const raw = await res.blob()
  let ext = ""
  if (fileFormat.match(/\/aac/gi)) ext = "aac"
  if (fileFormat.match(/\/bmp/gi)) ext = "bmp"
  if (fileFormat.match(/\/cbr/gi)) ext = "cbr"
  if (fileFormat.match(/\/epub/gi)) ext = "epub"
  if (fileFormat.match(/\/flac/gi)) ext = "flac"
  if (fileFormat.match(/\/gif/gi)) ext = "gif"
  if (fileFormat.match(/\/glbtf/gi)) ext = "glb"
  if (fileFormat.match(/\/html/gi)) ext = "html"
  if (fileFormat.match(/\/jpg/gi)) ext = "jpg"
  if (fileFormat.match(/\/jpeg/gi)) ext = "jpeg"
  if (fileFormat.match(/\/m4a/gi)) ext = "m4a"
  if (fileFormat.match(/\/mkv/gi)) ext = "mkv"
  if (fileFormat.match(/\/mp3/gi)) ext = "mp3"
  if (fileFormat.match(/\/mp4/gi)) ext = "mp4"
  if (fileFormat.match(/\/mpeg/gi)) ext = "mpeg"
  if (fileFormat.match(/\/ogg/gi)) ext = "ogg"
  if (fileFormat.match(/\/ogv/gi)) ext = "ogv"
  if (fileFormat.match(/\/opus/gi)) ext = "opus"
  if (fileFormat.match(/\/other/gi)) ext = "other"
  if (fileFormat.match(/\/pdf/gi)) ext = "pdf"
  if (fileFormat.match(/\/png/gi)) ext = "png"
  if (fileFormat.match(/\/svg/gi)) ext = "svg"
  if (fileFormat.match(/\/tgz/gi)) ext = "tgz"
  if (fileFormat.match(/\/usdz/gi)) ext = "usdz"
  if (fileFormat.match(/\/wav/gi)) ext = "wav"
  if (fileFormat.match(/\/webm/gi)) ext = "webm"
  if (fileFormat.match(/\/zip/gi)) ext = "zip"
  if (fileFormat.match(/\/x-msdos-batch/gi)) ext = "bat"

  // Fallback to extension from fileNameTag
  if (!ext && fileNameTag) {
    const match = fileNameTag.match(/\.[0-9a-z]+$/i) // Regex to extract file extension
    if (match && match[0]) {
      ext = match[0].substring(1) // Remove the dot at the beginning
    }
  }

  // Custom MIME Type Handling
  if (fileFormat.startsWith("custom/")) ext = fileFormat.split("/")[1]

  if (!ext) {
    try {
      ext = mime.getExtension(fileFormat)
    } catch (e) {
      console.log("could not determine ext from content-type")
    }
  }

  if (typeof window !== "undefined") {
    const a = document.createElement("a")
    a.href = window.URL.createObjectURL(raw)
    a.download = `${filename}.${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(raw)
  }
}
