$(document).ready(function() {
    var duration = 0;
    var language = "<?php echo $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2); ?>" == "fr" ? "fr" : "en"

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

    loadContent()
});
