import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import WishListProductRow from './WishListProductRow';
import { addToCart } from '../helperFunctions/cartDBfunctions';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { ThemeContext } from '../App';


function WishList({ open, setOpen, setTriggerCartUpdate, wishListUpdate }) {
    const [productsInwishlist, setProductsInwishlist] = useState([]);
    const [cost, setCosts] = useState({});
    
    
    const theme = useContext(ThemeContext);
    const styles = {
        backgroundColor: theme ? "white" : "#202124",
        color: theme ? "black" : "white",
    }


    useEffect(() => {
        fetchArticles();
    }, [wishListUpdate]);


    const fetchArticles = async () => {
        try {
            const response = await fetch("/api/wishlist");
            const data = await response.json();
            setProductsInwishlist(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    //Räkna ut totaler
    useEffect(() => {
            let subTotalCost = 0;
            let shippingCost = 0;
            let totalCost = 0;
            let percentageVAT = 25;
            let calcVAT = 0;
            for (let product of productsInwishlist) {
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
    }, [productsInwishlist])


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
    const deleteArticle = async (itemId) => {
        try {
            await fetch('/api/wishlist/delete/' + itemId, {
                method: 'DELETE',
            });
            console.log(itemId);
            let  wishlistData = productsInwishlist.filter(v => itemId !== v.id);
            setProductsInwishlist([...wishlistData]);
            
        } catch (e) {
            throw new Error(e);
        }
    }
    // Remove one watch from the list
    const handleTrashcanButton = async (itemId) => {
        deleteArticle(itemId);
    }
    
    // Remove everything in the list
    const handleClearAll = async () => {
        try {
            await fetch('/api/wishlist/clearall/', {
                method: 'DELETE',
            });
            setProductsInwishlist([]);  
        } catch (e) {
            throw new Error(e);
        }
    }
    // Add to cart
    const handleAddToCartButton = async (artId) => {
        let response = await addToCart(artId);
        if (Boolean(response["Additions made"])) {
            setTriggerCartUpdate(Date.now);
            deleteArticle(artId);
        } else {
          console.error("Error regarding the response of addToCart, response looks like this:\n" + response);
        }
      }

    return (
        <ReturnDiv open={open} style={styles}>
            <TopBar>
                <DivLR>
                    <p>Sparade artiklar</p>
                    <Close  onClick={() => setOpen(!open)} style={{cursor: "pointer"}}/>
                </DivLR>
            </TopBar>
            <ProductsContainer className="rowMargin">
                {/* map out wishlist items */}
                <AnimateSharedLayout>
                    <AnimatePresence>
                        {productsInwishlist.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layoutId={product.id}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <WishListProductRow
                                        product={product}
                                        index={index}
                                        productsInwishlist={productsInwishlist}
                                        displayCost={displayCost}
                                        handleTrashcanButton={handleTrashcanButton}
                                        handleAddToCartButton={handleAddToCartButton}
                                    />
                                </motion.div>
                        ))}
                    </AnimatePresence>
                </AnimateSharedLayout>
            </ProductsContainer>

            <OrderButtonContainer>
                    <button onClick={handleClearAll}>rensa artiklar</button>
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
    padding-right: 25px;
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