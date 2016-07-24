var ref = new Firebase("https://ljj-testdata.firebaseio.com/searchData/");

var list = []; // Where the data will live locally

// ###

ref.on('value',function(snapshot) {

	// Reset array
	list = [];

	// Download all data into array

	snapshot.forEach(function(childSnapshot) {

		list.push({
			symbol:childSnapshot.key(),
			count:childSnapshot.val()
		});

	});

	// Sort by descending count
	list.sort(function(a,b) {
		return parseFloat(b.count) - parseFloat(a.count);
	});
	// console.log(list);

	// Display
	displayPopular();

});

function firebase() {

	// Use symbol as unique id
	
	recent(stockInfo.symbol);
} // OK

function recent(input) {

	// If not in array, push as new

	// console.log(JSON.stringify(list));
	// console.log(JSON.stringify(list).indexOf(input));

	if (JSON.stringify(list).indexOf(input) > -1) {

		console.log("### Existing");

		// Generic function ### DO NOT DELETE!

		function findIndexByKeyValue(obj, key, value)
		{
		    for (var i = 0; i < obj.length; i++) {
		        if (obj[i][key] == value) {
		            return i;
		        }
		    }
		    return null;
		}

		// Find count
		var index = findIndexByKeyValue(list,'symbol',input);
		var count = list[index].count;
		// console.log(findIndexByKeyValue(list,'symbol',input));
		// console.log(count);

		// Increase count
		count++;

		// Update data
		ref.child(input).set(count);

	} else {

		console.log("### New");

		// Push to server data
		ref.child(input).set(1);

	}
} //OK

function displayPopular() {

	// Clear clear clear
	$('.bro').empty();

	// TOP 5 ONLY
	for (var i = 0; i < 5; i++) {

		var symbol = list[i].symbol;

		// Make new button
		var item = $('<a>')
			.addClass('waves-effect waves-light btn bot')
			.text(symbol)
			.attr('id',symbol);
		$('.bro').append(item);

		// Register click event
		// Use ID so it doesn't loop
		$('#' + symbol).on('click', function() {
			console.log('Reload');
			var input = $(this).attr('id');
			search(input);
		});

		// console.log("Display " + symbol);
	}
}