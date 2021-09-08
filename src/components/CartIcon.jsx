import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import React,  { useState } from 'react';
import Cart from './Cart';
import styled from 'styled-components';

function CartIcon() {
    const [open, setOpen] = useState(false)


    return (
        <React.Fragment>
            <IconContainer>
                 <ShoppingCartOutlinedIcon open={open} onClick={() => setOpen(!open)} fontSize="large" style={{fill: "#504f4f", cursor: "pointer"}} />
            </IconContainer>

            <Cart open={open} setOpen={setOpen} />
        </React.Fragment>
    )
}

export default CartIcon



// Style --------------------
const IconContainer = styled.div`
      position: fixed;
  top: 15px;
  right: 30px;
  z-index: 20;
`