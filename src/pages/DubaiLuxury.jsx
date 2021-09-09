import React from 'react'
import { Card } from '../components/Card'
import styled from 'styled-components'
import useFetch from '../components/useFetch';

const DubaiLuxury = () => {
  const { data: cards, loading, error } = useFetch('/api/watches/luxury');
    return (
      <Font>
            <Flex>
            <Lux>Time for Luxury</Lux>
            </Flex>
            <CardContainer>
        <Watchcon>
          { error && <div> {error} </div> }
          { loading && <div>Loading...</div> }
          {cards && <Card cards={cards} />}
      </Watchcon>
      </CardContainer>
        </Font>
    )
}

export default DubaiLuxury


// STYLING

const Lux = styled.div`
margin-top: 5rem;
font-style: normal;
font-weight: 400;
font-size: 4rem;
@media screen and (max-width: 481px) {
          font-size: 24px;
         }   
`
const Flex = styled.div`

display: flex;
`
const CardContainer = styled.div`

display: flex;
flex-direction: row;
align-items: center;
`
const Font = styled.div`
font-family: 'Libre Franklin', sans-serif;
`

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
    margin-bottom: 5px;
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
    height: 180px;
    @media screen and (min-width: 1200px) {
      height: 500px;
    }
    @media screen and (max-width: 481px) {
      height: auto;
      width: 100%;
    }
  }`