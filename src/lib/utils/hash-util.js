import CryptoJS from "crypto-js"

export function hashInChunks(file) {
  let SHA256 = CryptoJS.algo.SHA256.create()
  let counter = 0

  return new Promise((resolve, reject) => {
    loading(
      file,
      function (data) {
        let wordBuffer = CryptoJS.lib.WordArray.create(data)
        SHA256.update(wordBuffer)
        counter += data.byteLength
      },
      function (data) {
        // console.log("Hashing File : 100%");
        let encrypted = SHA256.finalize().toString()
        data = null
        resolve(encrypted)
      }
    )
  })
}

function loading(file, callbackProgress, callbackFinal) {
  let chunkSize = 1024 * 1024 // bytes[2mb] - increasing chunkSize takes more memory, decreasing it takes more time
  let offset = 0
  let size = chunkSize
  let partial
  let index = 0

  if (file.size === 0) {
    callbackFinal()
  }

  while (offset < file.size) {
    let reader = new FileReader()
    partial = file.slice(offset, offset + size)
    reader.size = chunkSize
    reader.offset = offset
    reader.index = index
    reader.onload = function (evt) {
      callbackRead(this, file, evt, callbackProgress, callbackFinal)
    }
    reader.readAsArrayBuffer(partial)
    offset += chunkSize
    index += 1
    reader = null
  }
}

function callbackRead(reader, file, evt, callbackProgress, callbackFinal) {
  callbackProgress(evt.target.result)
  if (reader.offset + reader.size >= file.size) {
    callbackFinal()
  }
}
