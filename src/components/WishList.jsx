import React, { useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import WishListProductRow from './WishListProductRow';
import { addToCart } from '../helperFunctions/cartDBfunctions';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { ThemeContext, UserContext } from '../App';
import { displayCost } from '../helperFunctions/IntPrice';
import { getUniqueArray } from '../helperFunctions/getUniqueArray';


function WishList({ open, setOpen, setTriggerCartUpdate }) {
    const {productsInwishlist, setProductsInwishlist} = useContext(UserContext);

    // Use ipcRenderer + remote that can connect to Electron
    // methods only available on the Node side otherwise
    const require = window.require;
    const { ipcRenderer } = window.require('electron');
    const remote = window.require('@electron/remote');
    
    // Use dialog via remote
    const { dialog } = remote;
    
    // Use the fs and paths modules from node
    const fs = require('fs');
    
    
    const theme = useContext(ThemeContext);
    const styles = {
        backgroundColor: theme ? "white" : "#202124",
        color: theme ? "black" : "white",
    }

    //electron
    useEffect(() => {
        ipcRenderer.on('menuChoice', (ipcEvent, choice) => {
            let fileExtensionToUse = 'json';
            if (choice === 'Save current wish list') {
                let filePath = dialog.showSaveDialogSync({
                properties: ['createDirectory']
                });
                if (filePath) {
                    // add extension if missing
                    if (
                        filePath.slice(-fileExtensionToUse.length - 1) !==
                        '.' + fileExtensionToUse
                    ) {
                        filePath += '.' + fileExtensionToUse;
                    }
                    let saveArray = [];
                    productsInwishlist.map(v => {
                        saveArray.push(v.id);
                    })
                    // save text as json
                    fs.writeFileSync(
                        filePath,
                        JSON.stringify({saveArray}),
                        'utf-8'
                    );
                    setProductsInwishlist([]);
                }
            }
            if (choice === 'Load a wish list') {
                (async () => {
                    try {
                        let filePaths = dialog.showOpenDialogSync({
                        properties: ['openFile'],
                        options: { filters: { extensions: ['.json'] } }
                        });
                        // your logic and something with fs and path eventually to load
                        let jsonData = fs.readFileSync(filePaths[0], 'utf8');
                        let wishlistImported = JSON.parse(jsonData);
                        let bulkParams = wishlistImported.saveArray.join('+');

                        //fetch products                        
                        let productData = await (await fetch(`/api/watches/bulk/${bulkParams}`)).json();

                        // add imported wishlist to productsInWishlist
                        let tempWishlist = [...productsInwishlist, ...productData];
                        setProductsInwishlist(getUniqueArray(tempWishlist, 'id'));
                    } catch (error) {
                        // if someone cancels the load dialog
                    }
                })();
            }
        });
        return () => ipcRenderer.removeAllListeners('menuChoice');
    },[productsInwishlist]);

    const deleteArticle = async (itemId) => {
            let  wishlistData = productsInwishlist.filter(v => itemId !== v.id);
            setProductsInwishlist([...wishlistData]);
    }
    // Remove one watch from the list
    const handleTrashcanButton = async (itemId) => {
        deleteArticle(itemId);
    }
    
    // Remove everything in the list
    const handleClearAll = () => {
        setProductsInwishlist([]);  
    }
    // Add to cart
    const handleAddToCartButton = async (artId) => {
        let response = await addToCart(artId);
        if (Boolean(response["Additions made"])) {
            setTriggerCartUpdate(Date.now);
            deleteArticle(artId);
        } else {
          console.error("Error regarding the response of addToCart, response looks like this:\n" + response);
        }
      }

    return (
        <ReturnDiv open={open} style={styles}>
            <TopBar>
                <DivLR>
                    <p>Sparade artiklar</p>
                    <Close  onClick={() => setOpen(!open)} style={{cursor: "pointer"}}/>
                </DivLR>
            </TopBar>
            <ProductsContainer className="rowMargin">
                {/* map out wishlist items */}
                <AnimateSharedLayout>
                    <AnimatePresence>
                        {productsInwishlist.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layoutId={product.id}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <WishListProductRow
                                        product={product}
                                        index={index}
                                        productsInwishlist={productsInwishlist}
                                        displayCost={displayCost}
                                        handleTrashcanButton={handleTrashcanButton}
                                        handleAddToCartButton={handleAddToCartButton}
                                    />
                                </motion.div>
                        ))}
                    </AnimatePresence>
                </AnimateSharedLayout>
            </ProductsContainer>

            <OrderButtonContainer>
                    <button onClick={handleClearAll}>rensa artiklar</button>
            </OrderButtonContainer>
        </ReturnDiv>
    )
}

export default WishList

const ReturnDiv = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background-color: whitesmoke;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 14px;
    --padding: 20px;
    height: 100vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;

    @media screen and (max-width: 600px) {
        width: 100%
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
`
const DivLR = styled.div`
    display: flex;
    justify-content: space-between;
`
const TopBar = styled.div`
    padding: var(--padding);
`
const ProductsContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-right: 25px;
    overflow-y: scroll;
`

const OrderButtonContainer = styled.div`
    padding: var(--padding);
    button {
        width: 100%;
        height: 40px;
        color: #FFF;
        background-color: #161616;
        border: 0;
        text-transform: uppercase;
        cursor: pointer;

        &:hover{
            background-color: #272727;
        }
    }
`