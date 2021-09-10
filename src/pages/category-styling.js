import styled from "styled-components"

export const Lux = styled.div`
margin-top: 5rem;
font-style: normal;
font-weight: 400;
font-size: 2rem;
padding:  0 0 20px 20px;
@media screen and (max-width: 481px) {
          font-size: 24px;
         }   
`
export const Flex = styled.div`
display: flex;
`
export const CardContainer = styled.div`

display: flex;
flex-direction: row;
align-items: center;
`
export const Font = styled.div`
font-family: 'Libre Franklin', sans-serif;
`


export const Watchcon = styled.div`
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
    @media screen and (min-width: 768px) {
      height: 360px;
    }
    @media screen and (min-width: 1024px) {
      height: 480px;
    }
    height: 180px;
    @media screen and (min-width: 1200px) {
      height: 480px;
    }
    @media screen and (max-width: 481px) {
      height: auto;
      width: 100%;
    }
  }`