import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


function WishListProductRow({ product, index, displayCost, productsInCart, handleQuantityButton, handleTrashcanButton, handleAddToCart }) {

    const itemPrice = (item) => {
        if (item.quantity > 1) {
            return `${item.quantity} x ${displayCost(item.price)}`;
        } else if (item.quantity === 0) {
            return displayCost(0);
        } else {
            return displayCost(item.price);
        }
    }

    const shortenText = (text, maxlength) => {
        if (text.length < maxlength) return text;
        return text.substring(0,maxlength).concat('...');
    }

    const insertLine = (items, index) => {
        if (items.length > 1) {
            if (index === items.length - 1) {
                return;
            }
            return <Line></Line>;
        }
    }


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
                        <table>
                            <tbody>
                                <tr>
                                    <td onClick={() => { handleQuantityButton(product, 'subtract') }}>-</td>
                                    <td>{product.quantity}</td>
                                    <td onClick={() => { handleQuantityButton(product, 'add') }}>+</td>
                                </tr>
                            </tbody>
                        </table>
                        <span><FontAwesomeIcon icon={faTrashAlt} onClick={() => { handleTrashcanButton(product) }} /></span>
                        <span> <AddShoppingCartIcon fontSize="small" onClick={() => { handleAddToCart(product) }}/></span>
                    </ProductRow3>
                </ProductInfo>
            </ProductDiv>
            {insertLine(productsInCart, index)}
        </div>
    )
}

export default WishListProductRow


const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    img {
        height: 160px;
        width: auto;
    }
`
const ProductInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`
const ProductRow1 = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductRow2 = styled.div`
    flex-grow: 1;
`
const ProductRow3 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    }
`
const Line = styled.div`
    border-bottom: 1px solid #EFEFEF;
    margin: 20px 0;
`