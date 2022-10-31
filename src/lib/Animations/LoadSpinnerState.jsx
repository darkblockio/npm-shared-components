import React from "react"
import "./spinner.css"

const LoadSpinnerState = () => {
  return (
    <svg className="spinner" width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#000000"
        strokeWidth="13"
        r="40"
        strokeDasharray="188.49555921538757 64.83185307179586"
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

export default LoadSpinnerState
