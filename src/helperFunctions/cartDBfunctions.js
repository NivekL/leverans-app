const definedCartIdVar = (userCartId) => {
    // connect with the right cart in the database
    // either the personal cart, the temporary local storage one
    // or return null if no cart at all

    if (userCartId) {
        return userCartId;
    } else if (window.localStorage.getItem('cartId')) {
        return window.localStorage.getItem('cartId');
    } else if (!window.localStorage.getItem('cartId')) {
        // No products added to cart yet
        return null;
    }
}

export const addToCart = async (productId, userCartId) => {
    let cartId = definedCartIdVar(userCartId);
    // if no cart, create one and put the ID in local storage
    if (!cartId) {
        //Create a cart i DB
        try {
            const httpReq = {
                method: 'POST',
            }
            const resObj = await (await fetch('/api/cart/new', httpReq)).json();
            window.localStorage.setItem('cartId', resObj.cartId);
            cartId = resObj.cartId;        
        } catch (error) {
            console.error("HTTP request error on function\ncartDBfunctions => addToCart\nMore info: " + error);
        }
    }

    // add product to cart
    try {
        const httpReq = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'cartId': cartId})
        }
        let response = await (await fetch(`/api/cart/add/productid/${productId}`, httpReq)).json();
        return response;
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => addToCart\nMore info: " + error);
    }
}

export const getWholeCart = async (userCartId) => {
    let cartId = definedCartIdVar(userCartId);
    if (!cartId) return null;
    cartId = encodeURIComponent(cartId);

    try {
        const data = await (await fetch(`/api/cart/${cartId}`)).json();
        return data;
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => getWholeCart\nMore info: " + error);
    }
}

export const removeProductFromCart = async (productid, userCartId) => {
    let cartId = definedCartIdVar(userCartId);

    if (!cartId) {
        console.error("Error with cartId");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/removefromcart/productid/${productid}`, { method: 'DELETE' });
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => removeProductFromCart\nMore info: " + error);
    }
}

export const addQuantityOfProduct = async (productId, userCartId) => {
    let cartId = definedCartIdVar(userCartId);

    if (!cartId) {
        console.error("Error with cartId");
    }

    try {
        const httpReq = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'cartId': cartId})
        }
        await fetch(`/api/cart/add/productid/${productId}`, httpReq);
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => addQuantityOfProduct\nMore info: " + error);
    }
}

export const subtractQuantityOfProduct = async (productId, userCartId) => {
    let cartId = definedCartIdVar(userCartId);

    if (!cartId) {
        console.error("Error with cartId");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/quantitydecrease/productid/${productId}`, { method: 'DELETE' });
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => subtractQuantityOfProduct\nMore info: " + error);
    }
}

export const cartCheckoutDB = async (userCartId) => {
    let cartId = definedCartIdVar(userCartId);

    if (!cartId) {
        console.error("Error with cartId in local storage");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/cartcheckoutdb`, { method: 'DELETE' });
    } catch (error) {
        console.error("HTTP request error on function\ncartDBfunctions => cartCheckoutDB\nMore info: " + error);
    }
}