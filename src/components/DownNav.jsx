import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'




function DownNav({ open, setOpen }) {

    const [toggleLogIn, setToggleLogIn] = useState(false)


    return ( 
        <MenuWrapper open={open}>
            <Ul >
            <h3>Kategorier</h3>
                <li><MenuLink to="/LondonClassic" onClick={() => setOpen(!open)}>Classic</MenuLink></li>
                <li><MenuLink to="/StMoritzSport" onClick={() => setOpen(!open)}>Sport</MenuLink> </li>
                <li><MenuLink to="/DubaiLuxury" onClick={() => setOpen(!open)}>Luxury</MenuLink></li>
                <Link to="/" className="showAllLink" onClick={() => setOpen(!open)}>visa alla </Link>
            </Ul>
            <UserContainer>
                {toggleLogIn ?  
            <div>   
                <h3>hej, logga in</h3>    
                <Login toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn}/>
            </div>
                :
            <div>
                <h3>hej, registrera dig</h3> 
                <SignUp toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn}/>
            </div> 
            }
           
            
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
    text-transform: uppercase;
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
        width: 5rem;
        line-height: -20px;
        text-transform: uppercase;

        &:hover{
        border-bottom: 2px solid #292929;
        }
}
`

const UserContainer = styled.div`
   width: 55%;
   height: 13rem;
   border-left: 1px solid #c9c9c9;

@media screen and (max-width: 768px) {
        display: none;
    } 


h3{
    margin-left: 2rem;
}
`

