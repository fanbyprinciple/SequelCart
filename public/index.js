var item;

function postItem() {

	console.log(item);
	$.post('/api/new', item, function (data) {
		console.log("Item added !");
	});
}

function disableButton(button) {

	button.attr('disabled', 'disabled');
	button.text("Added to cart");
}




$(function () {

	for (var i = 1; i <= 6; ++i) {
		$("[data-id =" + i + "]").click(function () {

			var id = $(this).siblings();
			var price = id[2].children[1].textContent;

			if (id[3].value) {
				var q = id[3].value;
				alert(q + ' Items added to cart');
			} else {
				var q = 1;
				alert('One Item added to cart');
				// if no quantity is mentioned default: 1
			}

			item = {
				name: id[2].children[0].textContent,
				price: id[2].children[1].textContent,
				quantity: q
			}


			disableButton($(this)); // call disableButton
			postItem();
		});
	}
})
