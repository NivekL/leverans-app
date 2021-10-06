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
    backgroundColor: theme ? "white" : "#202124",
    color: theme ? "black" : "white",
    borderBottom: theme ? "2px solid white" : "2px solid black"
  }
  const isElectron = navigator.userAgent.includes('Electron');
  
  return (
        <Nav style={styles}>
            <FlexChildIconsContainer>
              <Burger
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              />
            </FlexChildIconsContainer>
            <LogoContainer className="store-logo-navbar">
                <Link to="/"><img src={logo} alt="Store logo"  /></Link>
            </LogoContainer>
            <FlexChildIconsContainer>
              <NavBarContentRight>
                <IconContainer>
                    <DarkModeIcon
                       theme={theme}
                       setTheme={setTheme}
                     />
                </IconContainer>
                {isElectron ?
                <IconContainer>
                <WishListIcon
                    setTriggerCartUpdate={setTriggerCartUpdate}
                    />
                </IconContainer>
                : null
                }
                <IconContainer>
                  <CartIcon
                    setShowWhichPopup={setShowWhichPopup}
                    open={isCartOpen}
                    setOpen={setIsCartOpen}
                    triggerCartUpdate={triggerCartUpdate}
                  />
                </IconContainer>
              </NavBarContentRight>
            </FlexChildIconsContainer>
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
  align-items: center;
  background-color: #ffffff;
`

const FlexChildIconsContainer = styled.div`
  width: 100%;
`
const NavBarContentRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const LogoContainer =  styled.div`
a img{
  width: 100px;;
}
`
const IconContainer =  styled.div``