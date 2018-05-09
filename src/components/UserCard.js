import React from "react"

class UserCard extends React.Component {
  render(){
    const {user, deleteUser, onEditUserClick} = this.props
    const {id, first_name, last_name, avatar} = user
    return (
      <React.Fragment>
        <div className="UserCard card" style={{maxWidth: `128px`}} >
          <img
            className="card-img-top img-fluid"
            src={avatar}
            alt="user avatar"
          />
          <div className="card-block">
            <h4>{first_name} {last_name}</h4>
            <p>
              <i data-id={id} onClick={deleteUser} className="fas fa-times-circle"></i>
              <i data-id={id} onClick={onEditUserClick} className="fal fa-edit"></i>
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default UserCard
