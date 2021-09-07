import React from 'react'
import { Card } from '../components/Card'
import styled from 'styled-components'

const Lux = styled.div`
margin-left: 20px;
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 18px;
max-width: 40px;
display: flex;
justify-content: space-between;
`
const Flex = styled.div`
display: flex;
justify-content: space-between;
h4 {
    margin: 20px;
}
`


export const DubaiLuxury = () => {
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
