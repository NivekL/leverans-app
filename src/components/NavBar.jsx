import React from 'react'
import logo from '../logo.png'
import styled from 'styled-components'
import Burger from './Burger'

function NavBar() {
    return (
        <Nav>
            <Burger/>
        <LogoContainer>
          <img src={logo} alt="Store logo"  />
          </LogoContainer>
       
      </Nav>
    )
}

export default NavBar


// Styled

const Nav = styled.nav`
  width: 100%;
  height: 4rem;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: center;
`

const LogoContainer =  styled.div`
display: flex;
justify-content: center;
align-items: center;

img{
    width: 100px;

}

`