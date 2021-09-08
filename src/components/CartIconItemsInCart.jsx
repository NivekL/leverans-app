import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CartIconItemsInCart({ itemsInCartQuantity }) {
    const [nbOfItemsInCart, setNbOfItemsInCart] = useState();

    useEffect(() => {
        setNbOfItemsInCart(itemsInCartQuantity);
    }, [itemsInCartQuantity])

    return (
        <div>
            {
                nbOfItemsInCart ?
                <ItemsInCart>
                    <div>{nbOfItemsInCart}</div>
                </ItemsInCart>
                : null
            }
        </div>
    )
}

export default CartIconItemsInCart

const ItemsInCart = styled.div`
    position: absolute;
    top: -10%;
    right: -7%;
    border-radius: 50%;
    border: 1px solid black;
    width: 20px;
    height: 20px;
    background-color: white;
    text-align: center;
    font-size: 12px;
    div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`