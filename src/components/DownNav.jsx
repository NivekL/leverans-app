import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";




function DownNav({ open, setOpen }) {


    return ( 
        <Ul open={open}>
        <h3>ALLA KATEGORIER</h3>
            <li><MenuLink to="/LondonClassic" onClick={() => setOpen(!open)}> London - Classic</MenuLink></li>
            <li><MenuLink to="/StMoritzSport" onClick={() => setOpen(!open)}>St. Moritz - Sport</MenuLink> </li>
            <li><MenuLink to="/DubaiLuxury" onClick={() => setOpen(!open)}>Dubai - Luxury</MenuLink></li>
            <Link to="/" className="showAllLink" onClick={() => setOpen(!open)}>Visa alla</Link>
        </Ul>
    )
}

export default DownNav


// Styled ----------------------------------------------------------------------
const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    background-color: whitesmoke;
    color: #292929;
    position: fixed;
    font-family: 'Libre Franklin', sans-serif;
    transform: ${({ open }) => open ? 'translatex(0)' : 'translateY(-140%)'};
    top: 4rem;
    left: 0;
    height: 35vh;
    width: 100%;
    padding-top: 2rem;
    padding-left: 1rem;
    transition: transform 0.3s ease-in-out;
 
    li { 
        padding-bottom: 1rem;
    }

    h3{
        margin-bottom: 1.5rem;
        font-size: .8rem;
        font-weight: 200;
        letter-spacing: 2px;
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

    const MenuLink = styled(Link)`
        text-decoration: none;
        font-size: 1.5rem;
        color: #292929;

        &:hover{
            border-bottom: 3px solid #292929;
        }
`

