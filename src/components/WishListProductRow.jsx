import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

function WishListProductRow({ product, index, displayCost, productsInwishlist, handleTrashcanButton, handleAddToCartButton }) {
  const handleDelete = () => {
    handleTrashcanButton(product.id);
  };

  const handleAddToCart = () => {
    handleAddToCartButton(product.id);
  };

  const itemPrice = (item) => {
    return displayCost(item.price);
  };

  const shortenText = (text, maxlength) => {
    if (text.length < maxlength) return text;
    return text.substring(0, maxlength).concat('...');
  };

  const insertLine = (items, index) => {
    if (items.length > 1) {
      if (index === items.length - 1) {
        return;
      }
      return <Line></Line>;
    }
  };

  return (
    <div>
      <ProductDiv>
        <span>
          <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name} />
        </span>
        <ProductInfo>
          <ProductRow1>
            <p className="boldText">{shortenText(product.name, 20)}</p>
            <p className="boldText">{itemPrice(product)} SEK</p>
          </ProductRow1>
          <ProductRow2>
            <p>{shortenText(product.description, 40)}</p>
          </ProductRow2>
          <ProductRow3>
            <span>
              <FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete} />
            </span>
            <span>
              {' '}
              <AddShoppingCartIcon fontSize="small" onClick={handleAddToCart} />
            </span>
          </ProductRow3>
        </ProductInfo>
      </ProductDiv>
      {insertLine(productsInwishlist, index)}
    </div>
  );
}

export default WishListProductRow;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  img {
    height: auto;
    width: 100px;
  }
`;
const ProductInfo = styled.div`
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const ProductRow1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductRow2 = styled.div`
  flex-basis: 50%;
`;
const ProductRow3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  table {
    border-collapse: collapse;
  }
  table,
  tr,
  td {
    border: 1px solid #efefef;
  }
  tr > td:first-of-type,
  tr > td:last-of-type {
    cursor: pointer;
  }
  td {
    width: 1.5em;
    height: 1.5em;
    text-align: center;
  }
  span {
    cursor: pointer;
  }
`;
const Line = styled.div`
  border-bottom: 1px solid #efefef;
  margin: 20px 0;
`;
