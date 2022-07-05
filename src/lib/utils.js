export function shortenEthAddr(addr, platform) {
  if (platform == "Solana") {
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 4)
  }

  return "0x" + (addr.slice(2, 6) + "..." + addr.slice(addr.length - 4)).toUpperCase()
}

export function humanFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i]
}

export async function getArweaveData(id, platform) {
  try {
    const response = await fetch(`https://api.darkblock.io/v1/darkblock/info?nft_id=${id}&nft_platform=${platform}`)
    const data = await response.json()
    return data
  } catch (e) {
    return []
  }
}

export async function getOwner(contractAddr, tokenId, platform, owner = "") {
  try {
    const response = await fetch(
      `https://api.darkblock.io/v1/nft/owner?platform=${platform}&contract_address=${contractAddr}&token_id=${tokenId}&owner=${owner}`
    )
    const asset = await response.json()
    return asset
  } catch (e) {
    return []
  }
}

export async function getCreator(contractAddr, tokenId, platform) {
  try {
    const response = await fetch(
      `https://api.darkblock.io/v1/nft/creator?platform=${platform}&contract_address=${contractAddr}&token_id=${tokenId}`
    )
    const asset = await response.json()
    return asset
  } catch (e) {
    return []
  }
}

export function getProxyAsset(artID, sessionToken, tokenId, contract, nonce, platform, tezosPublicKey = null) {
  let owner = ""
  if (tezosPublicKey && tezosPublicKey.length > 0) {
    owner = `&owner=${encodeURIComponent(tezosPublicKey)}`
  }

  if (nonce) {
    return `https://gateway.darkblock.io/proxy?artid=${artID}&session_token=${sessionToken}&token_id=${tokenId}&contract=${contract}&nonce=${nonce}&platform=${platform}${owner}`
  } else {
    return `https://gateway.darkblock.io/proxy?artid=${artID}&session_token=${sessionToken}&token_id=${tokenId}&contract=${contract}&platform=${platform}${owner}`
  }
}

export async function downloadFile(url, fileFormat, filename = "") {
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
  if (fileFormat.match(/\/gltf/gi)) ext = "gltf"
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

  if (window !== undefined) {
    const a = document.createElement("a")
    a.href = window.URL.createObjectURL(raw)
    a.download = `${filename}.${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(raw)
  }
}
