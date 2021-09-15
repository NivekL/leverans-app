import React, { useState } from 'react';
import styled from 'styled-components';

export const SignUp = ({ toggleLogIn, setToggleLogIn }) => {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { user_name, password };

    setLoading(true);

    fetch('/api/registration', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormInputContainer>
          <InputCont>
            <input
              required
              type="text"
              name="user_name"
              id=""
              placeholder="användarnamn"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
          </InputCont>
          <InputCont>
            <input
              required
              type="password"
              name="password"
              id=""
              placeholder="lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputCont>
        </FormInputContainer>
        {!loading && <SignUpBtn>registrera</SignUpBtn>}
        {loading && <Success disabled>välkommen</Success>}
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
`;
