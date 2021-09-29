import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

function CartProductRow({ product, index, productsInCart, displayCost, handleQuantityButton, handleTrashcanButton }) {
  const itemPrice = (item) => {
    if (item.quantity > 1) {
      return `${item.quantity} x ${displayCost(item.price)}`;
    } else if (item.quantity === 0) {
      return displayCost(0);
    } else {
      return displayCost(item.price);
    }
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
            <p className="boldText ellipsis1Line">{product.name}</p>
            <p className="boldText">{itemPrice(product)}</p>
          </ProductRow1>
          <ProductRow2>
            <p className="ellipsis2Line">{product.description}</p>
          </ProductRow2>
          <ProductRow3>
            <table>
              <tbody>
                <tr>
                  <td
                    onClick={() => {
                      handleQuantityButton(product, 'subtract');
                    }}
                  >
                    -
                  </td>
                  <td>{product.quantity}</td>
                  <td
                    onClick={() => {
                      handleQuantityButton(product, 'add');
                    }}
                  >
                    +
                  </td>
                </tr>
              </tbody>
            </table>
            <span>
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => {
                  handleTrashcanButton(product);
                }}
                style={{ cursor: 'pointer' }}
              />
            </span>
          </ProductRow3>
        </ProductInfo>
      </ProductDiv>
      {insertLine(productsInCart, index)}
    </div>
  );
}

export default CartProductRow;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  img {
    height: auto;
    width: 100px;
  }
  .ellipsis1Line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ellipsis2Line {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const ProductRow1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductRow2 = styled.div`
  flex-grow: 1;
`;
const ProductRow3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
