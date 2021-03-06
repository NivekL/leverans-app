import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import LoginSignUp from './LoginSignUp';

function UserLogin({ isLoggedIn, setIsLoggedIn }) {
  return (
    <UserContainer>
      {isLoggedIn ? (
        <UserProfile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginSignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </UserContainer>
  );
}

export default UserLogin;

const UserContainer = styled.div`
  width: 80%;
  height: 13rem;
  border-left: 1px solid #c9c9c9;

  @media screen and (min-width: 768px) {
    width: 55%;
  }
  @media screen and (max-width: 420px) {
    width: 100%;
  }
`;
