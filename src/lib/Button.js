import React from "react"
import { cva, cx } from "class-variance-authority"
import "./buttons.css"

const buttonStyles = cva([], {
  variants: {
    variant: {
      primary: ["bg-black", "disabled:bg-neutral-500", "disabled:text-neutral-400", "hover:bg-neutral-800"],
      secondary: ["bg-neutral-200", "disabled:bg-neutral-100", "disabled:text-neutral-300", "hover:bg-neutral-300"],
    },
    size: {
      medium: ["Darkblock-ButtonMediumText", "py-1", "px-3", "rounded-md"],
      large: ["Darkblock-ButtonLargeText", "py-2", "px-4", "rounded-md"],
    },
    color: {
      white: ["bg-white", "disabled:bg-white hover:bg-neutral-50", "disabled:text-neutral-300", "hover:text-black"],
      gray: ["bg-neutral-700", "disabled:bg-neutral-700", "disabled:text-neutral-500", "hover:bg-neutral-600"],
    },
    layout: {
      done: cx("w-20", "p-2 m-4 mt-6", "text-white", "rounded-lg"),
      auth: [
        "flex",
        "items-center",
        "justify-center",
        "flex-auto",
        "px-4",
        "py-2",
        "font-medium",
        "font-bold",
        "text-center",
        "text-black",
        "rounded-md",
        "w-fit",
        "h-fit",
      ],
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
