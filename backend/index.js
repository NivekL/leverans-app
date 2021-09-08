const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlDriver = require('better-sqlite3');

//----------- Webserver
const app = express();
const buildDir = path.join(__dirname, '../build');

if (!fs.existsSync(buildDir)) {
    console.error("Can't serve an empty folder. No build folder exists. Remember to run the build script =)");
}
app.use(express.static(buildDir));
//-----------



//----------- REST API Watches
const dbPathWatches = path.join(__dirname, '../db/watches.db');
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
app.get('/api/watches/dubai', (req, res) => {
    let statement = dbWatches.prepare(`
        SELECT * FROM products WHERE category = 'Dubai'
    `);
    let result = statement.all();
    res.json(result);
})


const port = 4000;
app.listen(port, () => console.log('Listening on port ' + port));