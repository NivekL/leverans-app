import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Login from '../pages/Login'




function DownNav({ open, setOpen }) {


    return ( 
        <MenuWrapper open={open}>
            <Ul >
            <h3>ALLA KATEGORIER</h3>
                <li><MenuLink to="/LondonClassic" onClick={() => setOpen(!open)}> London - Classic</MenuLink></li>
                <li><MenuLink to="/StMoritzSport" onClick={() => setOpen(!open)}>St. Moritz - Sport</MenuLink> </li>
                <li><MenuLink to="/DubaiLuxury" onClick={() => setOpen(!open)}>Dubai - Luxury</MenuLink></li>
                <Link to="/" className="showAllLink" onClick={() => setOpen(!open)}>Visa alla</Link>
            </Ul>
            <UserContainer>
            <h3>ANVÄNDARSIDA</h3>    
            <Login />
            </UserContainer>
        </MenuWrapper>
    )
}

export default DownNav


// Styled ----------------------------------------------------------------------
const MenuWrapper = styled.div`
display: flex;
justify-content: space-between;
position: absolute;
top: 4rem;
left: 0;
height: 17.4rem;
width: 100%;
padding-top: 2rem;
padding-left: 1rem;
background-color: whitesmoke;
color: #292929;
font-family: 'Libre Franklin', sans-serif;
transform: ${({ open }) => open ? 'translatex(0)' : 'translateY(-140%)'};
transition: transform 0.3s ease-in-out;

    h3{
    margin-bottom: 1.2rem;
    font-size: .8rem;
    font-weight: 200;
    letter-spacing: 2px;
    }
`

const MenuLink = styled(Link)`
text-decoration: none;
font-size: 1.5rem;
color: #292929;


&:hover{
    border-bottom: 3px solid #292929;
}
`


const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    

  
    li { 
        padding-bottom: 1rem;
    }
    
    .showAllLink{
        text-decoration: none;
        font-size: .8rem;
        margin-top: 1.4rem;
        color: #292929;
        letter-spacing: 1px;
        width: 3.7rem;
        line-height: -20px;

        &:hover{
        border-bottom: 2px solid #292929;
        }
}
`

const UserContainer = styled.div`
   width: 55%;
   border-left: 1px solid white;

@media screen and (max-width: 768px) {
        display: none;
        } 


h3{
    margin-left: 2rem;
}
`

