import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';

export const SignUp = ({ toggleLogIn, setToggleLogIn }) => {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const theme = useContext(ThemeContext);
  const styles = {
    backgroundColor: theme ? 'white' : '#202124',
    color: theme ? 'black' : 'white',
  };
  const para = {
    color: theme ? 'black' : 'white',
  };

  function handleResponse(response) {
    return response.json().then((json) => {
      if (!response.ok) {
        const error = Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
        });
        return Promise.reject(error);
      }
      return json;
    });
  }

  function Success() {
    setErrorMessage('Användare skapad.');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { user_name, password };

    fetch('/api/registration/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(handleResponse)
      .then(Success)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <FormContainer style={styles}>
      <Form onSubmit={handleSubmit}>
        <FormInputContainer>
          <InputCont>
            <input
              required
              type="text"
              name="user_name"
              placeholder="användarnamn"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              pattern="[a-zAåäö-Z0-9]+"
              minLength="5"
              maxLength="15"
            />
          </InputCont>
          <InputCont>
            <input
              required
              type="password"
              name="password"
              placeholder="lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="[a-zAåäö-Z0-9]+"
              minlength="5"
              maxLength="15"
            />
          </InputCont>
        </FormInputContainer>
        {<SignUpBtn style={para}>registrera</SignUpBtn>}
        {errorMessage}
      </Form>

      <RegisterContainer>
        <div>
          <p>Redan medlem?</p>
          <a href="#" onClick={() => setToggleLogIn(!toggleLogIn)}>
            Logga in
          </a>
        </div>
      </RegisterContainer>
    </FormContainer>
  );
};

export default SignUp;

// Styleing -----------------------------------

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  max-width: 19rem;

  @media screen and (max-width: 450px) {
    margin-left: 0;
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    padding: 5px;
    border: 1px solid #000;
    margin-right: 7px;
  }
`;

const FormInputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const InputCont = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    margin-bottom: 3px;
    width: 9.5rem;
  }
  @media screen and (max-width: 420px) {
    margin-bottom: 3px;
    width: 15rem;
  }
`;

const SignUpBtn = styled.button`
  height: 45px;
  width: 146px;
  font-family: 'Libre Franklin', sans-serif;
  border: 2px solid #292929;
  text-align: center;
  background-color: transparent;
  color: #292929;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: #292929;
    color: whitesmoke;
  }

  @media screen and (max-width: 420px) {
    width: 14.6rem;
  }
`;
const Success = styled.button`
  height: 45px;
  width: 150px;
  font-family: 'Libre Franklin', sans-serif;
  border: 2px solid #292929;
  text-align: center;
  background-color: transparent;
  color: green;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 0.8rem;
    margin-right: 6px;
  }

  a {
    font-size: 0.8rem;
    color: #4e5da3;
    font-family: 'Montserrat';
    text-decoration: none;
    letter-spacing: 1px;
    margin-bottom: 13px;

    &:hover {
      border-bottom: 1px solid #4e5da3;
    }
  }
  div {
    display: flex;
  }

  @media screen and (max-width: 600px) {
    p,
    a {
      font-size: 0.6rem;
    }
  }
`;
