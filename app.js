/*global $*/

function getWikiTitles() {
        var query = $('#searchInput').val();
        
        if (query === '') {
            return;
        }
        
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + query + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "jsonp",
            success: function(response) {
                var sources = response.query.pages;
                var html = "<ul id='sourceOption'class='list-group'>";
                
                $.each(sources, function(index, source){
                    html += "<li class='list-group-item' value='"+ source.pageid + "'><b><a href='https://en.wikipedia.org/wiki/" + source.title  + "'>" + source.title + "</a></b><p>" + source.extract + "<p></li>";
                });
                
                html += "</ul>";
                $('#results').html(html);
            }
        }); 
        
        $('#searchInput').val("");
}

function getRandomWikiArticle() {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=1",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function(response) {
            var randomArticle = response.query.pages;
            
            $.each(randomArticle, function(index, randomArticle) {
                window.location.href = "https://en.wikipedia.org/wiki/" + randomArticle.title;    
            });
        }
    });
}
    


$(document).ready(function() {
    
    $('#wikiSearch').on("click", function(event) {
        event.preventDefault();
        getWikiTitles();
    });
    
    $('#wikiRandom').on("click", function(event) {
        event.preventDefault();
        getRandomWikiArticle();
    });
    
});