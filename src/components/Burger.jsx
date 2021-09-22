import React, { useState } from 'react'
import DownNav from './DownNav'
import styled from 'styled-components'

function Burger({isLoggedIn, setIsLoggedIn}) {
  
const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <StyledBurger open={open} onClick={() => setOpen(!open)} style={{cursor: "pointer"}}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
            <DownNav 
            open={open} setOpen={setOpen} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
        </React.Fragment>
    )
}

export default Burger


// Style ----------------------------------------------------------------------
const StyledBurger = styled.div`
  width: 1.2rem;
  height: 1.5rem;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;

  
  
  div {
    width: 1.5rem;
    height: 0.20rem;
    background-color: ${({ open }) => open ? '#afafaf' : '#504f4f'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }


`;