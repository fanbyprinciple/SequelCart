/**
 * Created by championswimmer on 12/06/17.
 */
const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
//app.set("view engine", "hbs");

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));



app.use('/static', express.static(__dirname + "/public/"));

const cartApiRoute = require('./routes/api');
app.use('/api', cartApiRoute);

app.get('/static/cart',(req,res)=>{
	res.sendFile(path.join(__dirname+'/public/cart.html'));
});


app.listen(2345, function () {
    console.log("Server started on http://localhost:2345");
});