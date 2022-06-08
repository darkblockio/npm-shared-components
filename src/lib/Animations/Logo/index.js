import React from "react"
import Lottie from "react-lottie"
import dbLogo from "./dbLogo"

const Logo = ({loop = false}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: dbLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return <Lottie options={defaultOptions} />
}

export default Logo
