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
    font-family: "Libre Franklin", sans-serif;
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
      height: 500px;
    }
    @media screen and (max-width: 481px) {
      height: 500px;
    }
  }
`;

export const Card = () => {
  const [data] = useState([
    {
      id: 1,
      name: "Audemars Piguet",
      description: "Rooyal Oak Concept",
      price: "1395",
      category: "Dubai",
      image: "Dubai_Luxury/grren-lyx.png",
      zoom: "Dubai_Luxury/zoom/grren-lyx-zoom.webp",
    },
    {
      id: 2,
      name: "Peace",
      description: "Lorem ipsum dolor sit amet.",
      price: "2495",
      category: "Dubai",
      image: "Dubai_Luxury/peace.webp",
      zoom: "Dubai_Luxury/zoom/peace-zoom.webp",
    },
    {
      id: 3,
      name: "Patek Philippe",
      description: "Lorem ipsum dont sit",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-emer.png",
      zoom: "Dubai_Luxury/zoom/lyx-emer-zoom.webp",
    },
    {
      id: 4,
      name: "Jaeger Lecoultre",
      description: "Lorem ipsum dolor sit amet.",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-brown.png",
      zoom: "Dubai_Luxury/zoom/falken-zoom.webp",
    },
    {
      id: 5,
      name: "Omega",
      description: "Lorem ipsum dolor sit amet.",
      price: "5959",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-emer.png",
      zoom: "Dubai_Luxury/zoom/lyx-emer-zoom.webp",
    },
    {
      id: 6,
      name: "Richard Mille",
      description: "Lorem ipsum dolor sit amet.",
      price: "5350",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-brownblue.png",
      zoom: "Dubai_Luxury/zoom/falken2-zoom.webp",
    },
    {
      id: 7,
      name: "Parmigiani",
      description: "Lorem ipsum dolor sit amet.",
      price: "8928",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-grey.png",
      zoom: "Dubai_Luxury/zoom/humanium-zoom.webp"
    },
    {
      id: 8,
      name: "Peace",
      description: "Lorem ipsum dolor sit amet.",
      price: "2495",
      category: "Dubai",
      image: "Dubai_Luxury/peace.webp",
      zoom: "Dubai_Luxury/zoom/peace-zoom.webp"
    },
    {
      id: 9,
      name: "Patek Philippe",
      description: "Lorem ipsum dont sit",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/lyx-emer.png",
      zoom: "Dubai_Luxury/zoom/lyx-emer-zoom.webp"
    },
  ]);

  useEffect(() => {
    // fetchData();
    //Fetcha alla klockor från db, mappa genom, skriv ut.
  }, []);

  return (
    <Watchcon>
      {data.map((i) => (
        <div onClick={(e) => console.log(e)} key={i.id} className="card">
          <img
            src={process.env.PUBLIC_URL + "/images/" + i.image}
            alt={i.name}
            onMouseOver={(e) =>
              (e.currentTarget.src =
                process.env.PUBLIC_URL + "/images/" + i.zoom)
            }
            onMouseOut={(e) =>
              (e.currentTarget.src =
                process.env.PUBLIC_URL + "/images/" + i.image)
            }
          />
          <p>{i.name}</p>
          <p>{i.price} SEK</p>
        </div>
      ))}
    </Watchcon>
  );
};
