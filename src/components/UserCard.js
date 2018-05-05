import React from "react"

class UserCard extends React.Component {
  render(){
    const {deleteUser, editUser} = this.props
    const {id, first_name, last_name, avatar} = this.props.user
    return (
      <React.Fragment>
        <div className="UserCard card" style={{maxWidth: `128px`}} >
          <img
            className="card-img-top img-fluid"
            src={avatar}
            alt="user avatar"
          />
          <div className="card-block" data-id={id}>
            <h4>{first_name} {last_name}</h4>
            <p>
              <i onClick={deleteUser} className="fas fa-times-circle"></i>
              <i onClick={editUser} className="fal fa-edit"></i>
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default UserCard
