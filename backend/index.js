const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlDriver = require('better-sqlite3');
const bcryptjs = require('bcryptjs');
const { get } = require('https');

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

// Bcrypt functions
const cryptSomething = async (plainId) => {
    const saltRounds = 10;
    try {
        const hash = await bcryptjs.hash(plainId, saltRounds);
        return hash;
    } catch (error) {
        console.error(error);
    }
}
const decryptSomething = async (plainId, hash) => {
    try {
        const match = await bcryptjs.compare(plainId, hash);
        return match;
    } catch(error) {
        console.error(error);
    }
}


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

// get a bulk of watches
app.get('/api/watches/bulk/:bulk', (req, res) => {
    // bulk = 1+2+3+4+10
    let bulk = req.params.bulk;
    bulk = bulk.split('+');

    let stmt = dbWatches.prepare(`
        SELECT *
        FROM products
        WHERE id IN (${bulk.join()})
    `);
    let result = stmt.all();
    res.json(result);
});

  // 1.0 Get all users
app.get('/api/registration', (req, res) => {;
    let stmt = dbWatches.prepare(`
      SELECT *
      FROM registration
    `);
    let result = stmt.all();
    res.json(result);
  });

// 1.1 Add new user/Registration (Hashed password comrade, wake up Alan Turing to decrypt)

app.post('/api/registration/add', async (req, res) => {
    //create personal cart in DB
    let stmtCreateCart, infoCreateCart;
    try {
        stmtCreateCart = dbWatches.prepare(`
            INSERT INTO carts
            DEFAULT VALUES
        `);
        infoCreateCart = stmtCreateCart.run();
        if (infoCreateCart.lastInsertRowid <= 0) {
            throw new Error();
        }
    } catch (error) {
        res.status(409).json({message: 'Kunde inte skapa en personlig kundvagn'});
    }
    //later insert that cartId into registration-table as foreign key

    const saltRounds = 10;
    // Generate salt & hash password
    const hashed = await bcryptjs.hash(req.body.password, saltRounds);

   try{
    const stmt = dbWatches.prepare(`
     INSERT INTO registration (user_name, password, cartId)
     VALUES (:user_name,'${hashed}', :cartId)
         `);
         const result = stmt.run({
             user_name: req.body.user_name,
             password: req.body.password,
             cartId: infoCreateCart.lastInsertRowid
            });
            res.json(result);
   } catch(err) {
       res.status(409).json({message: 'Användarnamnet upptaget.'});
   }
})

    // 1.3 Login
app.get('/api/registration/:user_name/:password', async (req, res) => {
    let userNameDecoded = decodeURIComponent(req.params.user_name);
    let passwordDecoded = decodeURIComponent(req.params.password);

    const stmt = dbWatches.prepare(`
        SELECT * FROM registration WHERE user_name = :user_name
    `);
    const user = stmt.all({
        user_name: userNameDecoded,
    });
    // console.log('Login response object:');
    // console.log(user[0]);
    let validPassword;
    try {
        validPassword = await bcryptjs.compare(passwordDecoded, user[0].password);
    } catch (error) {
        console.error(error);
    }
    let cryptedUserId;
    try {
        cryptedUserId = await cryptSomething(user[0].id.toString());
    } catch (error) {
        console.error(error);
    }

    res.json({ loginSuccess: validPassword, user_name: user[0].user_name, userCartId: user[0].cartId, cryptedUserId: cryptedUserId });
    });

    // get a user
app.get('/api/registration/getoneuser/hash/:hash', async (req, res) => {
    let userIdDecoded = decodeURIComponent(req.params.hash);
    
    let stmt = dbWatches.prepare(`
        SELECT *
        FROM registration
    `);
    let result = stmt.all();

    let matchedUser;
    try {
        for (let user of result) {
            let validId = await bcryptjs.compare(user.id.toString(), userIdDecoded);
            if (validId) {
                matchedUser = user;
                break;
            }
        }
    } catch (error) {
        console.error(error);
    }

    const {user_name, cartId} = matchedUser;

    res.json({userName: user_name, cartId: cartId});
    });

// ......BCRYPT



//===== Cart ======
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

const handleCartIdBeforeDB = (reqBody, reqParams) => {
    let bodyOrParams;
    for (let i in reqBody) {
        if (i === 'cartId') {
            bodyOrParams = 'body';
        }
    }
    if (bodyOrParams !== 'body') {
        for (let i in reqParams) {
            if (i === 'cartid') {
                bodyOrParams = 'params';
            }
        }
    }

    let cartIdFromFrontend;
    if (bodyOrParams === 'body') {
        cartIdFromFrontend = reqBody.cartId;
    } else {
        cartIdFromFrontend = decodeURIComponent(reqParams.cartid);
    }

    let plainCartId;
    const regexOnlyNumbers = new RegExp('^[0-9]+$', 'gi');
    if (regexOnlyNumbers.test(cartIdFromFrontend)) {
        plainCartId = cartIdFromFrontend;
    } else {
        plainCartId = getUncryptedCartId(cartIdFromFrontend);
    }

    return plainCartId;
}

// Create a new logged out cart
app.post('/api/cart/new', (req, res) => {
    let stmt = dbWatches.prepare(`
        INSERT INTO carts
        DEFAULT VALUES
    `);
    let info = stmt.run();
    // Crypt the cartId, add the crypt ID in DB
    (async () => {
        try {
            const cryptedCartId = await cryptSomething(info.lastInsertRowid.toString());

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
    const plainCartId = handleCartIdBeforeDB(req.body, req.params);

    // Then use the uncrypted one to make changes in DB
    let stmt = dbWatches.prepare(`
        INSERT INTO cartItems (cartId, productId)
        VALUES (:cartIdParam, :productIdParam)
    `);
    let info = stmt.run({
        cartIdParam: plainCartId,
        productIdParam: req.params.productid
    });
    res.json({'Additions made': info.changes})
})

// Get all items in your cart
app.get('/api/cart/:cartid', (req, res) => {
    let plainCartId = handleCartIdBeforeDB(req.body, req.params);

    let stmt = dbWatches.prepare(`
        SELECT products.*,
        COUNT(productId) AS quantity FROM cartItems
        LEFT JOIN products ON cartItems.productId = products.id
        WHERE cartId = :cartIdParam
        GROUP BY productId
    `);
    let result = stmt.all({
        cartIdParam: plainCartId
    })
    res.json(result);
})

// Delete a product from cart, no matter the quantity of that product.
app.delete('/api/cart/:cartid/removefromcart/productid/:productid', (req, res) => {
    let plainCartId = handleCartIdBeforeDB(req.body, req.params);

    let stmt = dbWatches.prepare(`
        DELETE FROM cartItems
        WHERE cartId = :cartIdParam
        AND productId = :productIdParam
    `);
    let result = stmt.run({
        cartIdParam: plainCartId,
        productIdParam: req.params.productid
    })
    res.json(result);
})

// Delete one, "Quantity - 1"
app.delete('/api/cart/:cartid/quantitydecrease/productid/:productid', (req, res) => {
    let plainCartId = handleCartIdBeforeDB(req.body, req.params);

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
        cartIdParam: plainCartId,
        productIdParam: req.params.productid
    })
    res.json(result);
})

// On login, move any items in logged-out cart to personal cart
app.patch('/api/cart/movetopersonalcart', (req, res) => {
    const oldCartId = getUncryptedCartId(req.body.cartIdLocalSt);
    const newCartId = req.body.cartIdPersonal;

    let stmt = dbWatches.prepare(`
        UPDATE cartItems
        SET cartId = :newCartId
        WHERE cartId = :oldCartId
    `);
    let result = stmt.run({
        oldCartId: oldCartId,
        newCartId: newCartId
    })

    res.json(result);
})

// When purchase is done, for not logged in users: 
// delete cart and all products in cart from DB
app.delete('/api/cart/:cartid/cartcheckoutdb', (req, res) => {
    let plainCartId = handleCartIdBeforeDB(req.body, req.params);
    const cartIdParams = decodeURIComponent(req.params.cartid);
    const regexOnlyNumbers = new RegExp('^[0-9]+$', 'gi');

    let stmt = dbWatches.prepare(`
        DELETE FROM cartItems
        WHERE cartId = :cartIdParam
    `);
    let result = stmt.run({
        cartIdParam: plainCartId
    })

    let stmt2, result2;
    if (!regexOnlyNumbers.test(cartIdParams)) {
        // oinloggad varukorg, deleta även själva varukorgen
        stmt2 = dbWatches.prepare(`
            DELETE FROM carts
            WHERE cartId = :cartIdParam
        `);
        result2 = stmt2.run({
            cartIdParam: plainCartId
        })
    }
    
    res.json({"cartItems": result, "carts": result2});
})
//=================

//================


const port = 4000;
app.listen(port, () => console.log('Listening on port ' + port));