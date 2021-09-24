import React from 'react'
import logo from '../logo.png'
import styled from 'styled-components'
import Burger from './Burger'
import { Link } from "react-router-dom";
import CartIcon from './CartIcon';
import WishListIcon from './WishListIcon';
import { DarkModeIcon } from './DarkModeIcon';



function NavBar({ theme, setTheme, setShowWhichPopup, isCartOpen, setIsCartOpen, triggerCartUpdate, setTriggerCartUpdate, isLoggedIn, setIsLoggedIn }) {
  const styles = {
    backgroundColor: theme ? "white" : "black",
    color: theme ? "black" : "white",
  }
  return (
        <Nav style={styles}>
            <Burger 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
            <LogoContainer>
                <Link to="/"><img src={logo} alt="Store logo"  /></Link>
            </LogoContainer>
            <LogoContainer>
                <DarkModeIcon
                   theme={theme} 
                   setTheme={setTheme} 
                 />
            </LogoContainer>
            <LogoContainer>
                <WishListIcon
                   setTriggerCartUpdate={setTriggerCartUpdate} 
                 />
            </LogoContainer>
            <LogoContainer>
              <CartIcon 
                setShowWhichPopup={setShowWhichPopup} 
                open={isCartOpen} 
                setOpen={setIsCartOpen} 
                triggerCartUpdate={triggerCartUpdate} 
              />
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

a img{
    width: 100px;
}

`