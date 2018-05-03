import React from "react"

class Alert extends React.Component {
  render() {
    // Declare constants for your props
    const {type, children} = this.props

    // Return the JSX output for the component
    return (
      <div className={`alert alert-${type}`} role="alert">
        {children}
      </div>
    )
  }
}

export default Alert
