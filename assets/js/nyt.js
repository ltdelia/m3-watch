var article = {
  headline: "",
  byline: "",
  preview: "",
  date: "",
  link: ""
};

function getArticles() {

  console.log("Searching for articles");
  
  var searchTerm = stockInfo.input // $('#search').val().trim();
  var searchTermCall = "q=" + searchTerm;

  // recent(searchTerm, startYear, endYear);

  var key = "1f7c7f95b1c4310e875bb121e74ccb33:15:74629295";
  var keyCall = "&api-key=" + key;

  var urlBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var urlFinal = urlBase + searchTermCall + keyCall;
  
  var keyarr = [];
  var uniquekeyarr = [];
  
  $.ajax({url: urlFinal, method: 'GET'}).done(function(response) {

    // console.log(urlFinal);
    // console.log(response);

    var limit = 5; 

    for (var i = 0; i < limit; i++) {

      article.headline = response.response.docs[i].headline.main;
      console.log(article.headline);

      // article.byline = response.response.docs[i].byline.original;
      // console.log(article.byline);

      article.preview = response.response.docs[i].snippet;
      console.log("preview: " + article.preview);

      article.datebef = response.response.docs[i].pub_date;
      article.date = moment(article.datebef).format('MMMM D, YYYY');
      console.log(article.date);

      article.link = response.response.docs[i].web_url;
      console.log(article.link);

      for (var j = 0; j < response.response.docs[i].keywords.length; j++) {
        article.keyword = response.response.docs[i].keywords[j].value;
        console.log(article.keyword);
        keyarr.push(article.keyword);
        $.each(keyarr, function(i, el){
          if($.inArray(el, uniquekeyarr) === -1) uniquekeyarr.push(el);
        });
        console.log(uniquekeyarr);
      }
      displayArticles();
    }
    // displayKeywords();
  });
};

// var ARRR = new Firebase("group-finance.firebaseIO.com");

// function recent(var1, var2, var3){
// 	ARRR.push({searchterm: var1, startYear: var2, endYear: var3})
// }

//   var recentcard = $("<div class='card article-card z-depth-3'>");
//   var recenttitle = $("<span class='card-title keytitle'> Recent Searches </span>");
//   var recentinside = $("<div class='card-content black-text rectext'>");
//   recentinside.append(recenttitle);

// ARRR.on("child_added", function(snapshot){
// function test() {
//   alert("Yoo");
// }
// 	var info = snapshot.val();
// 	var search = "<a href='javascript:void(0)' onclick='test()'>" + info.searchterm + "</a>";

//   recentinside.append("<br>" + search);
//   recentcard.append(recentinside);
//   $("#recent").append(recentcard);
// });

// $(".clickable-row").click(function() {
// 	search();
// });

// $("#ClearButton").click(function(){
// 	$(".results").empty();  
// });


function displayArticles() {
    
  var div = $("<div class='card article-card'>");
  var divinside = $("<div class='card-content'>");
  var divaction = $("<div class='card-action'>");

  var spanNumber = $('<span>');
  spanNumber.addClass('label label-primary');
  spanNumber.text(article.number);

  var header = $("<span class='card-title'> " + article.headline + "</span>");
  header.text(article.headline);

  // var contentByline = $("<p class='nytext'>");
  // contentByline.text(article.byline);

  var contentSection = $("<p class='nytext'>");
  contentSection.text(article.preview);

  var contentDate = $("<p>");
  contentDate.attr('id','article-date');
  contentDate.text(article.date);

  var contentLink = $("<a href = " + article.link + " + " + "target='_blank'> Read More </a>");
  contentLink.text('Read More')

  div.append(divinside).append(divaction);
  divinside
    .append(contentDate)
    .append(header)
    // .append(contentByline)
    .append(contentSection);
  divaction.append(contentLink);

  $('#articles').append(div);
  // $('#recent').animate({opacity: 0.85});
};

function displayKeywords() {

  $(keydiv).empty();

  var keydiv = $("<div class='card article-card z-depth-2'>");
  var keydivinside = $("<div class='card-content black-text'>");
  var keydivtitle = $("<span class='card-title keytitle'> Keywords </span>")
  var contentKeyword = $("<p class='nytext'>");
  var keystring = uniquekeyarr.toString();
  contentKeyword.text(keystring);

  $('#keywords').animate({opacity: 0.85});
  keydivinside.append(keydivtitle).append(contentKeyword);
  keydiv.append(keydivinside);
  $('#keywords').append(keydiv);
  // $('#news').prepend("<h4 class='nytitle'>Top News Stories for " + searchTerm + "</h4>");

};

