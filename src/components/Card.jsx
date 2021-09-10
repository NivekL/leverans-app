import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
import { Watchcon } from '../pages/category-styling';


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
