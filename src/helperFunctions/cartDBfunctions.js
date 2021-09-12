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
        await fetch(`/api/cart/addtocart/productid/${productId}`, httpReq);
    } catch (error) {
        console.error(error);
    }
}