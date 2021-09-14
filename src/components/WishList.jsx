import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import WishListProductRow from './WishListProductRow';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";


function WishList({ open, setOpen, setItemsInCartQuantity }) {
 const [productsInCart, setProductsInCart] = useState([]);
    const [costs, setCosts] = useState({});

 
    useEffect(() => {
        // Gör en fetch till databasen, hämta den sparade varukorgen.
        // Ersätt "cartDataFromDB" nedan mot fetch-resultatet.
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch("/api/wishlist");
            const data = await response.json();
            setProductsInCart(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    // Räkna ut totaler
    useEffect(() => {
            let subTotalCost = 0;
            let shippingCost = 0;
            let totalCost = 0;
            let percentageVAT = 25;
            let calcVAT = 0;
            for (let product of productsInCart) {
                subTotalCost += product.quantity * product.price;
            }
            totalCost = subTotalCost + shippingCost;
            calcVAT = totalCost * (percentageVAT / 100);
            setCosts({
                'subTotalCost': subTotalCost,
                'shippingCost': shippingCost,
                'totalCost': totalCost,
                'calcVAT': calcVAT
            })
    }, [productsInCart])

    const displayCost = (cost) => {
        if (cost === undefined) {
            return;
        }
        let costStr = cost.toString();
        let dotPos = costStr.indexOf('.');
        if (dotPos < 0) {
            return costStr + '.00';
        } else {
            return costStr.split('.').map((v, i) => {
                if (i === 1) {
                    return v.padEnd(2, '0');
                } else {
                    return v;
                }
            }).join('.');
        }
    }
  
    const handleQuantityButton = (item, addOrSub) => {
        switch (addOrSub) {
            case 'add':
                //fake fetch request to change quantity
                for (let inCart of productsInCart) {
                    if (inCart.id === item.id) {
                        inCart.quantity += 1;
                    }
                }
                setProductsInCart([...productsInCart]);
                break;
            case 'subtract':
                //fake fetch request to change quantity
                for (let inCart of productsInCart) {
                    if (inCart.id === item.id) {
                        if (inCart.quantity === 1) return;
                        inCart.quantity -= 1;
                    }
                }
                setProductsInCart([...productsInCart]);
                break;
        
            default:
                break;
        }
    }
    const handleTrashcanButton = (item) => {
        console.log('pressed trashcanbutton for product with id: ' + item.id);

        //fake fetch request to delete from Cart
      let  cartData = productsInCart.filter(v => item.id !== v.id);

        setProductsInCart([...cartData]);
    }
    const handleClearArticle = () => {

        setProductsInCart([]);
    }
    const handleAddToCart = () => {
        alert('Add to Cart button pressed');
    }

    return (
        <ReturnDiv open={open}>
            <TopBar>
                <DivLR>
                    <p>Sparade artiklar</p>
                    <Close  onClick={() => setOpen(!open)} style={{cursor: "pointer"}}/>
                </DivLR>
            </TopBar>
            <ProductsContainer className="rowMargin">
                {/* map out cart items */}
                <AnimateSharedLayout>
                    <AnimatePresence>
                        {productsInCart.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layoutId={product.id}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <WishListProductRow
                                        product={product}
                                        index={index}
                                        productsInCart={productsInCart}
                                        displayCost={displayCost}
                                        handleQuantityButton={handleQuantityButton}
                                        handleTrashcanButton={handleTrashcanButton}
                                        handleAddToCart={handleAddToCart}
                                    />
                                </motion.div>
                        ))}
                    </AnimatePresence>
                </AnimateSharedLayout>
            </ProductsContainer>

            <OrderButtonContainer>
                    <button onClick={handleClearArticle}>rensa artiklar</button>
            </OrderButtonContainer>
        </ReturnDiv>
    )
}

export default WishList

const ReturnDiv = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background-color: whitesmoke;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 14px;
    --padding: 20px;
    height: 100vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;

    @media screen and (max-width: 600px) {
        width: 100%
    } 
    p {
        margin: 2px 0;
        text-align: left;
    }
    .boldText {
        font-weight: bold;
    }
    .biggerText {
        font-size: 16px;
    }
    .rowMargin {
        margin-bottom: 20px;
    }
`
const DivLR = styled.div`
    display: flex;
    justify-content: space-between;
`
const TopBar = styled.div`
    padding: var(--padding);
`
const ProductsContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-right: 35px;
    overflow-y: scroll;
`

const OrderButtonContainer = styled.div`
    padding: var(--padding);
    button {
        width: 100%;
        height: 40px;
        color: #FFF;
        background-color: #161616;
        border: 0;
        text-transform: uppercase;
        cursor: pointer;

        &:hover{
            background-color: #272727;
        }
    }
`