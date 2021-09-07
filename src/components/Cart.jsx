import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const cartDataFromDB = [
    {
        'name': 'Apple Watch SE',
        'id': 1,
        'shortDesc': 'Aluminiumboett i guld 40 mm sandrosa sportband',
        'desc': 'Apple Watch SE är fylld med nya funktioner som gör användningen ännu roligare: Retina skärm, kompass, cykelkoll & mycket mer! Naturligtvis hittar du alla gamla, användbara funktioner också. Apple Music, Apple Pay och Siri, bara för att nämna några. Du kan ändra klockans utseende snyggt och enkelt, välj mellan olika materialer och ett nytt armband utan spänne som gör användning extra bekvämt. Armbandet finns i två olika materialer och nio olika storlekar för att passa alla handleder. Denna klockan har ett rosa sportband som känns bekvämt mot handleden och 40mm aluminiumboett.',
        'category': 'St Moritz Sport',
        'image': 'St_Moritz_Sport/apple_watch_se_gps_40mm_gold_aluminum_pink_sand_sport_band_pure_front_screen__usen.jpg',
        'price': 3195,
        'quantity': 2,
    }
]

function Cart() {
    const [productsInCart, setProductsInCart] = useState([]);
    const [costs, setCosts] = useState({});

    useEffect(() => {
        // Gör en fetch till databasen, hämta den sparade varukorgen.
        // Ersätt "cartDataFromDB" nedan mot fetch-resultatet.
        setProductsInCart(cartDataFromDB);
    }, []);

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

    const itemPrice = (item) => {
        if (item.quantity > 1) {
            return `${item.quantity} x ${displayCost(item.price)}`;
        } else if (item.quantity === 0) {
            return '0';
        } else {
            return item.price;
        }
    }

    return (
        <ReturnDiv>
            <DivLR className="rowMargin">
                <p>Din varukorg</p>
                <p>X</p>
            </DivLR>
            {/* map out cart items */}
            <ProductsContainer className="rowMargin">
                {productsInCart.map((product) => (
                    <ProductDiv key={product.id}>
                        <span>
                            <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name} />
                        </span>
                        <ProductInfo>
                            <ProductRow1>
                                <p className="boldText">{product.name}</p>
                                <p className="boldText">{itemPrice(product)} SEK</p>
                            </ProductRow1>
                            <p>
                                {product.shortDesc}
                            </p>
                            <ProductRow3>
                                <span>quantity-graphic</span>
                                <span>trashcan</span>
                            </ProductRow3>
                        </ProductInfo>
                    </ProductDiv>
                ))}
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
                <DivLR>
                    <p className="boldText">Totalt inkl. moms</p>
                    <p className="boldText">{displayCost(costs.totalCost)} SEK</p>
                </DivLR>
                <DivLR>
                    <p>Varav 25% moms</p>
                    <p className="boldText">{displayCost(costs.calcVAT)} SEK</p>
                </DivLR>
            </CostBreakdown>
            <OrderButtonContainer>
                    <button>Beställ</button>
            </OrderButtonContainer>
        </ReturnDiv>
    )
}

export default Cart

const ReturnDiv = styled.div`
    --padding: 20px;
    height: calc(100vh - var(--padding) * 2);
    display: flex;
    flex-direction: column;
    padding: var(--padding);
    p {
        margin: 0;
        text-align: left;
    }
    .boldText {
        font-weight: bold;
    }
    .rowMargin {
        margin-bottom: 20px;
    }
`
const DivLR = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductsContainer = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
`
const ProductDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 80px;
    img {
        height: 100%;
        width: auto;
    }

`
const ProductInfo = styled.div`
    
`
const ProductRow1 = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductRow3 = styled.div`
    display: flex;
    justify-content: space-between;
`
const CostBreakdown = styled.div`
    > * {
        margin-bottom: 10px;
    }
`
const OrderButtonContainer = styled.div`
    margin: 10px 0px;
    button {
        width: 100%;
        height: 40px;
    }
`