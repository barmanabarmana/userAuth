const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const userAuthRouter = require('../public/routers/userAuthRouter');
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const PORT =  process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

(async function start() {
    try{
        await mongoose.connect(process.env.MONGO_PASSWORD)
        app.listen(PORT,() => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })
        console.log(mongoose.connection.readyState)
    }catch (e) {
        throw e;
    }
}())

app.use('/users',userAuthRouter);

app.get('/',(req,res) => {
    res.json("Hello")
})
