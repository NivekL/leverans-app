import React, { useState } from 'react';
import styled from 'styled-components';

function Login({ toggleLogIn, setToggleLogIn, isLoggedIn, setIsLoggedIn }) {
  return (
    <FormContainer>
      <Form>
        <FormInputContainer>
          <InputCont>
            <input type="text" name="username" id="" placeholder="användarnamn" />
          </InputCont>
          <InputCont>
            <input type="password" name="password" id="" placeholder="lösenord" />
          </InputCont>
        </FormInputContainer>
      </Form>

      <RegisterContainer>
        <div>
          <p>Inte medlem?</p>
          <a href="#" onClick={() => setToggleLogIn(!toggleLogIn)}>
            Registrera
          </a>
        </div>
        <LoginButton type="submit" onClick={() => setIsLoggedIn(!isLoggedIn)}>
          logga in
        </LoginButton>
      </RegisterContainer>
    </FormContainer>
  );
}

export default Login;

// Styleing -----------------------------------

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  max-width: 19rem;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;

  input {
    padding: 5px;
    border: 1px solid #000;
    margin-right: 7px;
  }
`;

const FormInputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputCont = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
  height: 45px;
  width: 150px;
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
`;
