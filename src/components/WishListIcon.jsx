import React, { useState } from 'react'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import WishList from './WishList';
import styled from 'styled-components';



function WishListIcon() {

    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <IconContainer>
              <ListAltOutlinedIcon open={open} onClick={() => setOpen(!open)} fontSize="large" style={{fill: "#504f4f", cursor: "pointer"}} />
            </IconContainer>
            
            <WishList open={open} setOpen={setOpen}/>
        </React.Fragment>
    )
}

export default WishListIcon




// Style --------------------
const IconContainer = styled.div`
      position: fixed;
  top: 15px;
  right: 65px;
  z-index: 20;


  
`