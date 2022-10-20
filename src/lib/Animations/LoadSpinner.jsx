import React from "react"
import "./spinner.css"

const LoadSpinner = () => {
  return (
    <svg id="spinner" width="48px" height="48px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#e2e2e2"
        stroke-width="13"
        r="40"
        stroke-dasharray="188.49555921538757 64.83185307179586"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  )
}

export default LoadSpinner
