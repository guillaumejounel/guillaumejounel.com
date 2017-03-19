$(document).ready(function() {
    $('body').css('background', 'white')
    var duration = 0;
    var url = window.location.toString().split("/");
    var language = (url[url.indexOf("guillaumejounel.com")+1] || navigator.language || navigator.userLanguage).slice(0,2) == "fr" ? "fr" : "en"

    function loadContent() {
        if (language == "fr") {
            $("#fr").css("font-weight", "bold")
            $("#en").css("font-weight", "normal")
        } else {
            $("#fr").css("font-weight", "normal")
            $("#en").css("font-weight", "bold")
        }
        $.getJSON("content/general.json", function(json) {
            $.each(json, function(id, value) {
                if (language == "fr")
                    $(id).fadeOut(duration, function() { $(this).html(value.fr) }).fadeIn()
                else
                    $(id).fadeOut(duration, function() { $(this).html(value.en) }).fadeIn()
            });
        });

    }

    $.getJSON("content/articles.json", function(json) {
        var i = 0;
        $.each(json, function(id, value) {
            if (i<3) {
                if (language == "fr")
                    $("#content").append("<article>"+value.fr.title+"</article>")
                else
                    $("#content").append("<article>"+value.en.title+"</article>")
                i+=1
            }
        });
    })
    function update(lan) {
        duration = 300;
        language = lan;
        loadContent()
    }

    $("#language span").click(function() {
        id = $(this).attr('id')
        update(id)
        window.history.pushState(document.title,document.title,id);
        return false
    });

});
