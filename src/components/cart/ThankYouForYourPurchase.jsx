import React from 'react';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';

function ThankYouForYourPurchase({ setShowWhichPopup, setIsCartOpen }) {

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
    width: 200px;
    height: 200px;
`
const DivLR = styled.div`
    display: flex;
    justify-content: flex-end;
`
const TopBar = styled.div`
    padding: var(--padding);
`