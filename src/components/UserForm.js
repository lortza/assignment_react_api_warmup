import React from "react"
import InputGroup from './elements/InputGroup'
import Button from './elements/Button'
import Alert from './elements/Alert'
import Showable from './elements/Showable'

function _santizeProps(props) {
  return {
    first_name: props.user.first_name || '',
    last_name: props.user.last_name || '',
    avatar: props.user.avatar || '',
    id: props.user.id
  };
}

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _santizeProps(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    const {onSubmit, error} = this.props
    return (
      <form className="container" onSubmit={onSubmit} >
        <Showable errorMsg={error}>
          <Alert type="danger">
            Oops, there was a problem...
          </Alert>
        </Showable>

        <div className='row'>
          <InputGroup name="first_name" labelText="First Name" onChange={this.onInputChange} />

          <InputGroup name="last_name" labelText="Last Name" onChange={this.onInputChange}/>

          <InputGroup name="avatar" labelText="Photo Link" onChange={this.onInputChange}/>

          <div className="col-xs-3">
            <Button type="submit" color="primary">
              Save User
            </Button>
          </div>
        </div>
      </form>
    )//return
  }// render
}// class

export default UserForm
