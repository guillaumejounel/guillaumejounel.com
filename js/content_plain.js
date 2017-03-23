$(document).ready(function() {
    $('body').css('background', 'white')
    var duration = 300;
    var url = window.location.toString().split("/");
    var language = (url[url.indexOf("guillaumejounel.com")+1] || navigator.language || navigator.userLanguage).slice(0,2) == "fr" ? "fr" : "en"

    function loadContent() {
        if (language == "fr") {
            $("#fr").css("font-weight", "bold")
            $("#en").css("font-weight", "normal")
            $("#CV").attr("href", "content/CV - Guillaume Jounel.pdf")
        } else {
            $("#fr").css("font-weight", "normal")
            $("#en").css("font-weight", "bold")
            $(".CV").attr("href", "content/Resume - Guillaume Jounel.pdf")
        }
        $.getJSON("/guillaumejounel.com/content/general.json", function(json) {
            $.each(json, function(id, value) {
                if (language == "fr")
                    $(id).fadeOut(duration, function() { $(this).html(value.fr) }).fadeIn()
                else
                    $(id).fadeOut(duration, function() { $(this).html(value.en) }).fadeIn()
            });
        });
        $.getJSON("/guillaumejounel.com/content/articles.json", function(json) {
            $.each(json, function(id, value) {
                if (language == "fr") {
                    $("article#"+id).animate({opacity:0},100, function() {
                        $("article#"+id+" h3").html(value.fr.title+ "<br><span class='delete'>X</span>");
                        $("article#"+id+" p").html(value.fr.resume)
                        $("article#"+id+" div.keywords").empty()
                        for (var i = 0; i < value.fr.keywords.length; i++) {$("article#"+id+" div.keywords").append("<span>"+value.fr.keywords[i]+"</span>")}
                    }).animate({opacity:0.8}, 100)
                } else {
                    $("article#"+id).animate({opacity:0},100, function() {
                        $("article#"+id+" h3").html(value.en.title+ "<br><span class='delete'>X</span>");
                        $("article#"+id+" p").html(value.en.resume)
                        $("article#"+id+" div.keywords").empty()
                        for (var i = 0; i < value.en.keywords.length; i++) {$("article#"+id+" div.keywords").append("<span>"+value.en.keywords[i]+"</span>")}
                    }).animate({opacity:0.8}, 100)

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

    var clic = false;
    $("#viewer").on("click", "article", function() {
        clic = true
    }).on("click", this, function() {
        if (!clic)
            $(this).css("display","none");
        clic = false;
    });

    clic = false;
    $("article").on("click", "h3 span.delete", function() {
        clic = true;
    }).on("click", this, function() {
        if (clic) {
            $(this).css("display","none")
            clic = false
        }
        else
            $("#viewer").css("display", "block");
    }).on('mouseenter', this, function() {
        $(this).css('opacity',1);
    }).on('mouseleave', this, function() {
        $(this).css('opacity',0.8);
    })
});
