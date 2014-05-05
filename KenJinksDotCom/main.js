/* 
Ken Jinks
April 17 2014
This file contains the javascript used to begin the kenjinks.com experience.
 */

//function      :placeLogo(yOffset)
//parameters    :yOffset - the y translation of the logo
//description   :This function scales and displays the logo then it sets a 
//              :timeout to redisplay the logo with a new Y offset until the
//              :logo reaches the top.
function placeLogo(yOffset)
{
    var widthOfLogo = 100;
    var heightOfLogo = 18;
    var scale = window.innerWidth / (widthOfLogo * 1.5);
    var transX = (window.innerWidth - (scale * widthOfLogo)) / 2;
    var transY = (window.innerHeight - (scale * heightOfLogo)) / 2 + yOffset;
    var kenJinksLogo = document.getElementById("KEN_JINKS");
    
    kenJinksLogo.setAttribute("transform", "translate(" + transX + "," +transY+ ") scale("+scale+")");
    kenJinksLogo.setAttribute("opacity", "100");
    
    if (transY > (scale * 5))
    {
        var rate = (scale * 5);
        setTimeout("placeLogo("+ (yOffset - rate) + ");", 33);
    }
}

//function      :placeMenu()
//description   :This function scales and places the SVG menu in the browser.
function placeMenu()
{
    var widthOfMenu = 100;
    var heightOfMenu = 50;
    var scale = window.innerWidth / (widthOfMenu * 2);
    var transX = (window.innerWidth - (scale * widthOfMenu)) / 2;
    var transY = (window.innerWidth * -0.05); 
    var menu = document.getElementById("menuGroup");
    
    menu.setAttribute("transform", "translate(" + transX + "," +transY+ ") scale("+scale+")");
    menu.setAttribute("style", "opacity:50;");    
}


function wigglePrompt(frame)
{
    var now = new Date().getTime();
    
    var radius = 0.5;
    
    var yOffset = (Math.sin(now / 500) * radius) - 20;
    var xOffset = (Math.cos(now / 500) * radius);
    var prompt = document.getElementById("prompt");
    
    if (typeof(wigglePrompt.last) === 'undefined')
    {
        wigglePrompt.last = now;
    }
    
    if (prompt !== false)
    { 
        //alert("("+yOffset + "," + xOffset+")");
        prompt.setAttribute("style", "top:"+(yOffset)+"%; left:"+(xOffset)+"%;");
        wigglePrompt.timeOut = setTimeout("wigglePrompt("+(frame+1)+");", 33);
        //wigglePrompt.killTimeOut = setTimeout("clearTimeout(wigglePrompt.timeout);", 1000);
    }

    wigglePrompt.last = now;
}


//function      :menuHomeClick()
//description   :This function makes an XMLHttp request to fileServer.php to 
//              :get the content of the mainPanel. Each succesive click iterates
//              :through the content available in the fileServer.
function menuHomeClick()
{
    var mainPanel = document.getElementById("mainPanel");
    var xmlHttp;
    var galleryText = document.getElementById("galleryText");
    
    //currently there is a bug that is showing up on the go daddy side
    //where the ajax call to normally get this content is giving a 500
    //internel error
    var textFill = "<p><em>Welcome!</em><br>My name is Ken Jinks, ";
    textFill += "I have been creative in many pursuits over the years, drawing, ";
    textFill += "painting, cooking, music and coding. This is my first website, ";
    textFill += "it has been carefully crafted using, PHP, Javascript and HTML. <br>";
    textFill += "What you will find in the gallery are a collection of my procedural artwork. All ";
    textFill += "the images are created live using code and no source images are used. Click the image to ";
    textFill += "draw it again. I hope you enjoy.<br><br>";
    textFill += "This site is best viewed with a minimum resolution of 1280x720. Your mobile device may ";
    textFill += "have trouble navigating the site.<br><br>";
    textFill += "Here is a <a href='storm.html'>storm</a> created with procedural techniques. You can ";
    textFill += "can witness how recursion, alpha masking, particle systems, and simplex noise can generate ";
    textFill += "an entire complex scene with only 60 kilobytes of code.<br><br>";
    textFill += "You can view the source to learn how this is done. Inside of the source code I ";
    textFill += "have explained in detail how these effects are possible in your browser.<br><br>";
    textFill += "Enjoy!<br>";
    textFill += "-Ken Jinks</p>";

    
    galleryText.innerHTML = "Gallery";
    mainPanel.innerHTML = textFill;
    
    /*
    if (typeof(menuHomeClick.page) === 'undefined')
    {
        menuHomeClick.page = 0;
    }
    else
    {
        menuHomeClick.page++;
    }

    if (window.XMLHttpRequest)
    {
        xmlHttp = new XMLHttpRequest();
        
    }
    else 
    {
        //code for ie5 ie6
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlHttp.onreadystatechange = function()
    {
        
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            mainPanel.innerHTML = xmlHttp.responseText;
        }
    };
    
    xmlHttp.open("GET","bob.php?category=home&index="+menuHomeClick.page,true);
    xmlHttp.send();  
    */
}

function menuGalleryClick()
{
    var mainPanel = document.getElementById("mainPanel");
    var canvas = document.createElement("canvas");
    var prompt = document.createElement("p");
    var context = canvas.getContext("2d");
    var galleryText = document.getElementById("galleryText");
    
    var doodler = [tartanDemo,
                   fractalDemo, 
                   noiseDemo, 
                   drawScene, 
                   woodDemo,
                   cloudDemo,
                   vedasDemo,
                   brickDemo,
                   abstractDemo];
    var titles = ["I love a good plaid shirt",
                  "Red Fractal", 
                  "Noise Rainbow", 
                  "Trees at night", 
                  "Exotic wood",
                  "Water, Mountains and Sky",
                  "Vedas Fractal",
                  "Bricks",
                  "Freckles, Moles and Varicose Veins"];
    
    //page count
    if (typeof(menuGalleryClick.page) === 'undefined')
    {
        menuGalleryClick.page = 0;
    }
    else
    {
        menuGalleryClick.page++;
        menuGalleryClick.page %= doodler.length; 
    }   
    
    //create the prompt
    prompt.innerHTML = "Click next for a new image, click image to redraw.<br>"
            +"Title: "+ titles[menuGalleryClick.page];
    prompt.setAttribute("class", "prompt");
    prompt.setAttribute("id", "prompt");
    
    
    //create the canvas
    canvas.width = 800;
    canvas.height = 400;
    
    canvas.setAttribute("position", "relative");
    canvas.setAttribute("class", "center");
    canvas.setAttribute("style", "cursor:pointer;");
    canvas.setAttribute("onclick", "menuGalleryClick.redraw();");
    
    //remove children from main panel
    mainPanel.innerHTML = "";
    
    //change gallery text to read next
    galleryText.innerHTML = "Next";
    
    //put the new prompt and canvas into the mainPanel
    mainPanel.appendChild(prompt);
    mainPanel.appendChild(canvas);
    
    menuGalleryClick.redraw = function()
    {
        doodler[menuGalleryClick.page](context);
    };
    
    canvas.setAttribute("style", "cursor:wait;");
    menuGalleryClick.redraw();
    canvas.setAttribute("style", "cursor:pointer;");
     
    wigglePrompt(0);
}

//function      :menuContactClick()
//description   :This function makes an XMLHttp request to fileServer.php to 
//              :get the content of the mainPanel. Each succesive click iterates
//              :through the content available in the fileServer.
function menuContactClick()
{
    var mainPanel = document.getElementById("mainPanel");
    var xmlHttp;
    var galleryText = document.getElementById("galleryText");
    var textFill = "<p style='text-align: center'>";
    textFill += "Thank you for visiting my site, please feel free to contact me at ";
    textFill += "<a href='mailto:ken.jinks@gmail.com?subject=Your%20website%20rocks!'>ken.jinks@gmail.com</a><br>\n\
 Or see more of my traditional art at <a href='http://kenjinks.deviantart.com'>DeviantArt</a></p>";
  
    //return gallery text to say Gallery
    galleryText.innerHTML = "Gallery";
    mainPanel.innerHTML = textFill;
    
    /*
    if (typeof(menuContactClick.page) === 'undefined')
    {
        menuContactClick.page = 0;
    }
    else
    {
        menuContactClick.page++;
    }
    
    if (window.XMLHttpRequest)
    {
        xmlHttp = new XMLHttpRequest();
        
    }
    else 
    {
        //code for ie5 ie6
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlHttp.onreadystatechange = function()
    {
        
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            mainPanel.innerHTML = xmlHttp.responseText;
        }
    };
    
    xmlHttp.open("GET","bob.php?category=contact&index="+menuContactClick.page,true);
    xmlHttp.send();  
    */
}

function startUp()
{
    placeLogo(0);
    placeMenu();
    menuHomeClick();    
    
}