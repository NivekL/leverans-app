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
`

export const StMortizSport = () => {
    return (
        <div>
            <Lux>Time for Sport</Lux>
            <Card />
        </div>
    )
}
