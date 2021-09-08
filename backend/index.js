const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../build')));

const port = '4000';

app.listen(port, () => console.log('Listening on port ' + port));