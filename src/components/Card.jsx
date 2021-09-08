import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
        @media screen and (max-width: 481px) {
          height: 500px;
         }    
    }
`

export const Card = () => {
  const [data] = useState([
    {
      id: 1,
      name: "Audemars Piguet",
      description: "Rooyal Oak Concept",
      price: "1395",
      category: "Dubai",
      image: "Dubai_Luxury/grren-lyx.png",
      zoom: "Dubai_Luxury/grren-lyx-zoom.webp"
    },
    {
      id: 2,
      name: "Patek Philippe",
      description: "Lorem ipsum dont sit",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-emer.png",
    },
    {
      id: 3,
      name: "Jaeger Lecoultre",
      description: "Lorem ipsum dolor sit amet.",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-brown.png",
    },
    {
      id: 4,
      name: "Omega",
      description: "Lorem ipsum dolor sit amet.",
      price: "5959",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-emer.png",
    },
    {
      id: 5,
      name: "Richard Mille",
      description: "Lorem ipsum dolor sit amet.",
      price: "5350",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-brownblue.png",
    },
    {
      id: 6,
      name: "Parmigiani",
      description: "Lorem ipsum dolor sit amet.",
      price: "8928",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-grey.png",
    },
  ]);

  useEffect(() => {
    // fetchData();
    //Fetcha alla klockor från db, mappa genom, skriv ut.
  }, []);

  return (
                  <Watchcon>
                        {data.map((i) => (
                            <div onClick={e => console.log(e)}key={i.id} className="card">
                                <img src={process.env.PUBLIC_URL + '/images/' + i.image} alt={i.name} />
                                {/* onMouseOver={e => e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + i.zoom} */}
                                <p>{i.name}</p>
                                <p>{i.price} SEK</p>
                            </div>
                        ))}
                    </Watchcon>
  );
};
