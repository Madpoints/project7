/*global $*/

var handlers = {
    getWikiTitles: function() {
        var query = $('#searchInput').val();
        
        $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' + query + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (response) {
            console.log(response.query.pages);
            
            var sources = response.query.pages;
            var html = "<ul class='form-control' id='sourceOption'>";
            $.each(sources, function(index, source){
                html += "<li value='"+ source.pageid + "'>" + source.title + "</li>"
            })
            html += "</ul>";
            $('#results').html(html)
        }
        }); 
        
        $('#searchInput').val("");
    }
};

