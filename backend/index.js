const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const buildDir = path.join(__dirname, '../build');

if (!fs.existsSync(buildDir)) {
    console.error("Can't serve an empty folder. No build folder exists. Remember to run the build script =)");
}
app.use(express.static(path.join(__dirname, '../build')));

const port = 4000;

app.listen(port, () => console.log('Listening on port ' + port));