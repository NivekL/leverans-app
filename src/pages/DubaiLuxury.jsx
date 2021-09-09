import React from 'react'
import { Card } from '../components/Card'
import styled from 'styled-components'

const Lux = styled.div`
margin-top: 5rem;
font-style: normal;
font-weight: 400;
font-size: 4rem;
padding:  0 0 20px 40px;
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

function DubaiLuxury() {
    return (
        <Font>
            <Flex>
            <Lux>Dubai Luxury</Lux>
            </Flex>
            <CardContainer>
            <Card />
            </CardContainer>
        </Font>
    )
}


export default DubaiLuxury