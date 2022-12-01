import React from "react"
import { cva } from "class-variance-authority"
import "./buttons.css"

const buttonStyles = cva([], {
  variants: {
    variant: {
      primary: ["Darkblock-primary-button"],
      secondary: ["Darkblock-secondary-button"],
    },
    size: {
      medium: ["Darkblock-ButtonMediumText", "py-1", "px-3", "rounded-md"],
      large: ["Darkblock-ButtonLargeText", "py-3", "px-4", "rounded-lg"],
    },
    color: {
      white: ["white"],
      gray: ["gray"],
    },
    layout: {
      done: ["Darkblock-done-button"],
      auth: ["Darkblock-auth-button"],
      upgradeCreate: ["Darkblock-upgrade-create-button"],
      upgradeAddContent: ["Darkblock-upgrade-add-content"],
      mintingAddAnother: ["Darkblock-minting-complete-add-another"],
      mintingDone: ["Darkblock-minting-complete-done"],
      mintingTryAgain: ["Darkblock-minting-try-again"],
    },
  },
})

const Button = ({
  variant = "",
  state = "",
  type = null,
  children,
  size,
  color,
  layout,
  className,
  id = null,
  onClick = "",
}) => {
  return (
    <button
      className={buttonStyles({ variant, layout, size, color, className })}
      disabled={state}
      type={type}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
