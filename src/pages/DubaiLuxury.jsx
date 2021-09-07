import React from 'react'
import { Card } from '../components/Card'
import styled from 'styled-components'

const Lux = styled.div`
margin-top: 5rem;
font-style: normal;
font-weight: 400;
font-size: 4rem;
`
const Flex = styled.div`

display: flex;
justify-content: space-between;
h4 {
    margin: 20px;
}
`

function DubaiLuxury() {
    return (
        <div>
            <Flex>
            <Lux>Time for Luxury</Lux>
            <h4>Sort</h4>
            </Flex>
            <Card />
        </div>
    )
}


export default DubaiLuxury