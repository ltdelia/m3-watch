var ref = new Firebase("https://ljj-testdata.firebaseio.com/searchData/");

var list = [];


// How to order by value of child???
ref.once('value',function(snapshot) {

	snapshot.forEach(function(childSnapshot) {

		// Download all data into array

		list.push({
			symbol:childSnapshot.key(),
			count:childSnapshot.val()
		});


		// Display each
		// displayRecent(childSnapshot.key());

	});

	// Sort by top count
	// Display top 5
	list.sort();
	console.log(list);
	// console.log(list[0].symbol);
});

function firebase() {

	// Use symbol as unique id
	
	recent(stockInfo.symbol);
} // OK

function recent(input) {

	// If not in array, push as new

	var existing = false;

	for (var i = 0; i < list.length && !existing; i++) {

		if (list[i].symbol === input) {

			existing = true;

			console.log("### Existing");

			var count = list[i].count;
			count++;

			ref.child(input).set(count);

		} else {

			console.log("### New");

			// Push to server data
			ref.child(input).set(1);

		}
	}
} //OK

ref.on('child_added',function(snapshot) {

	// Add new data to array
	list.push({
		symbol:snapshot.key(),
		count:snapshot.val()
	});

	// Compare to existing list
	// Reset display

	// for (i = list.length; i > 0; i++) {

	// 	if (snapshot.val() > list[i].count) {

	// 		// Clear
	// 		$('.bro').empty();



	// 	}
	// }

});

function displayRecent(symbol) {
	var item = $('<a>')
		.addClass('waves-effect waves-light btn bot')
		.text(symbol)
		.attr('id',symbol);
	$('.bro').prepend(item);
	console.log("Display " + symbol);
}

// $(document).ready(function() {
// 	$('.bot').click(function() {
// 		console.log('Reload');
// 		var input = $(this).attr('id');
// 		search(input);
// 	});
// });