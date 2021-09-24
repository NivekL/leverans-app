import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { addToCart } from '../helperFunctions/cartDBfunctions';
import { displayCost } from '../helperFunctions/IntPrice';
import { UserContext, ThemeContext } from '../App';

function SingleProductPage({ match, setTriggerCartUpdate }) {
  const [info, setInfo] = useState({});
  const {userCartId, productsInwishlist, setProductsInwishlist} = useContext(UserContext);
  const theme = useContext(ThemeContext);

  const button = {
    borderStyle: theme ? "none" : "solid"
  }
  const styles = {
    color: theme ? "black" : "white",
    borderStyle: theme ? "solid" : "solid",
    borderColor: theme ? "black" : "white",
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`/api/watches/` + match.params.id);
      if (!response.ok) {
        throw new Error('HTTP Error! status: ' + response.status);
      }
      const data = await response.json();
      console.log(data[0]);
      setInfo(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishList = () => {
    if (productsInwishlist.includes(info)) {
      return console.log("duplicate value");
    } else {
      setProductsInwishlist([...productsInwishlist, info]);
    }
  }

  const handleAddToCart = async () => {
    let response = await addToCart(match.params.id, userCartId);
    if (Boolean(response['Additions made'])) {
      setTriggerCartUpdate(Date.now);
    } else {
      console.error('Error regarding the response of addToCart, response looks like this:\n' + response);
    }
  };

  return (
    <MainWrapper className="mainWrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <ImageContainer>
        <motion.img
          className="watchImage"
          src={process.env.PUBLIC_URL + '/images/' + info.image}
          alt="Watch"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
        />
      </ImageContainer>
      <InfoMainContainer>
        <InfoContainer>
          <InnerInfo>
            <h2 className="watchName">{info.name}</h2>
          </InnerInfo>
          <PriceContainer>
            <p className="price">{displayCost(info.price)}</p>
          </PriceContainer>
        </InfoContainer>

        <DescriptionContainer>
          <h2 className="descriptionTitle">Beskrivning</h2>
          <p className="descriptionText">{info.description}</p>
        </DescriptionContainer>

        <AddToCart
          onClick={handleAddToCart}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.3 }}
          style={button}
        >
          Lägg till i varukorg
        </AddToCart>
        <AddSave onClick={addToWishList} style={styles}>Spara Artikel</AddSave>
      </InfoMainContainer>
    </MainWrapper>
  );
}

const MainWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 64px auto 0;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    width: 100%;
    max-width: 1640px;
    margin: 64px auto 0;
  }
`;

const ImageContainer = styled.div`
  .watchImage {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media screen and (min-width: 1024px) {
    flex-basis: 50%;
  }
`;

const InfoMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    flex-basis: 50%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
  }
`;

const InnerInfo = styled.div`
  .watchName {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    .watchName {
      font-size: 18px;
    }
  }
`;

const PriceContainer = styled.div`
  .price {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    .price {
      font-size: 16px;
      margin-top: 15px;
    }
  }
`;

const DescriptionContainer = styled.div`
  padding: 0 20px;
  margin-bottom: 50px;

  .descriptionTitle,
  .descriptionText {
    font-family: 'Montserrat', sans-serif;
  }

  .descriptionTitle,
  .descriptionText {
    font-size: 14px;
  }
`;

const AddToCart = styled(motion.button)`
  height: 50px;
  font-family: 'Libre Franklin', sans-serif;
  border: none;
  width: 94%;
  text-align: center;
  text-decoration: none;
  background-color: #000;
  color: #fff;
  font-weight: 400;
  margin: 10px auto;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
`;

const AddSave = styled(AddToCart)`
  width: 200px;
  background: transparent;
  border: 1px solid #000;
  color: #000;
`;

export default SingleProductPage;
