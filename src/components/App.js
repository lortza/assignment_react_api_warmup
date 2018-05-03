import React, { Component } from 'react';
import '../App.css';
import UserList from './UserList'
import UserForm from './UserForm'
import serialize from 'form-serialize'


class App extends Component {
  constructor(){
    super()
    this.state = {
      users: [],
      isFetching: false
    }
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({isFetching: true})
    // After component mounts, call the API to get the
    // users, then update state which triggers re-render
    fetch('https://reqres.in/api/users?delay=2')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json.data,
          isFetching: false
        })
      })
  }

  onAddUser = (e) => {
    e.preventDefault()
    const form = e.target
    const body = serialize(form, {hash: true})
    console.log(body)

    // Create headers to set the content type to json
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    // Set options, and stringify the body to JSON
    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    }

    // Before performing the fetch, set isFetching to true
    this.setState({isFetching: true})

    fetch('https://reqres.in/api/users', options)
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

  render() {
    const {users, isFetching, error} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h1>reqres.in API Contact Cards</h1>
        </div>
        <UserForm
          onSubmit={this.onAddUser}
          error={error}
        />
        <UserList users={users} isFetching={isFetching} />
      </div>
    );
  }
}

export default App;
