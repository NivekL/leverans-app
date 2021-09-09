import React, { useState, useEffect } from 'react'
import ThankYouForYourPurchase from './cart/ThankYouForYourPurchase';

function Popups({ showWhichPopup, setShowWhichPopup, setIsCartOpen }) {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (showWhichPopup !== '') {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }

    }, [showWhichPopup])

    const popupSwitch = () => {
        switch (showWhichPopup) {
            case 'thankYouForYourPurchase':
                return <ThankYouForYourPurchase setShowWhichPopup={setShowWhichPopup} setIsCartOpen={setIsCartOpen} />
        
            default:
                break;
        }
    }

    return (
        <div>
            {
                showPopup ?
                popupSwitch() :
                null
            }
        </div>
    )
}

export default Popups
