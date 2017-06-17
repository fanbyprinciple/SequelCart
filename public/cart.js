var itemList = [];

function postItems(changedItem) {
	$.post('/api/cart/change', {
			pname: changedItem.name,
			quantum: changedItem.quantity
		},
		function (data) {});

} // this function posts itemList increase or decrease

function removeItem(itemName) {

	$.post('/api/cart/remove', {
			pname: itemName
		},
		function (data) {

		});
} // this function is to remove an entry from the list
function retrieveList() {

	$.get('/api', function (data) {

		itemList = data;

		refreshList();
	});
}

// callTotal() to get total price
function callTotal() {
	var totalAmount = 0;

	if (!itemList.length) {
		document.getElementsByTagName('input')[0].value = 0 + "";
	} // if empty itemlist[]
	else {
		for (var i = 0; i < itemList.length; ++i) {
			totalAmount += itemList[i].quantity * itemList[i].price;
		}

		document.getElementsByTagName('input')[0].value = totalAmount;
	}
}

function refreshList() {


	if (!itemList.length) {
		$('.table').html('<h1 class="display-3" style="text-align:center; font-size:30px "> Nothing to show here.<br> Go to inventory and add something to cart :)</h1>');

		callTotal();

	} // if empty itemlist 
	else {

		// add table header

		$('.table').html('<tr><th>Product Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>Total Price</th><th align="center">Add</th><th align="right">Delete</th><th align="right">Remove</th></tr>');

		for (var i = 0; i < itemList.length; i++) {

			var price = itemList[i].price;

			// adds table row from local storage

			var newList = $('<tr><td>' + itemList[i].pid + '</td><td>' + itemList[i].name + '</td><td>' + itemList[i].price + '</td><td>' + itemList[i].quantity + '</td><td>' + price * itemList[i].quantity +
				'</td><td class="text-center"><img src="add.jpg" width="32" data-id=' +
				i + ' class=" button-add" /></td><td class="text-center"><img src="minus.jpg" width="28" data-id=' + i + ' class="button-sub" /></td>' + '<td class="text-center"><img src="remove.png" width="28" data-id=' + i + ' class="button-del" /></td></tr>');


			newList.appendTo('.table');
			callTotal();
		}
	}


	$('.button-add').click(function () {

		itemList[parseInt($(this).attr('data-id'))].quantity++;

		postItems(itemList[parseInt($(this).attr('data-id'))]); // for sending changed quantity to db

		refreshList(); // to refresh the list


	});

	$('.button-sub').click(function () {

		itemList[parseInt($(this).attr('data-id'))].quantity--;

		if (itemList[parseInt($(this).attr('data-id'))].quantity <= 0) {

			removeItem(itemList[parseInt($(this).attr('data-id'))].name);
			itemList.splice(parseInt($(this).attr('data-id')), 1);
			//parentNode.remove();
			refreshList();
		}

		postItems(itemList[parseInt($(this).attr('data-id'))]); // for sending changed quantity to db

		refreshList(); // to refresh the list	

	});

	$('.button-del').click(function () {

		removeItem(itemList[parseInt($(this).attr('data-id'))].name);
		itemList.splice(parseInt($(this).attr('data-id')), 1);
		refreshList(); // to refresh the list
	});

}

$(function () {
	retrieveList();
});
