import CryptoJS from "crypto-js"

function arrayBufferToWordArray(ab) {
  let i8a = new Uint8Array(ab)
  let a = []
  for (let i = 0; i < i8a.length; i += 4) {
    a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}

export function getSHA256OfFile(f) {
  let reader = new FileReader()

  return new Promise((resolve, reject) => {
    // Closure to capture the file information.
    reader.onloadend = (function (theFile) {
      return function (e) {
        var arrayBuffer = e.target.result

        var hash = CryptoJS.SHA256(arrayBufferToWordArray(arrayBuffer))
        resolve(hash.toString())
      }
    })(f)

    reader.onerror = function (e) {
      console.error(e)
    }

    // Read in the image file
    reader.readAsArrayBuffer(f)
  })
}
