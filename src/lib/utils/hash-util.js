import CryptoJS from "crypto-js"

// function arrayBufferToWordArray(ab) {
//   let i8a = new Uint8Array(ab)
//   let a = []
//   for (let i = 0; i < i8a.length; i += 4) {
//     a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3])
//   }
//   return CryptoJS.lib.WordArray.create(a, i8a.length)
// }

// export function getSHA256OfFile(f) {
//   let reader = new FileReader()
//
//   return new Promise((resolve, reject) => {
//     // Closure to capture the file information.
//     reader.onloadend = (function (theFile) {
//       return function (e) {
//         var arrayBuffer = e.target.result
//
//         var hash = CryptoJS.SHA256(arrayBufferToWordArray(arrayBuffer))
//         resolve(hash.toString())
//       }
//     })(f)
//
//     reader.onerror = function (e) {
//       console.error(e)
//     }
//
//     // Read in the image file
//     reader.readAsArrayBuffer(f)
//   })
// }

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

function callbackRead(reader, file, evt, callbackProgress, callbackFinal) {
  callbackProgress(evt.target.result)
  if (reader.offset + reader.size >= file.size) {
    callbackFinal()
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
          resolve(encrypted)
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}
