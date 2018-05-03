import React from "react"

const Showable = ({errorMsg, children}) => {
  if (!errorMsg) {
    return null
  }
  return <div>{children}</div>
}

export default Showable
