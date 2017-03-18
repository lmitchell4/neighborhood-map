function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + "," + cityStr;
    
    $greeting.text("So, you want to live at " + address + "?");
    
    streetViewStr = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=';
    streetViewStr += address + '">';
    $body.append(streetViewStr);
    
    
    // load NY Times articles:
    // var nytimes_api_key;
    // $.getJSON("config.json", function(data) {
      // console.log(data);
      // // nytimes_api_key;
    // });

    
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += "?" + $.param({
      "api-key": nytimes_api_key
    });
    
    $.getScript("my_keys.js", function(){
      alert("Script loaded but not necessarily executed.");
    });
    
    $.getJSON(nytUrl, function(data) {
      articles = data.response.docs;
      var items = [];
      $.each(articles, function(key, val) {
        var article = "<li class='article'>";
        article += "<a href='" + val.web_url + "'>";
        article += val.headline.print_headline;
        article += "</a>";
        article += "<p>" + val.lead_paragraph + "</p>";
        article += "</li>";
        // "<li id='" + key + "'>" + val.headline.print_headline + "</li>";
        // article += "<p>" + val.lead_paragraph + "</p>";
        items.push(article);
      });  
     
      $("<ul/>", {
        "id": "nytimes-articles",
        "class": "my-new-list",
        html: items.join("")
      }).appendTo("body");
    });
    
    // $.ajax({
      // url: nytUrl,
      // method: "GET",
    // }).done(function(result) {
      // console.log(result);
    // }).fail(function(err) {
      // throw err;
    // });
    
    // $.getJSON("ajax/test.json", function( data ) {
      // var items = [];
      // $.each( data, function( key, val ) {
        // items.push( "<li id='" + key + "'>" + val + "</li>" );
      // });
     
      // $( "<ul/>", {
        // "class": "my-new-list",
        // html: items.join( "" )
      // }).appendTo( "body" );
    // });

  return false;
};
// $('#form-container').submit(loadData);
$('#submit-btn').click(loadData);
