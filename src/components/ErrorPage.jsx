import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

export const ErrorPage = () => {
    return (
        <div>
        <Hero>
        </Hero>
            <Heading>Looks like you've reached a URL that doesn't exist.</Heading>
            <BackLink to="/">Back home..</BackLink>
        </div>
    )
}

const Hero = styled.div`
    filter: brightness(25%);
    font-family: 'Libre Franklin', sans-serif;
    margin-top: 4rem;
    padding-top: 1rem;
    background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller_mobile_.jpg'}');
    height: 60vh;
    width: 100%;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 2rem;
    `

    const Heading = styled.div`
            color: black; 
            margin: 0 auto;
            text-align: center;
            padding: 0;
            `

const BackLink = styled(Link)`
margin-top: 30px;
color: #292929;
font-family: 'Libre Franklin', sans-serif;
font-size: 2rem;
display: block;
text-align: center;
`