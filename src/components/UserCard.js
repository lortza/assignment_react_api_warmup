import React from "react"

class UserCard extends React.Component {
  render(){
    const deleteUser = this.props.deleteUser
    const {id, first_name, last_name, avatar} = this.props.user
    return (
      <React.Fragment>
        <div className="UserCard card" style={{maxWidth: `128px`}} >
          <img
            className="card-img-top img-fluid"
            src={avatar}
            alt="user avatar"
          />
          <div className="card-block">
            <h4>{first_name} {last_name}</h4><br/>
            <i id={id} onClick={deleteUser} className="fas fa-times-circle"></i>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default UserCard
