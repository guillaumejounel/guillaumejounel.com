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
        $.getJSON("/content/general.json", function(json) {
            $.each(json, function(id, value) {
                $(id).fadeOut(duration, function() { $(this).html(value[language]) }).fadeIn()
            });
        });
        $.getJSON("/content/articles.json", function(json) {
            $.each(json, function(id, value) {
                $("article#"+id).animate({opacity:0},100, function() {
                    $("article#"+id+" h3").html(value[language].title+ "<br><span class='delete'>X</span>");
                    $("article#"+id+" p").html(value[language].resume)
                    $("article#"+id+" div.keywords").empty()
                    for (var i = 0; i < value[language].keywords.length; i++) {$("article#"+id+" div.keywords").append("<span>"+value[language].keywords[i]+"</span>")}
                }).animate({opacity:0.8}, 100)
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
        else {
            var id = $(this).attr("id")
            $.getJSON("/content/articles.json", function(json) {
                console.log(json[id][language].content)
                $("#viewer article h3").html(json[id][language].title);
                $("#viewer article div.text p").html(json[id][language].content);
                $("#viewer").css("display", "block");
                $("#viewer article div.keywords").empty()
                $.each(json[id][language].keywords, function(id, value) {
                    $("#viewer article div.keywords").append("<span>"+value+"</span>")
                })
            });

        }
    }).on('mouseenter', this, function() {
        $(this).css('opacity',1);
    }).on('mouseleave', this, function() {
        $(this).css('opacity',0.8);
    })
});
