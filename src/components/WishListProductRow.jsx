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
                        <p className="boldText">{product.name}</p>
                        <p className="boldText">{itemPrice(product)}</p>
                    </ProductRow1>
                    <ProductRow3>
                        <span><FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete} /></span>
                        <span> <AddShoppingCartIcon fontSize="small" onClick={handleAddToCart}/></span>
                    </ProductRow3>
                </ProductInfo>
            </ProductDiv>
            {insertLine(productsInwishlist, index)}
        </div>
    )
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
`
const ProductRow3 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    table {
        border-collapse: collapse;
    }
    table, tr, td {
        border: 1px solid #EFEFEF;
    }
    tr > td:first-of-type, tr > td:last-of-type {
        cursor: pointer;
    }
    td {
        width: 1.5em;
        height: 1.5em;
        text-align: center;
    }
    span{
        cursor: pointer;
        font-size: 18px;
    }
`
const Line = styled.div`
  border-bottom: 1px solid #efefef;
  margin: 20px 0;
`;
