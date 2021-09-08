import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";

function Home() {

    const [watches, setWatches] = useState([]);

    useEffect(() => {
        fetchWatches();
    }, [])

    const fetchWatches = async () => {
        try {
            const response = await fetch('/api/watches/');
            if (!response.ok) {
                throw new Error('HTTP Error! status: ' + response.status);
            }
            const data = await response.json();
            console.log(data);
            setWatches(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PageCon>
            <Hero>
                <div>
                    <p>Best Watches</p>
                    <h1>Nice Watch</h1>
                </div>
            </Hero>
            <div>
                <div>
                    <h3>London Classic</h3>
                    <Watchcon>
                        {watches.filter(obj => obj.category === 'London').map((watch) => (
                            <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                                <div key={watch.id} className="card">
                                    <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                    <p>{watch.name}</p>
                                    <p>{watch.price} SEK</p>
                                </div>
                            </StyledLink>
                        ))}
                    </Watchcon>
                </div>
                <Hero1>
                
                </Hero1>
                <div>
                    <h3>Dubai Luxury</h3>
                    <Watchcon>
                        {watches.filter(obj => obj.category === 'Dubai').map((watch) => (
                            <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                                <div key={watch.id} className="card">
                                    <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                    <p>{watch.name}</p>
                                    <p>{watch.price} SEK</p>
                                </div>
                            </StyledLink>
                        ))}
                    </Watchcon>
                </div>
                <Ocean>
                   
                </Ocean>
                <div>
                    <h3>St Moritz Sport</h3>
                    <Watchcon>
                        {watches.filter(obj => obj.category === 'Moritz').map((watch) => (
                            <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                                <div key={watch.id} className="card">
                                    <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                    <p>{watch.name}</p>
                                    <p>{watch.price} SEK</p>
                                </div>
                            </StyledLink>
                        ))}
                    </Watchcon>
                </div>
            </div>
        </PageCon>
    )
}

const PageCon = styled.div`
    font-family: 'Libre Franklin', sans-serif;
    h3 {
        margin: 30px 10px 10px 10px;
        font-size: 22px;
        @media screen and (min-width: 1024px) {
            margin-left: 18px;
        }
    }
`

const Watchcon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        background-color: whitesmoke;
        margin-bottom: 5px;
        padding-bottom: 10px;
        font-family: 'Libre Franklin', sans-serif;
    }
    div:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    p:last-of-type {
        font-size: 12px;
        padding-top: 5px;
        font-weight: bold;
    }

    img {
        height: 180px;
        @media screen and (min-width: 1024px) {
            height: 500px;
        } 
        @media screen and (min-width: 1200px) {
            height: 360px;
        }   
    }
`

const StyledLink = styled(Link) `
    text-decoration: none;
    color: #000;
`

const Hero = styled.div`
    font-family: 'Libre Franklin', sans-serif;
    margin-top: 4rem;
    padding-top: 1rem;
    background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller-83DnGfaWV24-unsplash.jpg'}');
    height: 30.8vh;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;

    p {
        color: #504f4f; 
    }
    h1 {
        color: #504f4f;
    }
    
    @media screen and (min-width: 1200px) {
        height: 100vh;

        div:first-of-type{
            width: 40%;
            position: relative;
            top: 40%;
            left: 5%;

            p{
                font-size: 20px;
            }

            h1{
                font-size: 80px;
            }
        }
    }  
    
    h1,p{
        margin: 0;
        padding: 0;
    }
    
    div:first-of-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
        
        p,h1{
            margin: 0 auto;
            text-align: center;
        }

   font-family: 'Libre Franklin', sans-serif;
`
const Hero1 = styled.div`
    margin-top: 2rem;
    padding-top: 1rem;
    background-image: url('${process.env.PUBLIC_URL + '/images/triwa-melted-guns-watch-02.jpg'}');
    height: 30.8vh;
    width: 100%;
    background-size: cover;

    @media screen and (min-width: 768px) {
        height: 40vh;
    }
    @media screen and (min-width: 1200px) {
        height: 100vh;
    }
    @media screen and (min-width: 1900px) {
        height: 100vh;
    }
`

const Ocean = styled.div`
    margin-top: 2rem;
    padding-top: 1rem;
    background-image: url('${process.env.PUBLIC_URL + '/images/dive.jfif'}');
    height: 30.8vh;
    width: 100%;
    background-size: cover;
    @media screen and (min-width: 768px) {
        height: 40vh;
    }
    @media screen and (min-width: 1200px) {
        height: 100vh;
    }
    @media screen and (min-width: 1900px) {
        height: 100vh;
    }
`

export default Home
