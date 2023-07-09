const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');
const productRoutes = require("./product");
const authRoutes = require("./auth");
const { verifyToken } = require("../validation");

const r = Router();

r.use('/demo', demo);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/user", authRoutes);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

module.exports = r;
