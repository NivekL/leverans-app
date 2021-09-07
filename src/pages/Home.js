import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const watchesImg = [
    {
        'id': 1,
        'image': 'London_Classic/2371_85dae26011-fast119-me021212-1.png',
        'cat': 'London',
        'name': 'Space Walker',
        'price': '2295.00'
    },
    {
        'id': 2,
        'image': 'London_Classic/3067_17f2e62f2f.png',
        'cat': 'London',
        'name': 'Smokey Nevil',
        'price': '2295.00'

    },
    {
        'id': 3,
        'image': 'London_Classic/3074_98030549cb-nes.png',
        'cat': 'London',
        'name': 'Night Nevil',
        'price': '2295.00'
    },

    {
        'id': 4,
        'image': 'London_Classic/3082_1f48525a62-fast.png',
        'cat': 'London',
        'name': 'Midnight Falken',
        'price': '1695.00'
    },
    {
        'id': 5,
        'image': 'Dubai_Luxury/grren-lyx.png',
        'cat': 'Dubai',
        'name': 'Chrono',
        'price': '9995.00'
    },
    {
        'id': 6,
        'image': 'Dubai_Luxury/lyx-emer.png',
        'cat': 'Dubai',
        'name': 'Emerald Nevil',
        'price': '7295.00'
    },
    {
        'id': 7,
        'image': 'Dubai_Luxury/lyx-brown.png',
        'cat': 'Dubai',
        'name': 'Blue Ray Falken',
        'price': '6425.00'
    },

    {
        'id': 8,
        'image': 'Dubai_Luxury/lyx-brownblue.png',
        'cat': 'Dubai',
        'name': 'Loch Falken',
        'price': '8295.00'
    },
    {
        'id': 9,
        'image': 'St_Moritz_Sport/black-w.png',
        'cat': 'Moritz',
        'name': 'Octopus',
        'price': '1395.00'
    },
    {
        'id': 10,
        'image': 'St_Moritz_Sport/blue-w.png',
        'cat': 'Moritz',
        'name': 'Deep Blue',
        'price': '1295.00'
    },
    {
        'id': 11,
        'image': 'St_Moritz_Sport/orange-w.png',
        'cat': 'Moritz',
        'name': 'Neemo',
        'price': '1295.00'
    },

    {
        'id': 12,
        'image': 'St_Moritz_Sport/ocean-plastic.png',
        'cat': 'Moritz',
        'name': 'Sand',
        'price': '1395.00'
    }
]

function Home() {

    const [watches, setWatches] = useState([]);

    useEffect(() => {
        setWatches(watchesImg);
    }, [])

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
                        {watchesImg.filter(obj => obj.cat === 'London').map((watch) => (
                            <div key={watch.id} className="card">
                                <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                <p>{watch.name}</p>
                                <p>{watch.price} SEK</p>
                            </div>
                        ))}
                    </Watchcon>
                </div>
                <div>
                    <h3>Dubai Luxury</h3>
                    <Watchcon>
                        {watchesImg.filter(obj => obj.cat === 'Dubai').map((watch) => (
                            <div key={watch.id} className="card">
                                <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                <p>{watch.name}</p>
                                <p>{watch.price} SEK</p>
                            </div>
                        ))}
                    </Watchcon>
                </div>
                <div>
                    <h3>St Moritz Sport</h3>
                    <Watchcon>
                        {watchesImg.filter(obj => obj.cat === 'Moritz').map((watch) => (
                            <div key={watch.id} className="card">
                                <img src={process.env.PUBLIC_URL + '/images/' + watch.image} alt="" />
                                <p>{watch.name}</p>
                                <p>{watch.price} SEK</p>
                            </div>
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
        margin: 10px 0 10px 10px;
        font-size: 22px;
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
        height: 180px;
        @media screen and (min-width: 1200px) {
            height: 360px;
        }   
    }
`

const Hero = styled.div`
    font-family: 'Libre Franklin', sans-serif;
    margin-top: 4rem;
    padding-top: 1rem;
    background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller-83DnGfaWV24-unsplash.jpg'}');
    height: 30.8vh;
    width: 100%;
    background-size: cover;
    

    h1,p{
        margin: 0;
        padding: 0;
    }

    div:first-of-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        

        p,h1{
            margin: 0 auto;
            text-align: center;
        }
   font-family: 'Libre Franklin', sans-serif;
`


export default Home
