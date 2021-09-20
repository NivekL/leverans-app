import React, { useState } from 'react';
import styled from 'styled-components';
export const Login = ({ toggleLogIn, setToggleLogIn, isLoggedIn, setIsLoggedIn }) => {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");

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
    console.log("Success.")
  }

const handleSubmit = (e) => {
  e.preventDefault();
  const user = { user_name, password };
  

fetch("/api/registration", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(handleResponse)
      .then(Success)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormInputContainer>
          <InputCont>
            <input type="text" name="username" value={user_name}  onChange={(e) => setUser_name(e.target.value)} />
          </InputCont>
          <InputCont>
            <input type="password" name="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
          </InputCont>
        </FormInputContainer>
        <LoginButton type="submit">
          logga in
        </LoginButton>
      </Form>

      <RegisterContainer>
        <div>
          <p>Inte medlem?</p>
          <a href="#" onClick={() => setToggleLogIn(!toggleLogIn)}>
            Registrera
          </a>
        </div>
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
`;

const InputCont = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
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
