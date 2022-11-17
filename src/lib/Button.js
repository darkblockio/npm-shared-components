import React from "react"
import "./buttons.css"

const Button = ({ variant = "", state = "", type = null, children, className, id = null, onClick = "" }) => {
  return (
    <button className={`${variant} ${className}`} disabled={state} type={type} id={id} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
