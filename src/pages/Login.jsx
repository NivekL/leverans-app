import React from 'react'
import styled from 'styled-components'

function Login() {
    return (
        <div>
            <FormContainer>
                <Form>
                    <FormInputContainer>
                        <label htmlFor="username">Användarnamn</label>
                        <input type="text" name="username" id="" placeholder="Username"/>
                    </FormInputContainer>
                    <FormInputContainer>
                        <label htmlFor="password">Lösenord</label>
                        <input type="password" name="password" id="" placeholder="Password"/>
                    </FormInputContainer>

                    <LoginButton type="submit">Logga in</LoginButton>
                </Form>

                <RegisterContainer>
                    <p>Eller registrera dig</p>

                    <RegisterButton type="submit">Registrera</RegisterButton>
                </RegisterContainer>
            </FormContainer>
        </div>
    )
}

export default Login

const FormContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Form = styled.form `
    label, input {
        display: block;
        font-family: 'Montserrat', sans-serif;
    }

    input {
        padding: 5px;
        border-radius: 0;
        border: 1px solid #000;
    }
`

const FormInputContainer = styled.div `
    margin: 30px 0;
`

const LoginButton = styled.button `
    height: 45px;
    width: 130px;
    font-family: 'Libre Franklin', sans-serif;
    border: none;
    text-align: center;
    text-decoration: none;
    background-color: #000;
    color: #fff;
    font-weight: 400;
    margin: 10px auto;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    position: relative;
`

const RegisterContainer = styled.div `
    margin-top: 20px;
    padding-top: 10px;
    width: 300px;
    border-top: solid 1px #7b7b7b;

    p {
        color: #121212;
        font-family: 'Montserrat'; 
        sans-serif; text-align: center;
    }
`

const RegisterButton = styled(LoginButton)``