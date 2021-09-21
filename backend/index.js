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
    let validPassword = await bcryptjs.compare(passwordDecoded, user[0].password);
  
    return res.json({ loginSuccess: validPassword, user_name: user[0].user_name, userCartId: user[0].cartId });

    //     } else {
    //       res.status(400).json({ error: "Invalid Password" });
    //     }
    //   } else {
    //     res.status(401).json({ error: "User does not exist" });
    //   }
    });

// ......BCRYPT



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

let wishList = path.join(__dirname, "wishList.json");

// Write data into wishlist.json file
const saveListData = (data) => {
    const uniqueId = new Set();
    const duplicateCheck = data.some(element => uniqueId.size === uniqueId.add(element.id).size);
    if(duplicateCheck) {
        return console.log("duplicate value");
    } else {
        const stringifyData = JSON.stringify(data, null, 2);
        fs.writeFileSync(wishList, stringifyData);
    }
};
// Read data from wishlist.json file
const getListData = () => {
    const jsonData = fs.readFileSync(wishList, 'utf8');
    return JSON.parse(jsonData);
};

app.post('/api/wishlist/add', (req, res) => {
    try {
        if(!fs.existsSync(wishList)) {
            saveListData([req.body]);
        } else {
            const currentData = getListData();
            const newData = currentData.push();
            currentData[newData] = req.body;
            saveListData(currentData);
        }
        res.send({success: true, msg: 'added article'});
    } catch (e) {
        console.log(e)
    }
});

app.get('/api/wishlist', (req, res) => {
    res.send(getListData());
  });

app.delete('/api/wishlist/delete/:id', (req, res) => {
    const { id } = req.params;
    const currentData = getListData();
    const wishListArticle = currentData.findIndex(article => article.id == id);

    currentData.splice(wishListArticle, 1);
    saveListData(currentData);
    return res.send("delete data");
   });

app.delete('/api/wishlist/clearall/', (req,res) => {
    fs.unlinkSync(wishList);
    res.send("deleted wishlist");
})

//================


const port = 4000;
app.listen(port, () => console.log('Listening on port ' + port));