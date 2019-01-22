import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', this.state)
      .then(res => {
        console.log(res);
        
        if (res) {
          console.log('thank you for registering. You may now log in');
        } else {
          console.log('there was an error logging in');
        }
      })
      .catch(err => console.log());
  }

  render() {
  return (
    <>
    <h2>register</h2>
    <form onSubmit={this.handleSubmit}>
    <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
    <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
    <input type="submit" />
    </form>
    </>
  )
}
}
export default Register;
