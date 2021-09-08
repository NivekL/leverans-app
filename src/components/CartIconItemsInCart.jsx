import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CartIconItemsInCart() {
    const [nbOfItemsInCart, setNbOfItemsInCart] = useState();

    useEffect(() => {
        let quantity = 0;
        // Byt ut mot en fetch
        // Helst att den filtrerar ut quantityvariabeln på backend
        // Annars gör det efter fetch
        let data = [
            {'itemID': '1', 'quantity': '1'},
            {'itemID': '2', 'quantity': '1'},
            {'itemID': '3', 'quantity': '3'}
        ];
        quantity = data.map(v => parseInt(v.quantity)).reduce((prev, curr) => prev + curr);
        quantity < 100 ?
        setNbOfItemsInCart(quantity):
        setNbOfItemsInCart('>C');
    }, [])

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