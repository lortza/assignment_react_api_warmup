import React from "react"
import Input from './Input'

const InputGroup = ({name, labelText, onUpdateUserClick, children}) => (
  <div className="form-group col-xs-3">
    {/*<label htmlFor={name}>{labelText}</label>*/}
    <Input name={name} placeholder={labelText} onUpdateUserClick={onUpdateUserClick} />
  </div>
)

export default InputGroup
