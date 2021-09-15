import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CartIconItemsInCart({ itemsInCartQuantity }) {
    const [nbOfItemsInCart, setNbOfItemsInCart] = useState();

    useEffect(() => {
        setNbOfItemsInCart(itemsInCartQuantity);
    }, [itemsInCartQuantity])

    const variants = {
        initial: { scale: 1 },
        animate: { 
            scale: [1, 0.8, 1.4, 0.8, 1]
        }
    }

    return (
        <div>
            {
                nbOfItemsInCart ?
                <ItemsInCart
                    as={motion.div}
                    key={nbOfItemsInCart}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        type: "spring",
                        bounce: 1,
                        ease: "linear",
                        duration: 0.8
                    }}
                >
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
    font-family: 'Montserrat'; 
    div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`