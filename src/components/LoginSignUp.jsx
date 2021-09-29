import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import styled from 'styled-components';
import logo from '../logo.png';

function LoginSignUp({ isLoggedIn, setIsLoggedIn }) {
  const [toggleLogIn, setToggleLogIn] = useState(true);

  return (
    <UserContainer>
      <img src={logo} alt="brand logo" />
      {toggleLogIn ? (
        <div>
          <h3>logga in</h3>
          <Login toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      ) : (
        <div>
          <h3>registrera dig</h3>
          <SignUp toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn} />
        </div>
      )}
    </UserContainer>
  );
}

export default LoginSignUp;

// Styling

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-transform: uppercase;
    margin-left: 2rem;
  }

  img {
    display: none;
  }

  @media screen and (max-width: 420px) {
    display: flex;
    align-items: center;
    height: 100vh;

    img {
      display: block;
      width: 16rem;
      margin-bottom: 3rem;
      margin-top: 25%;
    }

    h3 {
      display: none;
    }
  }
`;
