import React from 'react';
import '../App.css';
import UserList from './UserList'
import UserForm from './UserForm'


const App = ({users, isFetching, error, addOrUpdateUser, deleteUser}) => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>React CRUD Users with reqres.in API</h1>
      </div>
      <UserForm
        onSubmit={addOrUpdateUser}
        error={error}
      />
      <UserList users={users} isFetching={isFetching} deleteUser={deleteUser}/>
    </div>
  );
}

export default App;
