import React from "react"
import Button from './elements/Button'
import Alert from './elements/Alert'
import Showable from './elements/Showable'

const UserEditForm = ({user, onUpdateUserClick, error}) => (
  <form className="container">
    <h1>Edit User</h1>
    <Showable errorMsg={error}>
      <Alert type="danger">
        Oops, there was a problem...
      </Alert>
    </Showable>
    <div className='row'>
      <div className="form-group col-xs-3">
        <input type='text' name="first_name" placeholder="First Name" className='form-control' value={user.first_name} onChange={onUpdateUserClick}/>
      </div>

      <div className="form-group col-xs-3">
        <input type='text' name="last_name" placeholder="Last Name" className='form-control' value={user.last_name} onChange={onUpdateUserClick}/>
      </div>

      <div className="form-group col-xs-3">
        <input type='text' name="avatar" placeholder="Photo Link" className='form-control' value={user.avatar} onChange={onUpdateUserClick}/>
      </div>

      <div className="col-xs-3">
        <Button type="submit" color="primary">
          Save User
        </Button>
      </div>
    </div>
  </form>
)

export default UserEditForm
