var ARRR = new Firebase("group-finance.firebaseIO.com");
$(".bro").empty();

function firebase(){

	var searchterm = stockInfo.name;
	recent(stockInfo.name);

	function recent(var1){
		ARRR.push({searchterm: var1})
	}

	ARRR.on("child_added", function(snapshot){

	var info = snapshot.val();

	$(".bro").append("<a class='waves-effect waves-light btn'>" + info.searchterm + "</a>");
	console.log(info);
	});

}