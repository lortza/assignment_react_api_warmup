import React from 'react';
import App from '../components/App'
import serialize from 'form-serialize' // npm install form-serialize --save


class AppContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      users: [],
      isFetching: false
    }
    this.getAllUsers = this.getAllUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  getAllUsers() {
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

  deleteUser(e){
    e.preventDefault()
    let userId = e.target.id
    console.log(userId)

    const options = {
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'same-origin',
      mode: 'cors',
      method: 'DELETE'
    }

    fetch(`https://reqres.in/api/user/${userId}`, options)
      .then( (response) => {
        if(response.status === 204){
          console.log('yay. deleted.')
        }
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

  componentDidMount() {
    this.getAllUsers()
  }

  render() {
    return <App onAddUser={this.onAddUser} deleteUser={this.deleteUser} {...this.state} />
  }
}

export default AppContainer;
