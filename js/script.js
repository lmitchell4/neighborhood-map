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
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += "?" + $.param({
      "api-key": nytimes_api_key
    });
    
    $.getJSON(nytUrl, function(data) {
      articles = data.response.docs;
      var items = [];
      $.each(articles, function(key, article) {
        var article_item = "<li class='article'>";
        article_item += "<a href='" + article.web_url + "'>";
        article_item += article.headline.main;
        article_item += "</a>";
        article_item += "<p>" + article.snippet + "</p>";
        article_item += "</li>";
        items.push(article_item);
      });
     
      // $("<ul/>", {
        // // "id": "nytimes-articles",
        // "class": "my-new-list",
        // html: items.join("")
      // }).appendTo($("#nytimes-articles"));
      
    }).done(function() {
        console.log("ok");
    }).fail(function() {
        console.log("not ok");
    });

  return false;
};
// $('#form-container').submit(loadData);
$('#submit-btn').click(loadData);
