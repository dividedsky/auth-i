import React from 'react';
import styled from 'styled-components';
import {Route, NavLink} from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const LoginWrapper = styled.div`
  width: 40%;
  height: 400px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: #000;
  margin: 40px auto;
  color: #777;
`;

const LoginNav = styled.nav`
  width: 100%;
  height: 30px;
  background-color: rgba(200, 100, 50, .8);
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
    font-size: 20px;
    color: white;

  }

  .active {
    color: purple;
  }
`;

class LoginContainer extends React.Component {
  render() {
    return (
      <LoginWrapper>
        <LoginNav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </LoginNav>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register} />

      </LoginWrapper>
    );
  }
}

export default LoginContainer;
