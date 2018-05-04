import React from 'react';
import App from '../components/App'
import serialize from 'form-serialize' // npm install form-serialize --save


class AppContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      baseUrl: 'https://reqres.in/api',
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
    return <App addOrUpdateUser={this.addOrUpdateUser} deleteUser={this.deleteUser} {...this.state} />
  }
}

export default AppContainer;
