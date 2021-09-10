import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";


export const Card = ({ cards }) => {
 
    return (
      <Watchcon>
        {cards.map((i) => (
          <Link to={`/${i.category}/${i.id}/${i.name}`} key={i.id} className="card">
            <img 
              src={process.env.PUBLIC_URL + "/images/" + i.image}
              alt={i.name}
              onMouseEnter={(e) =>
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
          </Link>
        ))}
      </Watchcon>
    );
  }

  
// STYLING
const Watchcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: whitesmoke;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-family: "Libre Franklin", sans-serif;
    cursor: pointer;
    text-decoration: none;
    color: #000;
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
      height: 480px;
    }
    @media screen and (max-width: 481px) {
      height: auto;
      width: 100%;
    }
  }`
