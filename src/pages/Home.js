import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { displayCost } from '../helperFunctions/IntPrice';

function Home() {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    fetchWatches();
  }, []);

  const fetchWatches = async () => {
    try {
      const response = await fetch('/api/watches/');
      if (!response.ok) {
        throw new Error('HTTP Error! status: ' + response.status);
      }
      const data = await response.json();
      console.log(data);
      setWatches(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Hero>
        <div>
          <p>Refined watches</p>
          <h1>MVMT 2021</h1>
        </div>
      </Hero>
      <div>
        <div>
          <SectionLink to="/LondonClassic">London Classic</SectionLink>

          <Watchcon>
            {watches
              .filter((obj) => obj.category === 'Classic')
              .slice(0, 4)
              .map((watch) => (
                <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                  <div key={watch.id} className="card">
                    <img
                      src={process.env.PUBLIC_URL + '/images/' + watch.image}
                      alt=""
                      onMouseEnter={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.zoom)}
                      onMouseOut={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.image)}
                    />
                    <p>{watch.name}</p>
                    <p>{displayCost(watch.price)}</p>
                  </div>
                </StyledLink>
              ))}
          </Watchcon>
        </div>
        <Hero1></Hero1>
        <div>
          <SectionLink to="/DubaiLuxury">Dubai Luxury</SectionLink>

          <Watchcon>
            {watches
              .filter((obj) => obj.category === 'Luxury')
              .slice(0, 4)
              .map((watch) => (
                <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                  <div key={watch.id} className="card">
                    <img
                      src={process.env.PUBLIC_URL + '/images/' + watch.image}
                      alt=""
                      onMouseEnter={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.zoom)}
                      onMouseOut={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.image)}
                    />
                    <p>{watch.name}</p>
                    <p>{displayCost(watch.price)}</p>
                  </div>
                </StyledLink>
              ))}
          </Watchcon>
        </div>
        <Ocean></Ocean>
        <div>
          <SectionLink to="/StMoritzSport">St Moritz Sport</SectionLink>

          <Watchcon>
            {watches
              .filter((obj) => obj.category === 'Sport')
              .slice(0, 4)
              .map((watch) => (
                <StyledLink to={`/${watch.category}/${watch.id}/${watch.name}`}>
                  <div key={watch.id} className="card">
                    <img
                      src={process.env.PUBLIC_URL + '/images/' + watch.image}
                      alt=""
                      onMouseEnter={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.zoom)}
                      onMouseOut={(e) => (e.currentTarget.src = process.env.PUBLIC_URL + '/images/' + watch.image)}
                    />
                    <p>{watch.name}</p>
                    <p>{displayCost(watch.price)}</p>
                  </div>
                </StyledLink>
              ))}
          </Watchcon>
        </div>
      </div>
    </div>
  );
}

const Watchcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 5px;

  div {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: whitesmoke;
    margin-bottom: 5px;
    padding-bottom: 10px;
    font-family: 'Libre Franklin', sans-serif;

    @media screen and (min-width: 1024px) {
      margin-bottom: 20px;
    }
  }

  p:last-of-type {
    font-size: 12px;
    padding-top: 5px;
    font-weight: bold;
  }

  img {
    height: 180px;
    @media screen and (min-width: 1024px) {
      height: 480px;
    }
    @media screen and (min-width: 1200px) {
      height: 360px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const SectionLink = styled(Link)`
  text-decoration: none;
  color: #292929;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 2rem;
  margin-left: 0.5rem;

  @media screen and (min-width: 768px) {
    margin-left: 1rem;
  }

  &:hover {
    border-bottom: 2px solid #292929;
  }
`;

const Hero = styled.div`
  font-family: 'Libre Franklin', sans-serif;
  margin-top: 4rem;
  padding-top: 1rem;
  background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller_mobile_.jpg'}');
  height: 60vh;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Libre Franklin', sans-serif;
  margin-bottom: 2rem;

  div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: uppercase;
    position: relative;

    p,
    h1 {
      color: #504f4f;
      margin: 0 auto;
      text-align: center;
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (min-width: 730px) {
    background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller_tabblet_mobile.jpg'}');

    div:first-of-type {
      width: 55%;
      position: relative;
      top: 40%;
      left: 0%;

      p {
        font-size: 20px;
      }

      h1 {
        font-size: 60px;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    height: 100vh;
    background-image: url('${process.env.PUBLIC_URL + '/images/josh-miller-83DnGfaWV24-unsplash.jpg'}');

    div:first-of-type {
      width: 40%;
      position: relative;
      top: 40%;
      left: 5%;

      p {
        font-size: 20px;
      }

      h1 {
        font-size: 75px;
      }
    }
  }
`;
const Hero1 = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  margin-bottom: 2rem;
  background-image: url('${process.env.PUBLIC_URL + '/images/triwa-melted-guns-watch-02.jpg'}');
  height: 30.8vh;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (min-width: 768px) {
    height: 40vh;
  }
  @media screen and (min-width: 1200px) {
    height: 100vh;
  }
  @media screen and (min-width: 1900px) {
    height: 100vh;
  }
`;

const Ocean = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  margin-bottom: 2rem;
  background-image: url('${process.env.PUBLIC_URL + '/images/dive.jfif'}');
  height: 30.8vh;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (min-width: 768px) {
    height: 40vh;
  }
  @media screen and (min-width: 1200px) {
    height: 100vh;
  }
  @media screen and (min-width: 1900px) {
    height: 100vh;
  }
`;

export default Home;
