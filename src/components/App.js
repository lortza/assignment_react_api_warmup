import React from 'react';
import serialize from 'form-serialize' // npm install form-serialize --save
import '../App.css';
import UserList from './UserList'
import UserForm from './UserForm'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      baseUrl: 'https://reqres.in/api',
      isFetching: false,
      isEditable: false,
      users: [],
      user: {
        id: '',
        first_name: '',
        last_name: '',
        avatar: ''
      }
    }
    this.getAllUsers = this.getAllUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.onEditUserClick = this.onEditUserClick.bind(this)
    this.onUpdateUserClick = this.onUpdateUserClick.bind(this)
  }

  getAllUsers() {
    // Before performing the fetch, set isFetching to true
    this.setState({isFetching: true})
    // After component mounts, call the API to get the
    // users, then update state which triggers re-render
    // fetch('https://reqres.in/api/users?delay=2')
    fetch(`${this.state.baseUrl}/users`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json.data,
          isFetching: false
        })
      })
  }

  deleteUser(e){
    e.preventDefault()
    let users = this.state.users
    let userId = Number(e.target.getAttribute('data-id'))

    const options = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE'
    }

    fetch(`${this.state.baseUrl}/user/${userId}`, options)
      .then( (response) => {
        if(response.status !== 204){
          throw new Error(`${ response.status } ${ response.statusText }`)
        }
        let remainingUsers = users.filter( user => Number(user.id) !== userId )
        this.setState({
          users: remainingUsers
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onEditUserClick(e){
    e.preventDefault()

    let userId = Number(e.target.getAttribute('data-id'))
    const editableUser = this.state.users.filter((user) => ( Number(user.id) === userId ))[0]

    this.setState({
      user: editableUser,
      isEditable: true,
    })
    return false;
  }

  onUpdateUserClick(e){
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('fired: onUpdateUserClick')
  }


  addOrUpdateUser = (e) => {
    e.preventDefault()
    const form = e.target
    const body = serialize(form, {hash: true})

    // Add image if one is missing
    if(!body.avatar){
      body.avatar = 'http://penguinink.co.uk/wp-content/uploads/2018/01/134-127x127.jpg'
      // body.avatar = 'http://via.placeholder.com/127x127'
    }

    // Determine if this is a POST or PUT request
    let httpMethod;
    let urlEnd;

    if(body.id){
      httpMethod = 'PUT'
      urlEnd = `/${body.id}`
    } else {
      httpMethod = 'POST'
      urlEnd = ''
    }

    // Set options, and stringify the body to JSON
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: httpMethod,
      body: JSON.stringify(body),
    }

    // Before performing the fetch, set isFetching to true
    this.setState({isFetching: true})

    fetch(`${this.state.baseUrl}/user${urlEnd}`, options)
      .then( (response) => {
        if(!response.ok){
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then( (json) => {
        this.setState({
          isFetching: false,
          users: [ ...this.state.users, json ]
        }, () => { form.reset() })
      })
      .catch( (error) => {
        console.log(error)
        this.setState({
          isFetching: false,
          error
        })
       })//catch
  }

  componentDidMount() {
    this.getAllUsers()
  }

  render() {
    const {user, error, users, isFetching } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h1>React CRUD Users with reqres.in API</h1>
        </div>

        <UserForm onSubmit={this.addOrUpdateUser} user={user} error={error} />

        <UserList users={users} isFetching={isFetching} deleteUser={this.deleteUser} addOrUpdateUser={this.addOrUpdateUser}/>
      </div>
    );
  }
}

export default App;
