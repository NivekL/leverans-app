import React from 'react'
import { Card } from '../components/Card'
import useFetch from '../components/useFetch';
import { Lux, Flex, CardContainer, Watchcon, Font } from './category-styling';

const StMoritzSport = () => {
  const { data: cards, loading, error } = useFetch('/api/watches/sport');
    return (
      <Font>
            <Flex>
            <Lux>St Mortiz Sport</Lux>
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

export default StMoritzSport;