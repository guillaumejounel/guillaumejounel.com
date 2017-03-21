$(document).ready(function() {
    $('body').css('background', 'white')
    var duration = 300;
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
        $.getJSON("content/articles.json", function(json) {
            $.each(json, function(id, value) {
                if (language == "fr") {
                    $("article#"+id).fadeOut(100, function() {
                        $("article#"+id+" h3").html(value.fr.title+ "<span class='delete'>X</span>");
                        $("article#"+id+" p").html(value.fr.resume)
                        $("article#"+id+" div.keywords").empty()
                        for (var i = 0; i < value.fr.keywords.length; i++) {$("article#"+id+" div.keywords").append("<span>"+value.fr.keywords[i]+"</span>")}
                    }).fadeIn()
                } else {
                    $("article#"+id).fadeOut(100, function() {
                        $("article#"+id+" h3").html(value.en.title+ "<span class='delete'>X</span>");
                        $("article#"+id+" p").html(value.en.resume)
                        $("article#"+id+" div.keywords").empty()
                        for (var i = 0; i < value.en.keywords.length; i++) {$("article#"+id+" div.keywords").append("<span>"+value.fr.keywords[i]+"</span>")}
                    }).fadeIn()

                }
            });
        });
    }

    function update(lan) {
        language = lan;
        loadContent()
    }

    $("#language span").click(function() {
        id = $(this).attr('id')
        update(id)
        window.history.pushState(document.title,document.title,id);
        return false
    });

    $("article h3 span.delete").click(function() {
        $(this).parent().parent().css("display","none")
    });
});
