import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import CartProductRow from './CartProductRow';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import ThankYouForYourPurchase from './ThankYouForYourPurchase';

// Objekt med låtsasdata från databasen
let cartDataFromDB = [
    {
        'name': 'Apple Watch SE',
        'id': 1,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 3195,
        'quantity': 2,
    },
    {
        'name': 'Apple Watch SE',
        'id': 2,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 149,
        'quantity': 1,
    },
    {
        'name': 'Apple Watch SE Special Ed.',
        'id': 3,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 3195,
        'quantity': 3,
    },
    {
        'name': 'Apple Watch SE',
        'id': 4,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 3195,
        'quantity': 1,
    },
    {
        'name': 'Apple Watch SE',
        'id': 5,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 3195,
        'quantity': 1,
    },
    {
        'name': 'Apple Watch SE',
        'id': 6,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/black-w.png',
        'price': 1195,
        'quantity': 4,
    },
]

function Cart({ open, setOpen, setItemsInCartQuantity, setShowWhichPopup }) {
    const [productsInCart, setProductsInCart] = useState([]);
    const [costs, setCosts] = useState({});
    // const [showThankYouForYourPurchase, setShowThankYouForYourPurchase] = useState(false);

    //Function to get total quantity
    const getItemsInCartQuantity = (dataArr, pathToQuantityProperty) => {
        let quantity = 0;
        if (!dataArr.length) {
            return;
        }
        quantity = dataArr.map(v => parseInt(v[pathToQuantityProperty])).reduce((prev, curr) => prev + curr);

        return quantity < 100 ? quantity : '>C';
    }

    useEffect(() => {
        // Gör en fetch till databasen, hämta den sparade varukorgen.
        // Ersätt "cartDataFromDB" nedan mot fetch-resultatet.
        setProductsInCart(cartDataFromDB);
    }, []);

    useEffect(() => {
        // Send the quantity-total to the Cart icon
        setItemsInCartQuantity(getItemsInCartQuantity(productsInCart, 'quantity'));
    }, [productsInCart, setItemsInCartQuantity]);

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
                for (let inCart of cartDataFromDB) {
                    if (inCart.id === item.id) {
                        inCart.quantity += 1;
                    }
                }
                setProductsInCart([...cartDataFromDB]);
                break;
            case 'subtract':
                //fake fetch request to change quantity
                for (let inCart of cartDataFromDB) {
                    if (inCart.id === item.id) {
                        if (inCart.quantity === 1) return;
                        inCart.quantity -= 1;
                    }
                }
                setProductsInCart([...cartDataFromDB]);
                break;
        
            default:
                break;
        }
    }
    const handleTrashcanButton = (item) => {
        console.log('pressed trashcanbutton for product with id: ' + item.id);

        //fake fetch request to delete from Cart
        cartDataFromDB = cartDataFromDB.filter(v => item.id !== v.id);

        setProductsInCart([...cartDataFromDB]);
    }
    const handleOrderButton = () => {
        console.log('orderbutton pressed');
        // setShowThankYouForYourPurchase(true);
        setShowWhichPopup('thankYouForYourPurchase');
    }

    return (
        <ReturnDiv open={open}>
            <TopBar>
                <DivLR>
                    <p>Varukorg</p>
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
                                    <CartProductRow
                                        product={product}
                                        index={index}
                                        productsInCart={productsInCart}
                                        displayCost={displayCost}
                                        handleQuantityButton={handleQuantityButton}
                                        handleTrashcanButton={handleTrashcanButton}
                                    />
                                </motion.div>
                        ))}
                    </AnimatePresence>
                </AnimateSharedLayout>
            </ProductsContainer>
            <CostBreakdown>
                <DivLR>
                    <p>Summa artiklar</p>
                    <p className="boldText">{displayCost(costs.subTotalCost)} SEK</p>
                </DivLR>
                <DivLR>
                    <p>Fraktavgift</p>
                    <p className="boldText">{displayCost(costs.shippingCost)} SEK</p>
                </DivLR>
                <DivLR className="biggerText">
                    <p className="boldText">Totalt inkl. moms</p>
                    <p className="boldText">{displayCost(costs.totalCost)} SEK</p>
                </DivLR>
                <DivLR>
                    <p>Varav 25% moms</p>
                    <p className="boldText">{displayCost(costs.calcVAT)} SEK</p>
                </DivLR>
            </CostBreakdown>
            <OrderButtonContainer>
                    <button onClick={handleOrderButton}>till kassan</button>
            </OrderButtonContainer>
            {/* { 
                showThankYouForYourPurchase ?
                <ThankYouForYourPurchase setShowThankYouForYourPurchase={setShowThankYouForYourPurchase} setCartOpen={setOpen} /> :
                null
            } */}
        </ReturnDiv>
    )
}

export default Cart

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
    padding: 0 var(--padding);
    overflow-y: scroll;
`
const CostBreakdown = styled.div`
    padding: 0 var(--padding);
    > * {
        margin-bottom: 5px;
    }
    div:nth-of-type(3) {
        margin-top: 20px;
    }
    div:nth-of-type(4) {
        font-size: 12px;
    }
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