import React from "react"
import InputGroup from './elements/InputGroup'
import Button from './elements/Button'
import Alert from './elements/Alert'
import Showable from './elements/Showable'

const UserForm = ({onSubmit, error}) => (
  <form className="container" onSubmit={onSubmit} >
    <h1>Add New User</h1>
    <Showable errorMsg={error}>
      <Alert type="danger">
        Oops, there was a problem...
      </Alert>
    </Showable>
    <div className='row'>
      <InputGroup name="first_name" labelText="First Name" />

      <InputGroup name="last_name" labelText="Last Name" />

      <InputGroup name="avatar" labelText="Photo Link" />

      <div className="col-xs-3">
        <Button type="submit" color="primary">
          Save User
        </Button>
      </div>
    </div>
  </form>
)

export default UserForm
