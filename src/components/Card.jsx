import React from "react";
import testImg from "../images/Dubai_Luxury/Audemars_Piguet-Royal_Oak_Concept.jpg";

export const Card = () => {
  return (
    <div style={{ color: "#000000"}}>
      <img
        style={{ maxWidth: "100%" }}
        src={testImg}
        alt="Audemar Piguet watch"
        height="300px"
      />
      <div>
        <div>
          <strong style={{fontSize: '12px'}}>SUB Ocean Plastic - Deep Blue</strong>
        </div>
        <div style={{fontSize: '12px'}}>Ocean Deep Blue</div>
      </div>
      <div>
        <span style={{fontSize: '14px', fontStyle: 'oblique'}}>1395.00 SEK</span>
      </div>
    </div>
  );
};
