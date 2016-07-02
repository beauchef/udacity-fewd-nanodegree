var GOOGLE_API_KEY = 'AIzaSyCKgloCE2Gsr11WjykHC9E3wEE-_w7UHKo';
var NEW_YORK_TIMES_API_KEY = 'b43b261fe61e9cc0c49a4d45d5198b70:10:74760062';

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street = $("input#street").val();
    var city = $("input#city").val();
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
    var articleSearch = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
    $.getJSON(articleSearch + "?&q=" + city + "&page=0&sort=newest&api-key=" + NEW_YORK_TIMES_API_KEY, function(data) {
        $nytHeaderElem.text('NY Times articles about ' + city);
        console.log(data.response);
        var items = [];
        $.each(data.response.docs, function(key, val) {
            var article = '<a href="' + val.web_url + '">' + val.headline.main + '</a><p>' + val.snippet + '</p>';
            items.push("<li id='nytimes-article-" + key + "'>" + article + "</li>");
        });
        $("ul#nytimes-articles").html(items.join(""));
    }).fail(function(error) {
        var errorMsg = "NY Times articles could not be loaded";
        $nytHeaderElem.text(errorMsg);
        console.log(errorMsg);
    });

    // wikipedia
    var wikiSearch = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
            + city
            + '&format=json&callback=wikiCallback';
    var wikiTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get Wikipedia resources");
    }, 8000)
    $.ajax({
        url: wikiSearch,
        type: 'GET',
        dataType: 'jsonp',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Api-User-Agent': 'Udacity-JF-Beauchef/1.0 (http://beauchef.github.io/; jean-francois_at_beauchef.com)'
        }
    }).done(function(data) {
        clearTimeout(wikiTimeout);
        $wikiElem.text('Wikipedia articles about ' + city);
        console.log(data);
        var items = [];
        // element 0 is search terms
        var titles = data[1];
        var texts = data[2];
        var urls = data[3];
        $.each(titles, function(i, title) {
            var articleLink = '<a href="' + urls[i] + '">' + title + '</a>';
            var articleContent = '<p>' + texts[i] + '</p>';
            items.push("<li id='wikipedia-article-" + i + "'>" + articleLink + articleContent + "</li>");
        });
        $("ul#wikipedia-links").html(items.join(""));
    }).fail(function(error) {
        var errorMsg = "Wikipedia articles could not be loaded";
        $wikiElem.text(errorMsg);
        console.log(errorMsg);
    });

    return false;
}

function initMap() {
    var map = new google.maps.Map(document.getElementById("map_canvas"), {
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    var marathonStart = {lat: 45.5206909, lng: -73.5353562};
    var marathonEnd = {lat: 45.5268889, lng: -73.5704092};
    var markerStart = new google.maps.Marker({
        position: marathonStart,
        map: map,
        title: 'Marathon Start'
    });
    var infoStart = new google.maps.InfoWindow({
        content: 'Marathon start on the Jacques-Cartier Bridge.'
    });
    markerStart.addListener('click', function() {
        infoStart.open(map, markerStart);
    });
    var markerEnd = new google.maps.Marker({
        position: marathonEnd,
        map: map,
        title: 'Marathon End'
    });
    var infoEnd = new google.maps.InfoWindow({
        content: 'Marathon ends at the Parc Lafontaine.'
    });
    markerEnd.addListener('click', function() {
        infoEnd.open(map, markerEnd);
    });
    $.ajax({
        type: "GET",
        url: "http://beauchef.github.io/udacity/P5/gpx/2013-09-22_0831.gpx",
        dataType: "xml",
        success: function(xml) {
            var points = [];
            var bounds = new google.maps.LatLngBounds ();
            $(xml).find("trkpt").each(function() {
                var lat = $(this).attr("lat");
                var lon = $(this).attr("lon");
                var p = new google.maps.LatLng(lat, lon);
                points.push(p);
                bounds.extend(p);
            });

            var poly = new google.maps.Polyline({
                // use your own style here
                path: points,
                strokeColor: "#FF00AA",
                strokeOpacity: .7,
                strokeWeight: 4
            });

            poly.setMap(map);

            // fit bounds to track
            map.fitBounds(bounds);
        }
    });
}

$('#form-container').submit(loadData);

$(function() {
    // initialize();
});