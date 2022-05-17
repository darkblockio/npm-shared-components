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

export async function verifyAssetByDarkblock(txID) {
  try {
    let formData = new FormData()
    formData.append("ids", `${txID}`)
    // eslint-disable-next-line
    const response = await fetch(`https://app.darkblock.io/api/verify-id`, {
      method: "POST",
      body: formData,
    })
    const assetData = await response.json()
    return assetData
  } catch (e) {
    console.log(e)
    return []
  }
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

export async function getNonce(artID) {
  try {
    const response = await fetch(`https://gateway.darkblock.io/nonceme?artid=${artID}`)
    const asset = await response.json()
    return encodeURIComponent(asset.nonce)
  } catch (e) {
    return []
  }
}
