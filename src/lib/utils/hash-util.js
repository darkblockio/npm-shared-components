import CryptoJS from "crypto-js"

function loading(file, callbackProgress, callbackFinal) {
  let chunkSize = 1024 * 1024 // bytes
  let offset = 0
  let size = chunkSize
  let partial
  let index = 0

  if (file.size === 0) {
    callbackFinal()
  }
  while (offset < file.size) {
    partial = file.slice(offset, offset + size)
    let reader = new FileReader()
    reader.size = chunkSize
    reader.offset = offset
    reader.index = index
    reader.onload = function (evt) {
      callbackRead(this, file, evt, callbackProgress, callbackFinal)
    }
    reader.readAsArrayBuffer(partial)
    offset += chunkSize
    index += 1
  }
}

let lastOffset = 0

function callbackRead(reader, file, evt, callbackProgress, callbackFinal) {
  if (lastOffset === reader.offset) {
    // in order chunk
    lastOffset = reader.offset + reader.size
    callbackProgress(evt.target.result)
    if (reader.offset + reader.size >= file.size) {
      callbackFinal()
    }
  } else {
    // not in order chunk
    setTimeout(function () {
      callbackRead(reader, file, evt, callbackProgress, callbackFinal)
    }, 10)
  }
}

export function getSHA256OfFileChunks(f) {
  const file = f
  let SHA256 = CryptoJS.algo.SHA256.create()
  let counter = 0

  return new Promise((resolve, reject) => {
    // Closure to capture the file information.
    try {
      loading(
        file,
        function (data) {
          let wordBuffer = CryptoJS.lib.WordArray.create(data)
          SHA256.update(wordBuffer)
          counter += data.byteLength
        },
        function (data) {
          let encrypted = SHA256.finalize().toString()
          lastOffset = 0
          resolve(encrypted)
        }
      )
    } catch (e) {
      lastOffset = 0
      reject(e)
    }
  })
}
