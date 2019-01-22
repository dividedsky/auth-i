import React from 'react';
import styled from 'styled-components';
import {Route, NavLink} from 'react-router-dom';

const LoginContainer = styled.div`
  width: 40%;
  height: 400px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: #000;
  margin: 0 auto;
  color: #777;
`;

class Login extends React.Component {
  render() {
    return (
      <LoginContainer>
        <Nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </Nav>
        <h3>login</h3>
      </LoginContainer>
    );
  }
}

export default Login;
