import React from "react";
import testImg from "../images/Dubai_Luxury/Audemars_Piguet-Royal_Oak_Concept.jpg";
import styled from "styled-components";

const White = styled.div`
  color: black;
`
const Font12 = styled.div`
font-size: 12px;
`
const Price = styled.div`
font-size: 14px;
font-style: oblique;
`



export const Card = () => {
  return (
    <White>
      <img
        style={{ maxWidth: "100%" }}
        src={testImg}
        alt="Audemar Piguet watch"
        height="300px"
      />
      <Font12>
        <div>
          <strong>SUB Ocean Plastic - Deep Blue</strong>
        </div>
        <div>Ocean Deep Blue</div>
      </Font12>
      <Price>
        <span>1395.00 SEK</span>
      </Price>
      
      
    </White>
  );
};