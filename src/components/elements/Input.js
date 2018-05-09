import React from "react"

const Input = (props) => (
  <input type='text' className='form-control' { ...props } />
)

// The above is the same as this:
// const Input = ({name, placeholder}) => (
//   <input type='text' name={name} placeholder={placeholder} className='form-control' />
// )

export default Input


