import React from 'react';
import axios from 'axios';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res);
        this.setState({users: res.data});
      })
      .catch(err => {
        console.log('error!');
        
        console.log(err);
        
      })
  }

  render() {
    return (
    <h2>User List</h2>
    )
  }
}

export default Users;
