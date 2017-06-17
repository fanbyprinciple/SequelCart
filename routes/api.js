const route = require('express').Router();
const data = require('../data');

route.get('/', (req, res) => {

	data.getFromCart().then((results) => {
		console.log(results);
		res.send(results);

	})

});

route.post('/new', (req, res) => {

	data.addToCart(req.body).then(() => {
		res.redirect('/static');
	}).catch((err) => {
		res.send(err)
	})
});

route.post('/cart/new', (req, res) => {

	data.addToCart(req.body).then(() => {
		res.redirect('/static/cart');
	}).catch((err) => {
		res.send(err);
	})
});


route.post('/cart/change', (req, res) => {

	data.changeToCart(req.body).then(() => {
		res.redirect('/static/cart');
	}).catch((err) => {
		res.send(err);
	})
});

route.post('/cart/remove', (req, res) => {
	console.log("api's remove");
	data.deleteFromCart(req.body.pname).then(() => {
		res.redirect('/static/cart');
	}).catch((err) => {
		res.send(err);
	})
});


module.exports = route;
