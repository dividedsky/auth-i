import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 60%;
    padding: 15px;
    margin: 5px 0;
    border-radius: 20px;
    background-color: ${props => props.theme.lBlue}
  }

`;


class RegisterLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        password: '',
      },
      showModal: false,
      modalMessage: '',
    }
  }

  clearFormFields = () => {
    this.setState({ user: {username: '', password: ''} })
  }

  handleChange = (e) => {
    const value = {[e.target.name]: e.target.value};
    this.setState({ user: {...this.state.user, ...value}})
  }

  handleSubmit = (e) => {
    this.setState({ modalMessage: '' })
    e.preventDefault();
    if (this.props.login) {
      axios.post('http://localhost:5000/api/login', this.state.user)
        .then(res => {
          this.setState({modalMessage: res.data, showModal: true})
        })
        .catch(err => {
          this.setState({modalMessage: err.message, showModal: true});
        })
    } else {
      // registering
      
    axios.post('http://localhost:5000/api/register', this.state.user)
      .then(res => {
        
        if (res.status === 201) {
          this.setState({modalMessage: `Thank you for registering, ${this.state.user.username}. You may now log in.`, showModal: true})
        } else {
          this.setState({modalMessage: 'there was an error registering', showModal: true});
        }
      })
      .catch(err => console.log());
  }
    this.clearFormFields();
  }

  render() {
  return (
    <>
    <h2>{this.props.login ? 'login' : 'register'}</h2>
    <Form onSubmit={this.handleSubmit}>
    <input type="text" name="username" placeholder="username" value={this.state.user.username} onChange={this.handleChange} />
    <input type="password" name="password" value={this.state.user.password}placeholder="password" onChange={this.handleChange} />
    <input type="submit" />
    </Form>
    {this.state.showModal && <h1>{this.state.modalMessage}</h1>}
    </>
  )
}
}
export default RegisterLogin;
