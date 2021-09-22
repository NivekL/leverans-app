import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Watchcon } from '../pages/category-styling';
import { displayCost } from '../helperFunctions/IntPrice';
import { ThemeContext } from '../App';


export const Card = ({ cards }) => {
  const theme = useContext(ThemeContext);

  const card = {
    backgroundColor: theme ? "whitesmoke" : "	#303030",
    color: theme ? "black" : "white",
  }
  return (
    <Watchcon>
      {cards.map((i) => (
        <Link to={`/${i.category}/${i.id}/${i.name}`} key={i.id} className="card" style={card}>
          <img
            src={process.env.PUBLIC_URL + '/images/' + i.image}
            alt={i.name}
            onMouseEnter={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + i.zoom)}
            onMouseOut={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + i.image)}
          />
          <p>{i.name}</p>
          <p>{displayCost(i.price)}</p>
        </Link>
      ))}
    </Watchcon>
  );
};
