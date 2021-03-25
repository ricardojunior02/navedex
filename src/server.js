const express = require('express');
require('dotenv/config');
require('./database');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.NODE_PORT, () => console.log(`Navedex running on port ${process.env.NODE_PORT}`))