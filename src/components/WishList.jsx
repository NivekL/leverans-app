import React from 'react'
import styled from 'styled-components'
import { Close, DeleteOutlineSharp } from '@material-ui/icons';


function WishList({ open, setOpen }) {
    return (
        <ReturnDiv open={open}>
             <TopBar>
                <DivLR>
                    <p>wishlist</p>
                    <Close  onClick={() => setOpen(!open)} style={{cursor: "pointer"}}/>
                </DivLR>
            </TopBar>
        </ReturnDiv>
    )
}

export default WishList


//Style ----------------------------
const ReturnDiv = styled.div`
        position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background-color: whitesmoke;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 14px;
    --padding: 20px;
    height: 100vh;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
`
const TopBar = styled.div`
    padding: var(--padding);
    min-width: 500px;
`

const DivLR = styled.div`
    display: flex;
    justify-content: space-between;
`