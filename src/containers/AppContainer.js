import React from 'react';
import App from '../components/App'
import serialize from 'form-serialize'


class AppContainer extends React.Component {
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
    return <App onAddUser={this.onAddUser} {...this.state} />
  }
}

export default AppContainer;
