$(document).ready(function(){

//var searchTerm = $('.searchterm').val().clone();

$("#search").click(function search(){

    $('#results').empty();
	  
	  var searchTerm = $(".searchterm").val();
    var searchTermCall = "q=" + searchTerm;

    var limit = $("#limit").val();

    var startYear = $("#startYear").val();
    var startYear = "1994";
    var startYearCall = "&begin_date=" + startYear + "0000";

    var endYear = "2016";
    //var endMonth = 03;
    var endYearCall = "&end_date=" + endYear + "0000";

    recent(searchTerm, startYear, endYear);

    if (startYear == "") {
      startYearCall = "";
    }

    if (endYear == "") {
      endYearCall = "";
    }

    if (limit == "") {
      limit = 5; // default
    }

    var key = "1f7c7f95b1c4310e875bb121e74ccb33:15:74629295";
    var keyCall = "&api-key=" + key;

    var urlBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var urlFinal = urlBase + searchTermCall + startYearCall + endYearCall + keyCall;

    var result = {
      number: "",
      headline: "",
      byline: "",
      preview: "",
      date: "",
      link: ""
    }
    
    var keyarr = [];
    
    function displayResult() {
      
      var div = $("<div class='card artcard z-depth-2'>");
      var divinside = $("<div class='card-content black-text'>");
      var divaction = $("<div class='card-action'>");

      var spanNumber = $('<span>');
      spanNumber.addClass('label label-primary');
      spanNumber.text(result.number);

      var header = $("<span class='card-title'> " + result.headline + "</span>");
      header.text(result.headline);

      var contentByline = $("<p class='nytext'>");
      contentByline.text(result.byline);

      var contentSection = $("<p class='nytext'>");
      contentSection.text(result.preview);

      var contentDate = $("<p class='nytext'>");
      contentDate.text(result.date);

      var contentLink = $("<a href = " + result.link + " + " + "target='_blank'> Read More </a>");
      contentLink.text('Read More')

      div.append(divinside).append(divaction);
      divinside.append(contentDate).append(header).append(contentByline).append(contentSection);
      divaction.append(contentLink);

      $('#results').append(div);
      $('#recent').animate({opacity: 0.85});

    }

    function displayKey() {

      $(keydiv).empty();

      var keydiv = $("<div class='card artcard z-depth-2'>");
      var keydivinside = $("<div class='card-content black-text'>");
      var keydivtitle = $("<span class='card-title keytitle'> Keywords </span>")
      var contentKeyword = $("<p class='nytext'>");
      contentKeyword.text(keyarr.toString());

      $('#keyword').animate({opacity: 0.85});
      keydivinside.append(keydivtitle).append(contentKeyword);
      keydiv.append(keydivinside);
      $('#keyword').append(keydiv);
      $('#results').prepend("<h4 class='nytitle'>Top News Stories for " + searchTerm + "</h4>");

    }

    function apiCall() {

      $.ajax({url: urlFinal, method: 'GET'}).done(function(response) {

        console.log(urlFinal);
        console.log(response);

        limit = 5; 
          for (var i = 0; i < limit; i++) {

            result.number = i + 1;
            console.log(result.number);

            result.headline = response.response.docs[i].headline.main;
            console.log(result.headline);

            result.byline = response.response.docs[i].byline.original;
            console.log(result.byline);

            result.preview = response.response.docs[i].lead_paragraph;
            console.log("preview: " + result.preview);

            result.datebef = response.response.docs[i].pub_date;
            result.date = moment(result.datebef).format('MMMM D, YYYY');
            console.log(result.date);

            result.link = response.response.docs[i].web_url;
            console.log(result.link);

            for (var j = 0; j < response.response.docs[i].keywords.length; j++) {
              
              result.keyword = response.response.docs[i].keywords[j].value;
              console.log(result.keyword);
              keyarr.push(result.keyword);
              console.log(keyarr);

            }
            displayResult();
          }
          displayKey();
      });
    }

    apiCall();
});

    var ARRR = new Firebase("group-finance.firebaseIO.com");

    function recent(var1, var2, var3){
    	ARRR.push({searchterm: var1, startYear: var2, endYear: var3})
    }

      var recentcard = $("<div class='card artcard z-depth-3'>");
      var recenttitle = $("<span class='card-title keytitle'> Recent Searches </span>");
      var recentinside = $("<div class='card-content black-text rectext'>");
      recentinside.append(recenttitle);

    ARRR.on("child_added", function(snapshot){
    function test() {
      alert("Yoo");
    }
    	var info = snapshot.val();
    	var search = "<a href='javascript:void(0)' onclick='test()'>" + info.searchterm + "</a>";

      recentinside.append("<br>" + search);
      recentcard.append(recentinside);
      $("#recent").append(recentcard);
    });

$(".clickable-row").click(function() {
	search();
});

$("#ClearButton").click(function(){
	$(".results").empty();  
});

return false;

})