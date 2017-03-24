<?php $general = file_get_contents("content/general.json"); $general = json_decode($general, true);
if (isset($_GET["langue"])) $lang = htmlspecialchars($_GET["langue"], ENT_QUOTES) == "fr" ? "fr" : "en";
else $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == "fr" ? "fr" : "en";
if (isset($_GET["article"])) $article = htmlspecialchars($_GET["article"], ENT_QUOTES); ?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0">
    <title id="metatitle"><?php echo $general["#metatitle"][$lang]; ?></title>
    <meta property="og:image" content="/img/og-image.jpg">
    <meta property="og:image:width" content="1648">
    <meta property="og:image:height" content="863">
    <meta property="og:title" content="Guillaume Jounel - CS Engineering Student">
    <meta property="og:description" content="Looking for a 6-Month Software Engineer Internship.">
    <meta property="og:url" content="http://guillaumejounel.com">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link rel="stylesheet" href="/css/font-awesome.min.css">
</head>
<body>
    <div id="bg"></div>
    <header>
        <p>Guillaume <span>Jounel</span></p>
        <div id="social"><a href="mailto:gjounel@gmail.com"><i class='fa fa-envelope-o' aria-hidden='true'></i></a><a href="https://github.com/guillaumejounel" target="_blank"><i class='fa fa-github' aria-hidden='true'></i></a><a href="https://linkedin.com/in/guillaumejounel" target="_blank"><i class='fa fa-linkedin' aria-hidden='true'></i></a><a href="https://facebook.com/guillaumejounel" target="_blank"><i class='fa fa-facebook' aria-hidden='true'></i></a><a href="https://twitter.com/guillaumejounel" target="_blank"><i class='fa fa-twitter' aria-hidden='true'></i></a><a id="CV" href="<?php if($lang=="fr") { echo "content/CV%20-%20Guillaume%20Jounel.pdf"; } else { echo "content/Resume%20-%20Guillaume%20Jounel.pdf"; } ?>" target="_blank"><i class='fa fa-file-text-o' aria-hidden='true'></i></a></div>
    </header>
    <div id="blurred">
        <section>
            <h3 id="title"><span id="language"><a href="/en"><span id="en" <?php if($lang=="en") echo "style='font-weight:bold'"?>>en</span></a> ~ <a href="/fr"><span id="fr" <?php if($lang=="fr") echo "style='font-weight:bold'"?>>fr</span></a></span><span id="status"><?php echo $general["#status"][$lang]; ?></span></h3>
            <div id="introduction"><?php echo $general["#introduction"][$lang]; ?></div>
        </section>
        <div id="blur"></div>
    </div>
    <div id="content">
        <?php $articles = file_get_contents("content/articles.json"); $articles = json_decode($articles, true);
        $index = range(0, sizeof($articles)-1);
        shuffle($index);
        foreach ($index as $i) { echo "<a href='/$lang/".$i."/".$articles[$i]['image']."'><article id='".$i."'>"; ?>
            <h3><?php echo $articles[$i][$lang]["title"]."<br/>"; ?><span class="delete">X</span></h3>
            <div class="text">
                <img src="/img/articles/<?php echo $articles[$i]["image"]; ?>.png" alt="<?php echo $articles[$i]["image"]; ?>"/>
                <span class="clic"><?php echo $general[".clic"][$lang]; ?></span>
                <p><?php echo $articles[$i][$lang]["resume"]; ?></p>
            </div>
            <div class="keywords">
            <?php foreach ($articles[$i][$lang]["keywords"] as $keyword) {
                echo "<span>".$keyword."</span>";
            }
            echo "</div></article></a>"; } ?>
            <article> <h3 id="endt1"><?php echo $general["#endt1"][$lang]; ?></h3><div class="text"><img src="/img/articles/ending1.png" alt="fin1"/><br/><p id="endT1"><?php echo $general["#endT1"][$lang]; ?></p></div></article>
            <article> <h3 id="endt2"><?php echo $general["#endt2"][$lang]; ?></h3><div class="text"><img src="/img/articles/ending2.png" alt="fin2"/><br/><p id="endT2"><?php echo $general["#endT2"][$lang]; ?></p></div></article>
            <article> <h3 id="endt3"><?php echo $general["#endt3"][$lang]; ?></h3><div class="text"><img src="/img/articles/ending3.png" alt="fin3"/><br/><p id="endT3"><?php echo $general["#endT3"][$lang]; ?></p></div></article>
    </div>
    <div id="viewer" <?php if (isset($article)) echo "style='display:block'"; ?>>
        <article>
            <a href="/"><nav id="back"><?php echo $general["#back"][$lang]; ?></nav></a>
            <h3><?php if(isset($article))
                    echo $articles[$article][$lang]["title"];
                    else
                    echo "No article loaded"; ?></h3>
            <div class="text">
                <?php echo $articles[$article][$lang]["content"]; ?>
            </div>
            <div class="keywords">
                <?php foreach ($articles[$i][$lang]["keywords"] as $keyword) {
                    echo "<span>".$keyword."</span>";
                } ?>
            </div>
        </article>
    </div>
    <footer>Developed with ♡ by Guillaume Jounel <span></span></footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/p5.js"></script>
    <script type="text/javascript" src="/js/particle_system.js"></script>
    <script type="text/javascript" src="/js/content_plain.js"></script>
</body>
</html>
