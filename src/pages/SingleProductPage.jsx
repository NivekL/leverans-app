import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

function SingleProductPage({match}) {
    const [info, setInfo] = useState({});

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const response = await fetch(`/api/watches/` + match.params.id);
            if (!response.ok) {
                throw new Error('HTTP Error! status: ' + response.status);
            }
            const data = await response.json();
            console.log(data);
            setInfo(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainWrapper className="mainWrapper" 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3}}
        >
            <ImageContainer>
                <motion.img className="watchImage" src={process.env.PUBLIC_URL + '/images/' + info.image} alt="Watch" 
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{ease: "easeInOut", duration: 0.8}}
                />
            </ImageContainer>
            <InfoMainContainer>
                <InfoContainer>
                    <InnerInfo>
                        <h2 className="watchName">{info.name}</h2>
                    </InnerInfo>
                    <PriceContainer>
                        <p className="price">{info.price} kr</p>
                    </PriceContainer>
                </InfoContainer>

                <DescriptionContainer>
                    <h2 className="descriptionTitle">Beskrivning</h2>
                    <p className="descriptionText">{info.description}</p>
                </DescriptionContainer>


                <AddToCart
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{ease: "easeInOut", duration: 0.5, delay: 0.3}}
                >
                    Lägg till i varukorg
                </AddToCart>
            </InfoMainContainer>
        </MainWrapper>
    )
}

const MainWrapper = styled(motion.div) `
    display: flex;
    flex-direction: column;
    margin: 64px auto 0;

    @media screen and (min-width: 1024px) {
         {
            flex-direction: row;
            width: 100%;
            max-width: 1640px;
            margin: 64px auto 0;
        }
    }
`

const ImageContainer = styled.div `

    .watchImage {
        max-width: 100%;
        height: auto;
        display: block;
    }

    @media screen and (min-width: 1024px) {
        {
            flex-basis: 50%;
       }
   }
`

const InfoMainContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: 1024px) {
        {
            flex-basis: 50%;
       }
   }
    
`

const InfoContainer = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
`

const InnerInfo = styled.div `
    .watchName {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
    }

    @media screen and (min-width: 768px) {
        .watchName {
            font-size: 18px;
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

const AddToCart = styled(motion.button) `
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
