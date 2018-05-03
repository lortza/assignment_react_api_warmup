import React from "react"

const Button = (props) => {
  const {type, color, children} = props

  return (
    <button
      type={type}
      className={`btn btn-${color} btn-xs`}
    >
      {children}
    </button>
  )
}

export default Button
