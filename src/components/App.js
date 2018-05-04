import React from 'react';
import '../App.css';
import UserList from './UserList'
import UserForm from './UserForm'


const App = ({users, isFetching, error, onAddUser, deleteUser}) => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>reqres.in API Contact Cards</h1>
      </div>
      <UserForm
        onSubmit={onAddUser}
        error={error}
      />
      <UserList users={users} isFetching={isFetching} deleteUser={deleteUser}/>
    </div>
  );
}

export default App;
