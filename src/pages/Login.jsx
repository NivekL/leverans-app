import React from 'react'
import styled from 'styled-components'

function Login() {
    return (
            <FormContainer>
                <Form>
                    <FormInputContainer>
                        <InputCont>
                        <label htmlFor="username">Användarnamn</label>
                        <input type="text" name="username" id="" placeholder="Username"/>
                        </InputCont>
                        <InputCont>
                        <label htmlFor="password">Lösenord</label>
                        <input type="password" name="password" id="" placeholder="Password"/>
                        </InputCont>
                    </FormInputContainer>
                </Form>

                <RegisterContainer>
                    <a href="#">Registrera dig här</a>
                    <LoginButton type="submit">Logga in</LoginButton>
                </RegisterContainer>

            </FormContainer>
    )
}

export default Login



// Styleing -----------------------------------

const FormContainer = styled.div `
    display: flex; 
    flex-direction: column;
    margin-left: 2rem;
    max-width: 19rem;
    
`

const Form = styled.form `
    position: relative;
    display: flex; 
    flex-direction: row;

   label {
       margin-bottom: 5px;
   }

    input {
        padding: 5px;
        border: 1px solid #000;
        margin-right: 7px;
        
    }
`

const FormInputContainer = styled.div `
    display: flex;
    margin-bottom: 10px;


`

const InputCont = styled.div`
display: flex;
flex-direction: column;
`

const LoginButton = styled.button `
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

    &:hover{
        background-color: #292929;
        color: whitesmoke;
    }
`

const RegisterContainer = styled.div `
    display: flex;
    flex-direction: column;

    a {
        font-size: 14px;
        color: #121212;
        font-family: 'Montserrat'; 
        text-decoration: none;
        letter-spacing: 1px;
        margin-bottom: 13px;

        &:hover{
        border-bottom: 1px solid #121212;
        width: 150px;
    }
    }
   
`

const RegisterButton = styled(LoginButton)``