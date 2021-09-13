const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlDriver = require('better-sqlite3');
const bcryptjs = require('bcryptjs');

//----------- Webserver
const app = express();
const buildDir = path.join(__dirname, '../build');

if (!fs.existsSync(buildDir)) {
    console.error("Can't serve an empty folder. No build folder exists. Remember to run the build script =)");
}
app.use(express.static(buildDir));
//-----------
app.use(express.json());



//----------- REST API Watches
const dbPathWatches = path.join(__dirname, '../dbtesting/watches.db');
const dbWatches = new sqlDriver(dbPathWatches);

//Get all watches
app.get('/api/watches', (req, res) => {
    let statement = dbWatches.prepare(`
        SELECT * FROM products
    `);
    let result = statement.all();
    res.json(result);
})

//-----------

// GET watches by category

app.get('/api/watches/luxury', (req, res) => {
    let statement = dbWatches.prepare(`
        SELECT * FROM products WHERE category = 'Luxury'
    `);
    let result = statement.all();
    res.json(result);
})

app.get('/api/watches/sport', (req, res) => {
    let statement = dbWatches.prepare(`
        SELECT * FROM products WHERE category = 'Sport'
    `);
    let result = statement.all();
    res.json(result);
})

app.get('/api/watches/classic', (req, res) => {
    let statement = dbWatches.prepare(`
        SELECT * FROM products WHERE category = 'Classic'
    `);
    let result = statement.all();
    res.json(result);
})

// Get watches by id
app.get('/api/watches/:id', (req, res) => {;
    let stmt = dbWatches.prepare(`
      SELECT *
      FROM products
      WHERE id = :id
    `);
    let result = stmt.all({id: req.params.id});
    res.json(result);
  });



//===== Cart ======
const cryptCartId = async (plainId) => {
    const saltRounds = 10;
    try {
        const hash = await bcryptjs.hash(plainId, saltRounds);
        return hash;
    } catch (error) {
        console.error(error);
    }
}
const decryptCartId = async (plainId, hash) => {
    try {
        const match = await bcryptjs.compare(plainId, hash);
        return match;
    } catch(error) {
        console.error(error);
    }
}
const getUncryptedCartId = (cryptedId) => {
    let getIdStmt = dbWatches.prepare(`
        SELECT *
        FROM carts
        WHERE cryptId = :cryptIdParam
    `);
    let getIdResult = getIdStmt.all({
        cryptIdParam: cryptedId
    });
    const cartIdFromDB = getIdResult[0].cartId;
    return cartIdFromDB;
}

// Create a new cart
app.post('/api/cart/new', (req, res) => {
    let stmt = dbWatches.prepare(`
        INSERT INTO carts
        DEFAULT VALUES
    `);
    let info = stmt.run();
    // Crypt the cartId, add the crypt ID in DB
    (async () => {
        try {
            const cryptedCartId = await cryptCartId(info.lastInsertRowid.toString());
            
            let stmt2 = dbWatches.prepare(`
                UPDATE carts
                SET cryptId = :cryptIdParam
                WHERE cartId = :cartIdParam
            `);
            let info2 = stmt2.run({
                cryptIdParam: cryptedCartId,
                cartIdParam: info.lastInsertRowid
            })
            // Send back the crypt version
            // The crypt version will be stored in local storage
            res.json({'cartId': cryptedCartId});
        } catch (error) {
            res.send({message: error})
        }
    })();
})

// Add a product to the cart - or - add more of the same product (quantity)
app.post('/api/cart/add/productid/:productid', (req, res) => {
    // First get the uncrypted cartId that belongs to the users crypted one
    const cartIdFromDB = getUncryptedCartId(req.body.cartId);

    // Then use the uncrypted one to make changes in DB
    let stmt = dbWatches.prepare(`
        INSERT INTO cartItems (cartId, productId)
        VALUES (:cartIdParam, :productIdParam)
    `);
    let info = stmt.run({
        cartIdParam: cartIdFromDB,
        productIdParam: req.params.productid
    });
    res.json({'Additions made': info.changes})
})

// Get all items in your cart
app.get('/api/cart/:cartid', (req, res) => {
    const cryptedCartId = decodeURIComponent(req.params.cartid);
    const cartIdFromDB = getUncryptedCartId(cryptedCartId);

    let stmt = dbWatches.prepare(`
        SELECT products.*, 
        COUNT(productId) AS quantity FROM cartItems
        LEFT JOIN products ON cartItems.productId = products.id
        WHERE cartId = :cartIdParam
        GROUP BY productId
    `);
    let result = stmt.all({
        cartIdParam: cartIdFromDB
    })
    res.json(result);
})

// Delete a product from cart, no matter the quantity of that product.
app.delete('/api/cart/:cartid/removefromcart/productid/:productid', (req, res) => {
    const cryptedCartId = decodeURIComponent(req.params.cartid);
    const cartIdFromDB = getUncryptedCartId(cryptedCartId);

    let stmt = dbWatches.prepare(`
        DELETE FROM cartItems
        WHERE cartId = :cartIdParam
        AND productId = :productIdParam
    `);
    let result = stmt.run({
        cartIdParam: cartIdFromDB,
        productIdParam: req.params.productid
    })
    res.json(result);
})

// Delete one, "Quantity - 1"
app.delete('/api/cart/:cartid/quantitydecrease/productid/:productid', (req, res) => {
    const cryptedCartId = decodeURIComponent(req.params.cartid);
    const cartIdFromDB = getUncryptedCartId(cryptedCartId);

    let stmt = dbWatches.prepare(`
        DELETE FROM cartItems
        WHERE ROWID IN (
            SELECT MAX(ROWID)
            FROM cartItems
            WHERE cartId = :cartIdParam
            AND productId = :productIdParam
        )
    `);
    let result = stmt.run({
        cartIdParam: cartIdFromDB,
        productIdParam: req.params.productid
    })
    res.json(result);
})

// When purchase is done, delete cart and all products in cart from DB
app.delete('/api/cart/:cartid/removecartcompletely', (req, res) => {
    const cryptedCartId = decodeURIComponent(req.params.cartid);
    const cartIdFromDB = getUncryptedCartId(cryptedCartId);

    let stmt = dbWatches.prepare(`
        DELETE FROM cartItems
        WHERE cartId = :cartIdParam
    `);
    let result = stmt.run({
        cartIdParam: cartIdFromDB
    })
    let stmt2 = dbWatches.prepare(`
        DELETE FROM carts
        WHERE cartId = :cartIdParam
    `);
    let result2 = stmt2.run({
        cartIdParam: cartIdFromDB
    })
    res.json({"cartItems": result, "carts": result2});
})
//=================


const port = 4000;
app.listen(port, () => console.log('Listening on port ' + port));