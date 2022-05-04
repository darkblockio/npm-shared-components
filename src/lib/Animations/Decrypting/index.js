import React from "react"
import Lottie from "react-lottie"
import dbDecrypting from "./dbDecrypting"

const Decrypting = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dbDecrypting,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return <Lottie options={defaultOptions} />
}

export default Decrypting
