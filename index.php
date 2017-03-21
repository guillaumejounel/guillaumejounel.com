<?php $content = file_get_contents("content/general.json");
$json = json_decode($content, true);
if (isset($_GET["langue"]))
$lang = htmlspecialchars($_GET["langue"], ENT_QUOTES) == "fr" ? "fr" : "en";
else
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == "fr" ? "fr" : "en"; ?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0">
    <title id="metatitle"><?php echo $json["#metatitle"][$lang]; ?></title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
    <div id="bg"></div>
    <header>
        <p>Guillaume <span>Jounel</span></p>
        <div id="social"><a href="mailto:gjounel@gmail.com"><i class='fa fa-envelope-o' aria-hidden='true'></i></a><a href="https://github.com/guillaumejounel" target="_blank"><i class='fa fa-github' aria-hidden='true'></i></a><a href="https://linkedin.com/in/guillaumejounel" target="_blank"><i class='fa fa-linkedin' aria-hidden='true'></i></a><a href="https://facebook.com/guillaumejounel" target="_blank"><i class='fa fa-facebook' aria-hidden='true'></i></a><a href="https://twitter.com/guillaumejounel" target="_blank"><i class='fa fa-twitter' aria-hidden='true'></i></a></div>
    </header>
    <div id="blurred">
        <section>
            <h3 id="title"><span id="language"><a href="en"><span id="en" <?php if($lang=="en") echo "style='font-weight:bold'"?>>en</span></a> ~ <a href="fr"><span id="fr" <?php if($lang=="fr") echo "style='font-weight:bold'"?>>fr</span></a></span><span id="status"><?php echo $json["#status"][$lang]; ?></span></h3>
            <div id="introduction"><?php echo $json["#introduction"][$lang]; ?></div>
        </section>
        <div id="blur"></div>
    </div>
    <div id="content">
        <?php $articles = file_get_contents("content/articles.json"); $json = json_decode($articles, true);
        foreach ($json as $i => $item) { echo "<article id='".$i."'>"; ?>
            <h3><?php echo $json[$i][$lang]["title"]."<br/>"; ?><span class="delete">X</span></h3>
            <div class="text">
                <img src="img/articles/<?php echo $json[$i][$lang]["image"]; ?>.png"/>
                <p><?php echo $json[$i][$lang]["content"]."<br/>";?></p>
            </div>
            <div class="keywords">
            <?php foreach ($json[$i][$lang]["keywords"] as $keyword) {
                echo "<span>".$keyword."</span>";
            }
            echo "</div></article>";
        } ?>
    </div>
    <footer>Developed with ♡ by Guillaume Jounel <span></span></footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/p5.js"></script>
    <script type="text/javascript" src="js/particle_system_plain.js"></script>
    <script type="text/javascript" src="js/content_plain.js"></script>
</body>
</html>
