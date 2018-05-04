import React from "react"
import UserCard from './UserCard'



const UserList = ({users, isFetching, deleteUser}) => {
  const userList = users.map((user) => {
    return <UserCard user={user} key={user.id} deleteUser={deleteUser}/>
  })

  return (
    <div className="container">
      <div className="card-group">
        {isFetching ? <img className='loading-spinner mx-auto' src='/images/loading1.gif' alt='Loading...'/> : userList}
      </div>
    </div>
  )

}

export default UserList
