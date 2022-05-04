import React from "react"
import Lottie from "react-lottie"
import dbLoading from "./dbLoading"

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dbLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return <Lottie options={defaultOptions} />
}

export default Loading
