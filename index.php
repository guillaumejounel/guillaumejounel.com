<?php $content = file_get_contents("content/general.json");
$json = json_decode($content, true);
if (isset($_GET["langue"]))
    $lang = htmlspecialchars($_GET["langue"], ENT_QUOTES) == "fr" ? "fr" : "en";
else
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == "fr" ? "fr" : "en"; ?>
<html>
<head>
    <meta charset="UTF-8">
    <title id="title"><?php echo $json["#title"][$lang]; ?></title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="js/p5.js"></script>
    <script language="javascript" type="text/javascript" src="js/particle_system.js"></script>
    <script language="javascript" type="text/javascript" src="js/content.js"></script>
    <link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
    <div id="bg"></div>
    <p id="name">Guillaume <span>Jounel</span></p>
    <div class="blurred">
        <p>
            <span id="language"><a href="en"><span id="en" <?php if($lang=="en") echo "style='font-weight:bold'"?>>en</span></a> ~ <a href="fr"><span id="fr" <?php if($lang=="fr") echo "style='font-weight:bold'"?>>fr</span></a></span>
            <span id="status"><?php echo $json["#status"][$lang]; ?></span>
            <span id="introduction"><?php echo $json["#introduction"][$lang]; ?></span>
        </p>
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
