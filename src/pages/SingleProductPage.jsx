import React from 'react'
import styled from 'styled-components'
import watch from '../images/London_Classic/2371_85dae26011-fast119-me021212-1.png'

function SingleProductPage() {
    return (
        <MainWrapper className="mainWrapper">
            <ImageContainer>
                <img className="watchImage" src={watch} alt="Watch" />
            </ImageContainer>
            <InfoMainContainer>
                <InfoContainer>
                    <InnerInfo>
                        <h2 className="watchName">Golden Dusk</h2>
                        <p className="watchType">Steel mesh</p>
                    </InnerInfo>
                    <PriceContainer>
                        <p className="price">1 695 kr</p>
                    </PriceContainer>
                </InfoContainer>

                <DescriptionContainer>
                    <h2 className="descriptionTitle">Beskrivning</h2>
                    <p className="descriptionText">
                        En ikon i all sin enkelhet. Falken är en tidlös klocka, med sin enkla design och 
                        den karaktäristiska lilla sekund-urtavlan, som en symbol för tidens rörelse. 
                    </p>
                </DescriptionContainer>


                <AddToCart>
                    Lägg till i varukorg
                </AddToCart>
            </InfoMainContainer>
        </MainWrapper>
    )
}

const MainWrapper = styled.div `
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1025px) {
         {
            flex-direction: row;
            width: 100%;
            max-width: 1640px;
            margin: 60px auto 0;
        }
    }
`

const ImageContainer = styled.div `

    .watchImage {
        max-width: 100%;
        height: auto;
        display: block;
    }
`

const InfoMainContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InfoContainer = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
`

const InnerInfo = styled.div `

    .watchName, .watchType {
        font-family: 'Montserrat', sans-serif;
    }
    .watchName {
        font-size: 14px;
    }
    .watchType {
        font-size: 12px;
    }

    @media screen and (min-width: 768px) {
        .watchName {
            font-size: 18px;
        }
        .watchType {
            font-size: 14px;
        }
   }
`

const PriceContainer = styled.div `

    .price {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
    }

    @media screen and (min-width: 768px) {
        .price {
            font-size: 18px;
        }
   }
`

const DescriptionContainer = styled.div `
    padding: 0 20px;
    margin-bottom: 50px;

    .descriptionTitle, .descriptionText {
        font-family: 'Montserrat', sans-serif;
    }

    .descriptionTitle, .descriptionText {
        font-size: 14px;
    }    
`

const AddToCart = styled.button `
    height: 50px;
    font-family: 'Libre Franklin', sans-serif;
    border: none;
    width: 90%;
    text-align: center;
    text-decoration: none;
    background-color: #000;
    color: #fff;
    font-weight: 400;
    margin: 10px auto;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    position: relative;
`

export default SingleProductPage
