// Declare object to contain stock info
var stockInfo = {
  input: "",
  name: "",
  symbol: "",
  exchange: "",
  timestamp: "",
  price: "",
  change: "",
  changePercent: ""
};

// Initialize search bar
// document.getElementById("searchbar").onsubmit = function() {
//   search();
// };

function search() {

  // Show HTML for results
  $('.main-content').show();

  // Get user string input
  stockInfo.input = $('#search').val().trim();
  console.log(stockInfo.input);

  // Clear input
  $('#search').val("");
  $('#status').empty();
  $('#for').empty();

  // Reset changes
  $('#stockName').empty();
  $('#stockSymbol').empty();
  $('#stockTimestamp').empty();
  $('#stockPrice').empty();
  $('#stockChange').empty();
  $('#stockChange').removeClass();
  $('#stockChangePercent').removeClass();
  $('#articles').empty();
  $('#keywords').empty();
  $('#recent').empty();

  // Start API call
  getSymbol();
}

function getSymbol() {

  $.ajax({
    url: "http://d.yimg.com/aq/autoc?query=" + stockInfo.input + "&region=US&lang=en-US", 

    // url: "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + stockInfo.input, // why no work???

    method: 'GET',
    dataType : 'jsonp',
    crossdomain:true
  }).done(function(data) {

    console.log(data);

    if (data.ResultSet.Result.length <= 0) {
      console.log("fail, no company");

      searchFail();

    } else {

      // Get and set values
      stockInfo.name = data.ResultSet.Result[0].name;
      stockInfo.symbol = data.ResultSet.Result[0].symbol;
      stockInfo.exchange = data.ResultSet.Result[0].exchDisp;

      // ignore: this is for the markit url
      // stockInfo.name = data[0].Name;
      // stockInfo.symbol = data[0].Symbol;
      // stockInfo.exchange = data[0].Exchange;

      // Use stock symbol to search for price
      getPrice();
    }
  });

};

function getPrice() {

  $.ajax({
    url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + stockInfo.symbol, 
    method: 'GET',
    dataType : 'jsonp',
    crossdomain: true,
  }).done(function(data) {

    console.log(data);

    if (data.Status !== "SUCCESS") {

      console.log("fail, no symbol");

      searchFail();

    } else {

      // Show search status
      $('#status').text("Top news stories");
      $('#query').text(stockInfo.input);
      $('#for').text("for ");

      // Search is successful
      getArticles();

      // Format timestamp
      var time = moment(new Date(data.Timestamp));
      var userTimezone = moment.tz.guess();
      var convertedTime = moment.tz(time, userTimezone).format("MMM DD hh:mm z");
      
      // Format price change
      var price = (data.LastPrice).toFixed(2);
      var change = (data.Change).toFixed(2);
      var changePercent = (data.ChangePercent).toFixed(2);

      if (change < 0) {

        var arrowDn = $('<i>').addClass('material-icons negnum').text('arrow_downward');
        $('#stockArrow').html(arrowDn);
        $('#stockChange').addClass('negnum');

      } else {

        var arrowUp = $('<i>').addClass('material-icons posnum').text('arrow_upward');
        $('#stockArrow').html(arrowUp);
        $('#stockChange').addClass('posnum');

      }

      if (changePercent < 0) {
        $('#stockChangePercent').addClass('negnum');
      } else {
        $('#stockChangePercent').addClass('posnum');
      }

      // Reset variables
      stockInfo.timestamp = convertedTime;
      stockInfo.price = price;
      stockInfo.change = change;
      stockInfo.changePercent = changePercent;

      // Display to divs
      displayInfo();
    }
  });
};

function displayInfo() {
  $('.sidebar').show();

  $('#stockName').text(stockInfo.name);
  $('#stockSymbol').text(stockInfo.symbol);
  $('#stockTimestamp').text(stockInfo.timestamp).attr('dash-before',' - ');
  $('#stockPrice').text(stockInfo.price);
  $('#stockChange').text(stockInfo.change);
  $('#stockChangePercent').text("(" + stockInfo.changePercent + "%)");
};

function searchFail() {
  $('.sidebar').hide();

  $('#status').text("No matches found");
  $('#query').text(stockInfo.input);
  $('#for').text("for ");
};