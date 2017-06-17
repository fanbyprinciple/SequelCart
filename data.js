const Sequelize = require('sequelize');
const db = new Sequelize('sc', 'user', 'mypass', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 5000
	}
}); // initialaize the db

const Cart = db.define('cart', {
	pid: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING,
	price: Sequelize.INTEGER,
	quantity: Sequelize.INTEGER

}); // to create the table schema

db.sync({}); // synchronises db and commits the changes

function getFromCart() {
	return Cart.findAll({
		where: {
			quantity: {
				$gt: 0
			}
		}
	});
}


function addToCart(cart) {

	return Cart
		.findOrCreate({
			where: {
				name: cart.name
			},
			defaults: {
				price: cart.price,
				quantity: cart.quantity
			}
		})
		.spread(function (productFound, created) {
			//spread divides the array into its 2 parts and passes them as arguments to the callback function   
			if (created) {
				//when the entry is not found. It gets created.
				console.log('Created :', created);
			} else {
				//when the entry exists. the quantity value gets updated
				console.log('Found :', productFound);
				Cart.find({
					where: {
						name: {
							$eq: cart.name
						}
					}
				}).then((model) => {
					console.log('Inside the model');
					//Incrementing the value of quantity column by product.quantity
					return model.increment({
						"quantity": cart.quantity
					});
				});

			}
		})

}

function changeToCart(cart) {
	return Cart.update({
		quantity: cart.quantum,
	}, {
		where: {
			name: {
				$eq: cart.pname
			}
		}
	}); // for updating the rows


}

function deleteFromCart(pname) {
	console.log("delete accessed !");
	return Cart.destroy({
		where: {
			name: {
				$eq: pname
			}
		}
	});

}
module.exports = {
	getFromCart,
	addToCart,
	changeToCart,
	deleteFromCart
};
