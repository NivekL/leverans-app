import React from 'react'
import styled from 'styled-components'

function DownNav({ open }) {
    return (
        <>
        <Ul open={open}>
        <h3>ALLA KATEGORIER</h3>
            <li>London</li>
            <li>St. Moritz</li>
            <li>Dubai</li>
            <a href="#">Visa alla</a>
        </Ul>
        </>
    )
}

export default DownNav


// Styled
const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    background-color: #e6e6e6;
    color: #292929;
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    transform: ${({ open }) => open ? 'translatex(0)' : 'translateY(-140%)'};
    top: 4rem;
    left: 0;
    height: 33vh;
    width: 100%;
    padding-top: 2rem;
    padding-left: 1rem;
    transition: transform 0.3s ease-in-out;
 
    li {
        font-size: 1.5rem;
    padding: .5rem 0rem;
    
    

  }
    h3{
        margin-bottom: 1rem;
        font-size: .8rem;
        font-weight: 200;
        letter-spacing: 2px;
    }
    
    a{
        text-decoration: none;
        font-size: .9rem;
        margin-top: 1.5rem;
        color: #292929;
    }

`;