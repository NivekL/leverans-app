import React, { useContext} from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';


function UserProfile({ isLoggedIn, setIsLoggedIn }) {
  const {userName, setUserCartId} = useContext(UserContext);

  
  return (
    <>
      <UserContainer>
      <h3>Hej, {userName}</h3>
        <LogOutButton onClick={() => {
          setIsLoggedIn(!isLoggedIn);
          setUserCartId(0);
          if (localStorage.getItem('loggedInUserId')) {
            localStorage.removeItem('loggedInUserId');
          }
        }}>Logga ut</LogOutButton>
      </UserContainer>
    </>
  );
}

export default UserProfile;

// Styling

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  max-width: 19rem;

  h3 {
    margin-left: 0px;
  }
  h4 {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

const LogOutButton = styled.button`
  height: 45px;
  width: 150px;
  margin-top: 2rem;
  font-family: 'Libre Franklin', sans-serif;
  border: 2px solid #292929;
  text-align: center;
  background-color: transparent;
  color: #292929;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: #292929;
    color: whitesmoke;
  }
`;
