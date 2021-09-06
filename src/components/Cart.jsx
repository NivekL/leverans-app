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
        'quantity': 1,
    }
]

function Cart() {
    const [productsInCart, setProductsInCart] = useState([]);

    useEffect(() => {
        // Gör en fetch till databasen, hämta den sparade varukorgen.
        // Ersätt "cartDataFromDB" nedan mot fetch-resultatet.
        setProductsInCart(cartDataFromDB);
    }, []);

    return (
        <ReturnDiv>
            <DivLR>
                <p>Din varukorg</p>
                <p>X</p>
            </DivLR>
            {/* map out cart items */}
            <ProductsContainer>
                {productsInCart.map((product) => (
                    <ProductDiv key={product.id}>
                        <span>
                            <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name} />
                        </span>
                        <ProductInfo>
                            <ProductRow1>
                                <p className="boldText">{product.name}</p>
                                <p className="boldText">{product.price} SEK</p>
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
                    <p className="boldText">3000.00 SEK</p>
                </DivLR>
                <DivLR>
                    <p>Fraktavgift</p>
                    <p className="boldText">0.00 SEK</p>
                </DivLR>
                <DivLR>
                    <p className="boldText">Totalt inkl. moms</p>
                    <p className="boldText">3000.00 SEK</p>
                </DivLR>
                <DivLR>
                    <p>Varav 25% moms</p>
                    <p className="boldText">750.00 SEK</p>
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

`
const OrderButtonContainer = styled.div`
    button {
        width: 100%;
        height: 40px;
    }
`