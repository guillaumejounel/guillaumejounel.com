$(document).ready(function(){function d(){return history.pushState("",document.title,"/"),window.history.pushState(document.title,document.title,c),!1}function e(){"fr"==c?($("#fr").css("font-weight","bold"),$("#en").css("font-weight","normal"),$("#CV").attr("href","/content/CV%20-%20Guillaume%20Jounel.pdf")):($("#fr").css("font-weight","normal"),$("#en").css("font-weight","bold"),$("#CV").attr("href","/content/Resume%20-%20Guillaume%20Jounel.pdf")),$.getJSON("/content/general.json",function(b){$.each(b,function(b,d){$(b).fadeOut(a,function(){$(this).html(d[c])}).fadeIn()})}),$.getJSON("/content/articles.json",function(a){$.each(a,function(a,b){$("#content article#"+a).animate({opacity:0},200,function(){$("#content article#"+a+" h3").html(b[c].title+"<span class='delete' style='display:block'>X</span>"),$("#content article#"+a+" div.text p").html(b[c].resume),$("#content article#"+a+" div.keywords").empty();for(var d=0;d<b[c].keywords.length;d++)$("article#"+a+" div.keywords").append("<span>"+b[c].keywords[d]+"</span>")}).animate({opacity:.8},200)})})}function f(a){c=a,e()}$("body").css("background","white"),$("#content article h3 span.delete").css("display","block");var a=300,b=window.location.toString().split("/"),c="bold"==$("#en").css("font-weight")?"en":"fr";b.length<4&&d(),$("#language span").click(function(){return id=$(this).attr("id"),f(id),history.pushState("",document.title,"/"),window.history.pushState("",document.title,id),!1}),$("#back").on("click",this,function(){return $("#viewer").css("display","none"),history.pushState("",document.title,"/"),window.history.pushState(document.title,document.title,c),!1});var g=!1;$("#viewer").on("click","article",function(){g=!0}).on("click",this,function(){g||$(this).css("display","none"),history.pushState("",document.title,"/"),window.history.pushState(document.title,document.title,c),g=!1}),g=!1,$("#content article").on("click","h3 span.delete",function(){g=!0}).on("click",this,function(){if(g)return $(this).css("display","none"),g=!1,!1;var a=$(this).attr("id");return $.getJSON("/content/articles.json",function(b){return $("#viewer article h3").html(b[a][c].title),$("#viewer article div.text p").html(b[a][c].content),$("#viewer").css("display","block"),$("#viewer article div.keywords").empty(),$.each(b[a][c].keywords,function(a,b){$("#viewer article div.keywords").append("<span>"+b+"</span>")}),history.pushState("",document.title,"/"),window.history.pushState(document.title,document.title,c+"/"+a+"/"+b[a].image),!1}),!1}).on("mouseenter",this,function(){$(this).css("opacity",1)}).on("mouseleave",this,function(){$(this).css("opacity",.8)})});
