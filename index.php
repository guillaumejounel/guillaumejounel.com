<html>
<head>
    <meta charset="UTF-8">
    <title>Guillaume Jounel - Who am I</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="js/p5.js"></script>
    <script language="javascript" type="text/javascript" src="js/particle_system.js"></script>
    <link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
    <script>
    var duration = 0;
    $("#language").css("font-weight", "bold")
    var language = "<?php echo $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2); ?>"
    function loadContent() {
        if (language == "fr") {
            $("#fr").css("font-weight", "bold")
            $("#en").css("font-weight", "normal")
        } else {
            $("#fr").css("font-weight", "normal")
            $("#en").css("font-weight", "bold")
        }
        $.getJSON("content/general.json", function(json) {
            $.each(json, function(i, value) {
                if (language == "fr")
                    $(value.id).fadeOut(duration, function() { $(this).html(value.fr) }).fadeIn()
                else
                    $(value.id).fadeOut(duration, function() { $(this).html(value.en) }).fadeIn()
            });
        });
    }
    function update(lan) {
        duration = 300;
        language = lan;
        loadContent()
    }
    loadContent()
    </script>
    <div id="bg"></div>
    <p id="name">Guillaume <span>Jounel</span></p>
    <div class="blurred">
        <p><span id="language"><span id="en">en</span> &bull; <span id="fr">fr</span></span>
            <span id="status"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> Looking for a Six-Month Software Engineer Internship (Sept 2017 - Feb 2018)</span>
            <span id="introduction">Hi! I'm Guillaume.<br/>
            I'm currently looking for an internship, please feel free to contact me. Fast learner, creative & self-challenging!<br/>
            See you soon! :)</span></p>
            <div class="blur"></div>
        </div>
        <div class="content">
            <div class="column">
                <div class="article"></div>
                <div class="article"></div>
            </div>
            <div class="column">
                <div class="article"></div>
                <div class="article"></div>
            </div>
            <div class="column">
                <div class="article"></div>
                <div class="article"></div>
            </div>
        </div>
    </body>
    </html>
