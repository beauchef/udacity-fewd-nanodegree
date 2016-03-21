
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street = $( "input#street" ).val();
    var city = $( "input#city" ).val();
    var address = street + ", " + city;
    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var dimensions = "600x400";
    var src = "http://maps.googleapis.com/maps/api/streetview?size=" + dimensions + "&location=" + address;
    var background = $('img.bgimg');
    if (background.length == 0) {
        console.log('No image, creating new one...');
        $body.append('<img class="bgimg" src="' + src + '">');
    } else {
        console.log('Found image, replacing previous one...');
        background.attr("src", src);
    }

    // NYTimes
    var key = "b43b261fe61e9cc0c49a4d45d5198b70:10:74760062";
    var articleSearch = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
    $.getJSON(articleSearch + "?&q=" + city + "&page=0&sort=newest&api-key=" + key, function(data) {
        $nytHeaderElem.text('NY Times articles about ' + city);
        console.log(data.response);
        var items = [];
        $.each(data.response.docs, function( key, val ) {
            var article = '<a href="' + val.web_url + '">' + val.headline.main + '</a><p>' + val.snippet + '</p>';
            items.push( "<li id='nytimes-article-" + key + "'>" + article + "</li>" );
        });
        $("ul#nytimes-articles").html(items.join(""));
    }).fail(function(error) {
        var errorMsg = "NY Times articles could not be loaded";
        $nytHeaderElem.text(errorMsg);
        console.log(errorMsg);
    });

    return false;
}

$('#form-container').submit(loadData);
