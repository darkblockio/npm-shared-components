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

export async function downloadFile(url, fileFormat) {
  const res = await fetch(url, {'Access-Control-Expose-Headers': 'Content-Disposition'});
  const raw = await res.blob();

  let filename = 'db_download'
  if (fileFormat.match(/\/aac/gi)) filename = 'db_download.aac'
  if (fileFormat.match(/\/bmp/gi)) filename = 'db_download.bmp'
  if (fileFormat.match(/\/cbr/gi)) filename = 'db_download.cbr'
  if (fileFormat.match(/\/epub/gi)) filename = 'db_download.epub'
  if (fileFormat.match(/\/flac/gi)) filename = 'db_download.flac'
  if (fileFormat.match(/\/gif/gi)) filename = 'db_download.gif'
  if (fileFormat.match(/\/gltf/gi)) filename = 'db_download.gltf'
  if (fileFormat.match(/\/html/gi)) filename = 'db_download.html'
  if (fileFormat.match(/\/jpg/gi)) filename = 'db_download.jpg'
  if (fileFormat.match(/\/jpeg/gi)) filename = 'db_download.jpeg'
  if (fileFormat.match(/\/m4a/gi)) filename = 'db_download.m4a'
  if (fileFormat.match(/\/mkv/gi)) filename = 'db_download.mkv'
  if (fileFormat.match(/\/mp3/gi)) filename = 'db_download.mp3'
  if (fileFormat.match(/\/mp4/gi)) filename = 'db_download.mp4'
  if (fileFormat.match(/\/mpeg/gi)) filename = 'db_download.mpeg'
  if (fileFormat.match(/\/ogg/gi)) filename = 'db_download.ogg'
  if (fileFormat.match(/\/ogv/gi)) filename = 'db_download.ogv'
  if (fileFormat.match(/\/opus/gi)) filename = 'db_download.opus'
  if (fileFormat.match(/\/other/gi)) filename = 'db_download.other'
  if (fileFormat.match(/\/pdf/gi)) filename = 'db_download.pdf'
  if (fileFormat.match(/\/png/gi)) filename = 'db_download.png'
  if (fileFormat.match(/\/svg/gi)) filename = 'db_download.svg'
  if (fileFormat.match(/\/tgz/gi)) filename = 'db_download.tgz'
  if (fileFormat.match(/\/usdz/gi)) filename = 'db_download.usdz'
  if (fileFormat.match(/\/wav/gi)) filename = 'db_download.wav'
  if (fileFormat.match(/\/webm/gi)) filename = 'db_download.webm'
  if (fileFormat.match(/\/zip/gi)) filename = 'db_download.zip'

  if (window !== undefined) {
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(raw)
    a.download = filename;
    document.body.appendChild(a)
    a.click();
    a.remove();
    window.URL.revokeObjectURL(raw)
  }

}
