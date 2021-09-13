export const addToCart = async (productId) => {
    let cartId = window.localStorage.getItem('cartId');
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
            console.error(error);
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
        await fetch(`/api/cart/add/productid/${productId}`, httpReq);
    } catch (error) {
        console.error(error);
    }
}

export const getWholeCart = async () => {
    let cartId = window.localStorage.getItem('cartId');

    if (!cartId) {
        // No products added to cart yet
        return null;
    }

    cartId = encodeURIComponent(cartId);

    try {
        const data = await (await fetch(`/api/cart/${cartId}`)).json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const removeProductFromCart = async (productid) => {
    let cartId = window.localStorage.getItem('cartId');

    if (!cartId) {
        throw new Error("Error with cartId in local storage");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/removefromcart/productid/${productid}`, { method: 'DELETE' });
    } catch (error) {
        console.error(error);
    }
}

export const addQuantityOfProduct = async (productId) => {
    let cartId = window.localStorage.getItem('cartId');

    if (!cartId) {
        throw new Error("Error with cartId in local storage");
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
        console.error(error);
    }
}

export const subtractQuantityOfProduct = async (productId) => {
    let cartId = window.localStorage.getItem('cartId');

    if (!cartId) {
        throw new Error("Error with cartId in local storage");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/quantitydecrease/productid/${productId}`, { method: 'DELETE' });
    } catch (error) {
        console.error(error);
    }
}

export const removeCartCompletelyFromDB = async () => {
    let cartId = window.localStorage.getItem('cartId');

    if (!cartId) {
        throw new Error("Error with cartId in local storage");
    }

    cartId = encodeURIComponent(cartId);

    try {
        await fetch(`/api/cart/${cartId}/removecartcompletely`, { method: 'DELETE' });
    } catch (error) {
        console.error(error);
    }
}