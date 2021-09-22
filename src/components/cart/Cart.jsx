import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import CartProductRow from './CartProductRow';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import {
  addQuantityOfProduct,
  getWholeCart,
  cartCheckoutDB,
  removeProductFromCart,
  subtractQuantityOfProduct,
} from '../../helperFunctions/cartDBfunctions';
import { displayCost } from '../../helperFunctions/IntPrice';
import { UserContext } from '../../App';


function Cart({ open, setOpen, setItemsInCartQuantity, setShowWhichPopup, triggerCartUpdate }) {
  const [productsInCart, setProductsInCart] = useState([]);
  const [costs, setCosts] = useState({});
  const {userCartId} = useContext(UserContext);

  //Function to get total quantity
  const getItemsInCartQuantity = (dataArr, pathToQuantityProperty) => {
    let quantity = 0;
    if (!dataArr || !dataArr.length) {
      return;
    }
    quantity = dataArr.map((v) => parseInt(v[pathToQuantityProperty])).reduce((prev, curr) => prev + curr);

    return quantity < 100 ? quantity : '>C';
  };

  useEffect(() => {
    // Gör en fetch till databasen, hämta den sparade varukorgen.
    (async () => {
      const cartData = await getWholeCart(userCartId);
      setProductsInCart(cartData);
    })();
  }, [triggerCartUpdate, userCartId]);

  useEffect(() => {
    // Send the quantity-total to the Cart icon
    setItemsInCartQuantity(getItemsInCartQuantity(productsInCart, 'quantity'));
  }, [productsInCart, setItemsInCartQuantity]);

  // Räkna ut totaler
  useEffect(() => {
    let subTotalCost = 0;
    let shippingCost = 0;
    let totalCost = 0;
    let percentageVAT = 25;
    let calcVAT = 0;
    if (productsInCart) {
      for (let product of productsInCart) {
        subTotalCost += product.quantity * product.price;
      }
    }
    totalCost = subTotalCost + shippingCost;
    calcVAT = totalCost * (percentageVAT / 100);
    setCosts({
      subTotalCost: subTotalCost,
      shippingCost: shippingCost,
      totalCost: totalCost,
      calcVAT: calcVAT,
    });
  }, [productsInCart]);

  const handleQuantityButton = async (product, addOrSub) => {
    let cartData;
    switch (addOrSub) {
      case 'add':
        await addQuantityOfProduct(product.id, userCartId);
        cartData = await getWholeCart(userCartId);
        setProductsInCart(cartData);
        break;
      case 'subtract':
        await subtractQuantityOfProduct(product.id, userCartId);
        cartData = await getWholeCart(userCartId);
        setProductsInCart(cartData);
        break;

      default:
        break;
    }
  };
  const handleTrashcanButton = async (product) => {
    await removeProductFromCart(product.id, userCartId);
    const cartData = await getWholeCart(userCartId);
    setProductsInCart(cartData);
  };
  const handleOrderButton = async () => {
    if (!productsInCart.length) {
      // console.log('no products in cart');
      return;
    }
    //IRL you would send the order here somehow, or go to the next step
    //We will however simply clear the Cart and then show a thank you-message
    await cartCheckoutDB(userCartId);
    setProductsInCart([]);
    if (window.localStorage.getItem('cartId')) {
      window.localStorage.removeItem('cartId');
    }
    setShowWhichPopup('thankYouForYourPurchase');
  };

  return (
    <ReturnDiv open={open}>
      <TopBar>
        <DivLR>
          <p>Varukorg</p>
          <Close onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} />
        </DivLR>
      </TopBar>
      <ProductsContainer className="rowMargin">
        {/* map out cart items */}
        <AnimateSharedLayout>
          <AnimatePresence>
            {!productsInCart
              ? null
              : productsInCart.map((product, index) => (
                  <motion.div key={product.id} layoutId={product.id} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <CartProductRow
                      product={product}
                      index={index}
                      productsInCart={productsInCart}
                      displayCost={displayCost}
                      handleQuantityButton={handleQuantityButton}
                      handleTrashcanButton={handleTrashcanButton}
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </AnimateSharedLayout>
      </ProductsContainer>
      <CostBreakdown>
        <DivLR>
          <p>Summa artiklar</p>
          <p className="boldText">{displayCost(costs.subTotalCost)}</p>
        </DivLR>
        <DivLR>
          <p>Fraktavgift</p>
          <p className="boldText">{displayCost(costs.shippingCost)}</p>
        </DivLR>
        <DivLR className="biggerText">
          <p className="boldText">Totalt inkl. moms</p>
          <p className="boldText">{displayCost(costs.totalCost)}</p>
        </DivLR>
        <DivLR>
          <p>Varav 25% moms (öresavrundat)</p>
          <p className="boldText">{displayCost(costs.calcVAT)}</p>
        </DivLR>
      </CostBreakdown>
      <OrderButtonContainer>
        <button onClick={handleOrderButton}>till kassan</button>
      </OrderButtonContainer>
    </ReturnDiv>
  );
}

export default Cart;

const ReturnDiv = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  background-color: whitesmoke;
  box-shadow: ${({ open }) => (open ? '-5px 0px 50px #3333337f' : '0px 0px 0px #3333337f')};
  font-family: 'Libre Franklin', sans-serif;
  font-size: 14px;
  --padding: 20px;
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  p {
    margin: 2px 0;
    text-align: left;
  }
  .boldText {
    font-weight: bold;
  }
  .biggerText {
    font-size: 16px;
  }
  .rowMargin {
    margin-bottom: 20px;
  }
`;
const DivLR = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TopBar = styled.div`
  padding: var(--padding);
`;
const ProductsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 var(--padding);
  overflow-y: scroll;
`;
const CostBreakdown = styled.div`
  padding: 0 var(--padding);
  > * {
    margin-bottom: 5px;
  }
  div:nth-of-type(3) {
    margin-top: 20px;
  }
  div:nth-of-type(4) {
    font-size: 12px;
  }
`;
const OrderButtonContainer = styled.div`
  padding: var(--padding);
  button {
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: #161616;
    border: 0;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: #272727;
    }
  }
`;
