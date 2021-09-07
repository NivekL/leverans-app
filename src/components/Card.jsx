import React, { useState, useEffect } from "react";
import styled from "styled-components";

const White = styled.div`
  color: black;
  text-align: center;
`;
const Font12 = styled.div`
  font-size: 12px;
`;
const Price = styled.div`
  font-size: 14px;
  font-style: oblique;
`;

export const Card = () => {
  const [data] = useState([
    {
      id: 1,
      name: "Audemars Piguet",
      description: "Rooyal Oak Concept",
      price: "1395",
      category: "Dubai",
      image: "Dubai_Luxury/Audemars_Piguet-Royal_Oak_Concept.jpg",
    },
    {
      id: 2,
      name: "Patek Philippe",
      description: "Lorem ipsum dont sit",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/patek_philippe_5396R_015_1.jpeg",
    },
    {
      id: 3,
      name: "Jaeger Lecoultre",
      description: "Lorem ipsum dolor sit amet.",
      price: "2000",
      category: "Dubai",
      image: "Dubai_Luxury/jaeger-lecoultre-4122520.jpeg",
    },
    {
      id: 4,
      name: "Omega",
      description: "Lorem ipsum dolor sit amet.",
      price: "5959",
      category: "Dubai",
      image: "Dubai_Luxury/omega-de-ville-tresor-43553402109001-l.jpg",
    },
    {
      id: 5,
      name: "Richard Mille",
      description: "Lorem ipsum dolor sit amet.",
      price: "5350",
      category: "Dubai",
      image: "Dubai_Luxury/richard_mille_RM_74-02.jpg",
    },
    {
      id: 6,
      name: "Parmigiani",
      description: "Lorem ipsum dolor sit amet.",
      price: "8928",
      category: "Dubai",
      image: "Dubai_Luxury/Parmigiani-PFC128-1001400-HA1441.jpg",
    },
  ]);

  useEffect(() => {
    // fetchData();
    //Fetcha alla klockor från db, mappa genom, skriv ut.
  }, []);

  return (
    <div>
      {data.map((i) => (
        <White key={i.id}>
          <img
            src={process.env.PUBLIC_URL + "/images/" + i.image}
            alt={i.name}
            height="250px"
            width="250px"
          />
          <Font12>
            <div>
              <strong>{i.name}</strong>
            </div>
            <div>{i.description}</div>
          </Font12>
          <Price>
            <span>{i.price}</span>
          </Price>
        </White>
      ))}
    </div>
  );
};
