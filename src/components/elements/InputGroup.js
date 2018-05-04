import React from "react"
import Input from './Input'


const InputGroup = ({name, labelText, children}) => (
  <div className="form-group col-xs-3">
    {/*<label htmlFor={name}>{labelText}</label>*/}
    <Input name={name} placeholder={labelText} />
  </div>
)

export default InputGroup
