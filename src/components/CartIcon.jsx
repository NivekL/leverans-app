import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import React,  { useState } from 'react';
import Cart from './cart/Cart';
import styled from 'styled-components';
import NotificationBubbleQuantity from './NotificationBubbleQuantity';

function CartIcon({ setShowWhichPopup, open, setOpen, triggerCartUpdate }) {
    const [itemsInCartQuantity, setItemsInCartQuantity] = useState(0);

    return (
        <React.Fragment>
            <IconContainer open={open} onClick={() => setOpen(!open)} style={{cursor: "pointer"}}>
                 <ShoppingCartOutlinedIcon fontSize="large" style={{fill: "#504f4f"}} />
                 <NotificationBubbleQuantity dynamicQuantityState={itemsInCartQuantity} />
            </IconContainer>

            <Cart 
                open={open} 
                setOpen={setOpen} 
                setItemsInCartQuantity={setItemsInCartQuantity}
                setShowWhichPopup={setShowWhichPopup}
                triggerCartUpdate={triggerCartUpdate}
            />
        </React.Fragment>
    )
}

export default CartIcon



// Style --------------------
const IconContainer = styled.div`
      position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
`