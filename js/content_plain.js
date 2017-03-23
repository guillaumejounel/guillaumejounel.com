$(document).ready(function() {
    $('body').css('background', 'white')
    var duration = 300;
    var url = window.location.toString().split("/");
    var language = $("#en").css("font-weight")=="bold" ? "en" : "fr"
    function initUrl() {
        history.pushState("", document.title, "/");
        window.history.pushState(document.title,document.title,language);
        return false
    }
    if (url.length<4)
        initUrl()

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
        history.pushState("", document.title, "/");
        window.history.pushState("",document.title,id);
        return false
    });

    var clic = false;
    $("#viewer").on("click", "article", function() {
        clic = true
    }).on("click", this, function() {
        if (!clic)
            $(this).css("display","none");
            history.pushState("", document.title, "/");
            window.history.pushState(document.title,document.title,language);
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
            var i = $(this).attr("id")
            $.getJSON("/content/articles.json", function(json) {
                console.log(json[i][language].content)
                $("#viewer article h3").html(json[i][language].title);
                $("#viewer article div.text p").html(json[i][language].content);
                $("#viewer").css("display", "block");
                $("#viewer article div.keywords").empty()
                $.each(json[i][language].keywords, function(id, value) {
                    $("#viewer article div.keywords").append("<span>"+value+"</span>")
                })
                history.pushState("", document.title, "/");
                window.history.pushState(document.title,document.title,language+"/"+json[i].image);
                return false
            });

            return false
        }
    }).on('mouseenter', this, function() {
        $(this).css('opacity',1);
    }).on('mouseleave', this, function() {
        $(this).css('opacity',0.8);
    })
});
