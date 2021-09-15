import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Close, DoneSharp } from '@material-ui/icons';

function ThankYouForYourPurchase({ setShowWhichPopup, setIsCartOpen }) {
    const iconInnerEl = useRef(null);
    const [iconInnerElWidth, setIconInnerElWidth] = useState(0);
    const [windowSize, setWindowSize] = useState([0, 0]);
    const [componentDidMount, setComponentDidMount] = useState(false);

    useLayoutEffect(() => {
        const updateSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setIconInnerElWidth(iconInnerEl.current.clientWidth);
    }, [windowSize]);

    useEffect(() => {
        setComponentDidMount(true);
        console.log('popup did mount');
    }, [])

    const handleCloseAction = () => {
        //Close this popup
        setShowWhichPopup('');
        //Close Cart
        setIsCartOpen(false);
    }

    return (
        <ReturnDiv>
            <TopBar>
                <DivLR>
                    <Close onClick={handleCloseAction} style={{cursor: "pointer"}}/>
                </DivLR>
            </TopBar>
            <MainContent>
                <IconOuter>
                    <IconInner ref={iconInnerEl} componentDidMount={componentDidMount}>
                        <DoneSharp style={{ fontSize: iconInnerElWidth, color: "#28A745" }} />
                    </IconInner>
                </IconOuter>
                <Message>Din beställning är på väg</Message>
            </MainContent>
        </ReturnDiv>
    )
}

export default ThankYouForYourPurchase


const ReturnDiv = styled.div`
    position: fixed;
    z-index: 20000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    height: 80vh;
    width: 80vw;
    max-width: 700px;
    max-height: 700px;
    padding: 20px;
    filter: drop-shadow(0 0 40px #00000066);
`
const DivLR = styled.div`
    display: flex;
    justify-content: flex-end;
`
const TopBar = styled.div`
    padding: var(--padding);
`
const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const IconOuter = styled.div`
    position: relative;
    width: 60%;
    padding-top: 60%;
`
const IconInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    border: 3px solid black;
    border-radius: 50%;
    text-align: center;
    ::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: white;
        transform: ${({componentDidMount}) => componentDidMount ? 'translateX(100%)' : 'translateX(0)'};
        transition: transform .7s ease-in;
    }
`
const Message = styled.h2`
    margin: 0.5rem 0;
    :first-of-type{
        margin-top: 2rem;
    }
`