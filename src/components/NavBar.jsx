import React from 'react'
import logo from '../logo.png'
import styled from 'styled-components'
import Burger from './Burger'

function NavBar() {
    return (
        <Nav>
            <Burger/>
        <LogoContainer>
            <a href="/"><img src={logo} alt="Store logo"  /></a>
          
          </LogoContainer>
       
      </Nav>
    )
}

export default NavBar


// Styled ----------------------------------------------------------------------

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
  width: 100%;
  height: 4rem;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`

const LogoContainer =  styled.div`
display: flex;
justify-content: center;
align-items: center;

img{
    width: 100px;

}

`