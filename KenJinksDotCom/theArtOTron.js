//FILE           :theArtOTron.js                                             
//PROJECT        :The Art-O-Tron                                        
//PROGRAMMER     :Kenneth Jinks                                              
//FIRST VERSION  :September 2013                                                 
//DESCRIPTION    :This is a collection of functions the create art procedureally,
//they all use a canvas element with pixel dimensions 800x400.
function trimZero(number)
{
    var retValue = number;
    
    if (number < 0)
    {
        retValue = 0;
    }
    
    return retValue;
}

function Colour()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;    
    
    this.SetHSLA = function(h, s, l, a)
    {
        var third = (Math.PI * 2) / 3;
        
        var r1 = Math.sin(h) * l;
        var g1 = Math.sin(h + third) * l;
        var b1 = Math.sin(h + third * 2) * 1;
        
        var average = (r1 + g1 + b1) / 3;
        
        var r2 = ((r1 - average) * s) + average;
        var g2 = ((g1 - average) * s) + average;
        var b2 = ((b1 - average) * s) + average;
        
        this.r = Math.floor(r2 * 255);
        this.g = Math.floor(g2 * 255);
        this.b = Math.floor(b2 * 255);
        this.a = a * 255;
    };
}

function Col()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;    
    
    this.SetHSLA = function(h, s, l, a)
    {
        var third = (Math.PI * 2) / 3;
        
        var r1 = (Math.cos(h) + 1) * l;
        var g1 = (Math.cos(h + third) + 1) * l;
        var b1 = (Math.cos(h + third * 2) + 1) * 1;
        
        var average = (r1 + g1 + b1) / 3;
        
        var r2 = ((r1 - average) * s) + average;
        var g2 = ((g1 - average) * s) + average;
        var b2 = ((b1 - average) * s) + average;
        
        this.r = Math.floor(r2 * 255);
        this.g = Math.floor(g2 * 255);
        this.b = Math.floor(b2 * 255);
        this.a = a * 255;
    };
}

function setPixel(imageData, x, y, r, g, b, a) 
{
    var index = (x + y * imageData.width) * 4;
    
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getPixel(imageData, x, y)
{
    var cleanX = x;
    var cleanY = y;
    
    if (x < 0)
    {
        cleanX = 0;
    }
    if (x >= imageData.width)
    {
        cleanX = imageData.width - 1;
    }
    if (y < 0)
    {
        cleanY = 0;
    }
    if (y >= imageData.height)
    {
        cleanY = imageData.height - 1;
    }
    var index = (cleanX + cleanY * imageData.width) * 4; 
    var colour = new Colour;
    
    colour.r = imageData.data[index+0];
    colour.g = imageData.data[index+1];
    colour.b = imageData.data[index+2];
    colour.a = imageData.data[index+3];
    
    return (colour);
}

/*
DATE        :April 21 2014
FUNCTION    :function raspDemo(context)
DESCRIPTION :This function draws a random assortment of raspberries.
PARAMETERS  : 
INPUT       :context - the canvas context
OUTPUT      :
RETURNS     :
 */
function raspDemo(context)
{
    function pod()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    
    function raspberry()
    {
        //the open of the raspberry has 17 or so seed pods around it
        this.openCount = Math.floor(Math.random() * 5) + 15;
        this.podDiameter = Math.random() * 10 + 5;
        this.podOverlap = Math.random() * (this.podDiameter * 0.2);//0-20%
        
    }
}


/*
DATE        :April 21 2014
FUNCTION    :function tartanDemo(tartanContext)
DESCRIPTION :This function draws a random tartan pattern with arbitrary stripe width
            :and colours.
PARAMETERS  : 
INPUT       :tartanContext - the canvas context
OUTPUT      :
RETURNS     :
 */
function marbleDemo(context)
{
    var width = 800;//context.canvas.clientWidth;
    var height = 800;//context.canvas.clientHeight;
    
    var imageData = context.createImageData(width, height);
    var simplex = new SimplexNoise();
    
    var marble = {
                 "numColours"       : Math.floor(Math.random() * 5) + 5,                 
                 "scale"            : (Math.random() * 4) + 0.1, //width of vein
                 "hue"              : Math.random() * Math.PI * 2, 
                 "palette"          : Math.floor(Math.random() * 3) //predefined palletes calculated from hue
                 };
    
    var palette = new Array();

    //generate palette
    //the palette is trichromatic, two hues are picked equadistance
    //from the main hue, then arbitrary saturation and luminance is applied
    
    //theta is the range the hue can vary in the palette
    var theta = simplex.noise3D(marble.numColours, marble.palette, marble.hue) * (Math.PI / 4) + (Math.PI / 2);
    
    for (var c = 0; c < marble.numColours; c ++)     
    {
        var col = new Col();
        var hue = marble.hue;
        var saturation = 1.0;
        var luminance = 1.0;
        
        switch (c % 5)
        {
            case (0):
                hue += 0;
                saturation *= 1.0;
                luminance *= 1.0;
                break;
            case (1):
                hue += theta;
                saturation *= 1.0;
                luminance *= 1.0;
                break;
            case (2):
                hue -= theta;
                saturation *= 1.0;
                luminance *= 1.0;             
                break;
            case (3):
                hue += 0;
                saturation *= 0.5;
                luminance *= 2.0;             
                break;
            case (4):
                hue += theta;
                saturation *= 1.0;
                luminance *= 0.5;             
                break;
            case (5):
                hue -= theta;
                saturation *= 1.0;
                luminance *= 0.5;             
                break;
            default:
                hue += 0;
                saturation *= 0;
                luminance *= 0;
                break;
        }
        
        col.SetHSLA(hue, saturation, luminance, 1);
        palette.push(col);
    }

    var warpAmount = Math.random() * 200 + 10;
    
    var unitVein = [Math.random() * 200 + 10, 
        Math.random() * 20 + 1,
        Math.random() * 20 + 1,
        Math.random() * 20 + 1,
        Math.random() * 20 + 1,
        Math.random() * 20 + 1
    ];
    
    for (var x = 0; x < width; x ++)
    {
        for (var y = 0; y < height; y++)
        {
            
            var warpX = x + (simplex.noise3D(x / 8000, y / 2000, 0 + v * 10) +
                            simplex.noise3D(x / 100, y / 50, 10+ v * 10) +
                            simplex.noise3D(x / 500, y / 50, 20+ v * 10)) * 
                            warpAmount;
            var warpY = y + (simplex.noise3D(x / 8000, y / 2000, 50+ v * 10) +
                            simplex.noise3D(x / 100, y / 50, 60+ v * 10) +
                            simplex.noise3D(x / 500, y / 50, 70+ v * 10)) * 
                            warpAmount;
            
            
            var veinMask = 0;
            var veinMaskNoise = 0;
            
            var veinColour = palette[0];
            var delta = new Col();
            
            var red = 0;
            var green = 0;
            var blue = 0;
            var alpha = 255;
            
            for (var v = 0; v < unitVein.length; v++)
            {
                veinMaskNoise = simplex.noise3D(warpX / (200 * marble.scale),  warpY / (400 * marble.scale),  100 + v * 100);
                                

                veinMask = ((veinMaskNoise > - (1/unitVein[v]))&&
                              (veinMaskNoise < (1/unitVein[v])) === 
                              true ? 0 : 1);
                
                delta.r |= veinMask[v];
                delta.g |= veinMask[v];
                delta.b |= veinMask[v];
            }
            
            veinColour.r *= delta.r;
            veinColour.g *= delta.g;
            veinColour.b *= delta.b;
            
            red = veinColour.r;
            green = veinColour.g;
            blue = veinColour.b;
            
            setPixel(imageData, x, y, red, green, blue, alpha);
        }
    }
    
    context.putImageData(imageData, 0, 0);
}

/*
DATE        :April 21 2014
FUNCTION    :function tartanDemo(tartanContext)
DESCRIPTION :This function draws a random tartan pattern with arbitrary stripe width
            :and colours.
PARAMETERS  : 
INPUT       :tartanContext - the canvas context
OUTPUT      :
RETURNS     :
 */
function tartanDemo(context)
{
    var width = 800;//context.canvas.clientWidth;
    var height = 400;//context.canvas.clientHeight;
    
    var imageData = context.createImageData(width, height);
    var simplex = new SimplexNoise();
    
    var tartan = {
                 "numColours"       : Math.floor(Math.random() * 5) + 5,
                 "totalStripeWidth" : Math.floor(Math.random() * 100) + 50, //sum of stripes pixel width
                 "scale"            : (Math.random() * 2) + 1, //thread width, thread is one unit
                 "hue"              : Math.random() * Math.PI * 2, 
                 "palette"          : Math.floor(Math.random() * 3) //predefined palletes calculated from hue
                 };
    
    var stripes = new Array();
    var palette = new Array();
    
    //determine the stripe widths
    //give random numbers, sum the numbers 
    var firstSum = 0;
    
    for (var c = 0; c < tartan.numColours; c ++)
    {
        var stripeWidth = Math.random();
        
        firstSum += stripeWidth;
        
        stripes.push(stripeWidth);
    }
    //then scale to required total width
    for (var c = 0; c < tartan.numColours; c ++)    
    {
        stripes[c] = (stripes[c] / firstSum) * tartan.totalStripeWidth;
    }
    
    //generate palette
    //the palette is trichromatic, two hues are picked equadistance
    //from the main hue, then arbitrary saturation and luminance is applied
    
    //theta is the range the hue can vary in the palette
    var theta = simplex.noise3D(tartan.numColours, tartan.palette, tartan.hue) * (Math.PI / 2);
    
    for (var c = 0; c < tartan.numColours; c ++)    
    {
        var col = new Col();
        var hue = tartan.hue;
        var saturation = 1.0;
        var luminance = 0.5;
        
        switch (c % 5)
        {
            case (0):
                hue += 0;
                saturation *= 1.0;
                luminance *= 1.0;
                break;
            case (1):
                hue += theta;
                saturation *= 1.0;
                luminance *= 1.0;
                break;
            case (2):
                hue -= theta;
                saturation *= 1.0;
                luminance *= 1.0;             
                break;
            case (3):
                hue += 0;
                saturation *= 0.5;
                luminance *= 0.25;             
                break;
            case (4):
                hue += theta;
                saturation *= 1.0;
                luminance *= 0.5;             
                break;
            case (5):
                hue -= theta;
                saturation *= 1.0;
                luminance *= 0.5;             
                break;
            default:
                hue += 0;
                saturation *= 0;
                luminance *= 0;
                break;
        }
        
        col.SetHSLA(hue, saturation, luminance, 1);
        palette.push(col);
    }
    
    for (var x = 0; x < width; x ++)
    {
        for (var y = 0; y < height; y++)
        {
            //construct horizontal stripes
            var xWarp = x + simplex.noise3D(x / 200, y / 200, 100) * 10; //used to displace the x-axis
            var horIndex = xWarp % (tartan.totalStripeWidth * tartan.scale);
            var horColour = new Col();
            //find out which pallete index we are on
            var paletteIndex = 0;
            var cursor = 0;

            while (horIndex > cursor)
            {
                cursor += stripes[paletteIndex];
                paletteIndex += 1;
            } 

            horColour = palette[paletteIndex % tartan.numColours];
            
            //construct the vertical stripes
            var yWarp = y + simplex.noise3D(x / 200, y / 200, 200) * 10;//used to displace the y axis
            var verIndex = yWarp % (tartan.totalStripeWidth * tartan.scale);
            var verColour = new Col();
            //find out which pallete index we are on
            var paletteIndex = 0;
            var cursor = 0;

            while (verIndex > cursor)
            {
                cursor += stripes[paletteIndex];
                paletteIndex += 1;
            } 

            verColour = palette[paletteIndex % tartan.numColours];
            
            //construct the shadowing and texture
            var shadow = new Col();
            var texture = new Col();
            
            texture.r = simplex.noise3D(xWarp / 0.1, yWarp / 0.5, 300) *
                        64;
            texture.g = texture.r;
            texture.b = texture.r;
            
            shadow.r = simplex.noise3D(x / 200, y / 200, 200) * 64;
            shadow.g = shadow.r;
            shadow.b = shadow.r;
            
            if ( (xWarp + yWarp) % 8 <= 3)
            {
                setPixel(imageData, x, y, verColour.r + shadow.r + texture.r, verColour.g + shadow.g + texture.g, verColour.b + shadow.b + texture.b, verColour.a);
            }
            else
            {
                setPixel(imageData, x, y, horColour.r + shadow.r+ texture.r, horColour.g + shadow.g + texture.g, horColour.b + shadow.b + texture.b, horColour.a);
            }
        }
        
    }
    
    context.putImageData(imageData, 0, 0);
}

/*
FUNCTION    :function drawScene(landContext) 
DESCRIPTION :This function draws three trees on a hill with some stars in the sky. 
PARAMETERS  : 
INPUT       :landContext - the canvas context
OUTPUT      :
RETURNS     :
*/
function drawScene(landContext)
{
    //draw background gradient
    var gradient = landContext.createRadialGradient(0,0,10, 0,0,800);
    gradient.addColorStop(0, "#003344");
    gradient.addColorStop(1, "#0088ff");
    landContext.rect(0,0,800,400);
    landContext.fillStyle=gradient;
    landContext.fill();

    //apply stars to the sky
    var sky = new Object;
    sky.width = 800;
    sky.height = 400;
    sky.numStars = 50;

    drawSky(sky, landContext);

    //draw a tree on the left
    var branch = new Branch;

    branch.x = 175 + (Math.random() * 50);
    branch.y = 400;
    branch.angle = (Math.PI / 2.0) + Math.random() - 0.5;
    branch.length = 50.0;
    branch.width = 10;
    branch.depth = 8;

    landContext.strokeStyle="#002244";
    drawBranch(branch, landContext)

    //draw a tree on the right
    branch.x = 575 + (Math.random() * 50);
    branch.y = 350;
    branch.angle = (Math.PI / 2.0) + Math.random() - 0.5;
    branch.length = 50.0;
    branch.width = 8;
    branch.depth = 8;

    landContext.strokeStyle="#002244";
    drawBranch(branch, landContext)

    //draw the land area
    var land = new Object;
    land.startx = 0.0;
    land.starty = 400.0;
    land.endx = 800.0;
    land.rise = (300.0 - land.starty) / land.endx;

    //draw the foreground tree
    branch.x = 375 +  (Math.random() * 50);
    branch.y = 375;
    branch.angle = (Math.PI / 2.0) + Math.random() - 0.5;
    branch.length = 70.0;
    branch.width = 15;
    branch.depth = 8;
    landContext.strokeStyle="#000000";
    drawBranch(branch, landContext)  

    drawLand(land, landContext);
}

/*
CLASS       :Branch
DESCRIPTION :This branch class is used to pass information to drawBranch. 
*/
function Branch()
{
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.length = 0;
    this.width = 0;
    this.depth = 0;
}

/*
FUNCTION    :function drawBranch(branch, context) 
DESCRIPTION :This is a recursive function that draws a tree.
PARAMETERS  : 
INPUT       :branch - the information that describes the tree
            :context - the canvas context
OUTPUT      :
RETURNS     :
*/
function drawBranch(branch, context)
{
    var endX = (Math.cos(branch.angle) * branch.length) + branch.x;
    var endY = branch.y -(Math.sin(branch.angle) * branch.length);

    context.beginPath();
    context.moveTo(branch.x, branch.y);
    context.lineTo(endX, endY);
    context.lineWidth = branch.width;

    context.stroke();
    
    //control depth of recursion
    if (branch.depth > 0.0)
    {
        var newBranch = new Branch;

        newBranch.length = branch.length * 0.8;
        newBranch.width = branch.width * 0.6;
        newBranch.x = endX;
        newBranch.y = endY;
        newBranch.depth = branch.depth - 1;
        
        //decide on how many branches to make
        var numBranch = Math.random() * 6 + 1;
        
        //have a random chance of not branching
        if (Math.random() < 0.7)
        {
            numBranch = 1;
        }
        //ensure branching at start to prevent charlie brown trees
        if (branch.depth > 5)
        {
            numBranch = Math.random() * 4 + 1;
        }
        
        //create branches
        for (var i = 0; i < numBranch; i++)
        {
            var angleChange = (Math.random() * (Math.PI/2.0)) - (Math.PI / 4.0);
            newBranch.angle = branch.angle + angleChange;
            drawBranch(newBranch, context);
        }

    }

}

/*
FUNCTION    :function drawLand(land, context) 
DESCRIPTION :This function draws a dark hill with grass.
PARAMETERS  : 
INPUT       :land - the information to draw the land
            :context - the canvas context
OUTPUT      :
RETURNS     :
*/
function drawLand(land, context)
{
    //draw hill
    context.beginPath();
    context.moveTo(land.startx, land.starty)
    context.lineWidth = 5;
    
    for(var i = land.startx; i < land.endx; i++)
    {
        //trace the curve of the hill, notice the sinusoid
        var yPos = (i * land.rise) + land.starty + (Math.random() * 10)
        + (Math.sin(i / 100) * 20);
        context.lineTo(i, yPos);
    }
    
    context.lineTo(land.endx, land.starty);
    context.closePath();
    context.fillStyle = "#000000";
    context.strokeStyle = "#000000";
    context.fill();
    context.stroke();
    
    //draw the grasss
    var gradient = context.createRadialGradient(400,400,10, 400,400,800);
    gradient.addColorStop(0, "#0f0812");
    gradient.addColorStop(1, "#000418");  

    context.lineWidth = 2;
    for(var i = land.startx; i < land.endx; i++)
    {
        var yMax = (i * land.rise) + land.starty + (Math.random() * 10)
        + (Math.sin(i / 100) * 20);
        //randomly place blades of grass
        for(var grass = 0; grass < Math.random()*20; grass++)
        {
            var yPos = Math.random() * 100;
            context.beginPath();
            context.moveTo(i, yMax + yPos);
            context.lineTo(i + (Math.random() * 5), yMax + yPos + (Math.random() * 5));
            context.strokeStyle = gradient;
            context.stroke();
        }
    }
}

/*
FUNCTION    :function drawSky(sky, context) 
DESCRIPTION :This function draws a dusk sky with a few stars. 
PARAMETERS  : 
INPUT       :sky - the information to draw the sky
            :context - the canvas context
OUTPUT      :
RETURNS     :
*/
function drawSky(sky, context)
{
    //background gradient
    var gradient = context.createRadialGradient(0,0,10, 0,0,800);
    gradient.addColorStop(0, "#ffee88");
    gradient.addColorStop(1, "#0088ff");

    context.lineWidth = 2;
    context.strokeStyle = gradient;
    
    //draw stars
    for(var i = 0; i < sky.numStars; i++)
    {
        var randX = Math.random() * sky.width;
        var randY = Math.random() * sky.height;

        context.beginPath();
        context.moveTo(randX, randY);
        context.lineTo(randX + 1, randY + 1);
        context.stroke();
    }
}

function drawFractal_01(fractal, context)
{
    for (var branch = 0; branch < fractal.numBranch; branch++)
    {
        var nextX = fractal.x + (Math.cos(fractal.angleStart + 
            (fractal.angleStep * branch)) * fractal.unitLength);
        var nextY = fractal.y - (Math.sin(fractal.angleStart + 
            (fractal.angleStep * branch))  * fractal.unitLength);

        context.beginPath();
        context.moveTo(fractal.x, fractal.y);
        context.lineTo(nextX, nextY);
        context.lineWidth = fractal.branchWidth;
        context.stroke();
        
        if (fractal.depth > 0)
        {
            var newFractal = new Object;
            //fractal origin
            newFractal.x = nextX;
            newFractal.y = nextY;
            newFractal.numBranch = fractal.numBranch;
            newFractal.branchWidth = fractal.branchWidth * 
                                               fractal.branchAttenuate;
            newFractal.branchAttenuate = fractal.branchAttenuate;
            newFractal.angleStart = fractal.angleStart + fractal.angleStep;
            newFractal.angleStep = fractal.angleStep;
            newFractal.unitLength = fractal.unitLength * fractal.unitAttenuate;
            //for each generation if less than unity(1) decay 
            //fractal unit length, if greater than 1
            //embiggen fractal unit length
            newFractal.unitAttenuate = fractal.unitAttenuate;

            newFractal.depth = fractal.depth - 1.0;
            
            drawFractal_01(newFractal, context);
        }
    }
}
function drawFractal_02(fractal, context)
{
    for (var branch = 0; branch < fractal.numBranch; branch++)
    {
        var nextX = fractal.x + (Math.cos(fractal.angleStart + 
            (fractal.angleStep * branch)) * fractal.unitLength);
        var nextY = fractal.y - (Math.sin(fractal.angleStart + 
            (fractal.angleStep * branch))  * fractal.unitLength);

        //context.beginPath();
        //context.moveTo(fractal.x, fractal.y);
        //context.lineTo(nextX, nextY);
        //context.lineWidth = fractal.branchWidth;
        //context.stroke();
        
        context.lineWidth = fractal.branchWidth;
        context.lineStyle="#000000";
        drawEllipseByCenter(context, nextX, nextY, 
                            fractal.unitLength, 
                            fractal.unitLength);
        
        if (fractal.depth > 0)
        {
            var newFractal = new Object;
            //fractal origin
            newFractal.x = nextX;
            newFractal.y = nextY;
            newFractal.numBranch = fractal.numBranch;
            newFractal.branchWidth = fractal.branchWidth * 
                                               fractal.branchAttenuate;
            newFractal.branchAttenuate = fractal.branchAttenuate;
            newFractal.angleStart = fractal.angleStart + fractal.angleStep;
            newFractal.angleStep = fractal.angleStep;
            newFractal.unitLength = fractal.unitLength * fractal.unitAttenuate;
            //for each generation if less than unity(1) decay 
            //fractal unit length, if greater than 1
            //embiggen fractal unit length
            newFractal.unitAttenuate = fractal.unitAttenuate;

            newFractal.depth = fractal.depth - 1.0;
            
            drawFractal_02(newFractal, context);
        }
    }
}
function fractalDemo(landContext)
{
    var fractal = new Object;
    //fractal origin
    fractal.x = 400.0;
    fractal.y = 200.0;
    fractal.numBranch = (Math.round(Math.random() * 4.0)) + 2.0;
    fractal.branchWidth = 10.0;
    fractal.branchAttenuate = Math.random();
    fractal.angleStart = Math.PI * Math.random() * 2.0;
    fractal.angleStep = (Math.PI * 2.0) / fractal.numBranch;
    fractal.unitLength = (Math.random() * 300.0) + 100.0;
    //for each generation if less than unity(1) decay 
    //fractal unit length, if greater than 1
    //embiggen fractal unit length
    fractal.unitAttenuate = Math.random() * 2.0;
    fractal.depth = 4;
    if (fractal.numBranch > 4)
    {
        fractal.depth = 2;
    }

    var gradient1 = landContext.createRadialGradient(0,0,10, 0,0,800);
    gradient1.addColorStop(0, "#8800ff");
    gradient1.addColorStop(1, "#ff0000");
    landContext.rect(0,0,800,400);
    landContext.fillStyle=gradient1;
    landContext.fill();

    var gradient2 = landContext.createRadialGradient(0,0,10, 0,0,800);
    gradient2.addColorStop(0, "#ffff00");
    gradient2.addColorStop(1, "#ff0000");    

    landContext.strokeStyle=gradient2;
    landContext.lineWidth=2;
    drawFractal_01(fractal, landContext);
    drawFractal_02(fractal, landContext);
    
    var gradient3 = landContext.createRadialGradient(0,0,10, 0,0,800);
    gradient3.addColorStop(0, "#ffff88");
    gradient3.addColorStop(1, "#ff8844");

    fractal.branchWidth = 2.0;
    landContext.strokeStyle=gradient3;
    landContext.lineWidth=2;
    drawFractal_01(fractal, landContext);
    drawFractal_02(fractal, landContext);
 }
    


/******************************************************************************
 * found Sept 10/ 2013 at 
 * 'http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas'
 * two functions below drawEllipseByCenter() and drawEllipse()
 * ****************************************************************************
 */

function drawEllipseByCenter(ctx, cx, cy, w, h) {
  drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
}
function drawEllipse(ctx, x, y, w, h) {
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
  ctx.stroke();
}
/****************************************************************************/
/****************************************************************************/

function cloudDemo(context)
{   
    var WATER_LEVEL = 350;
    imageData = context.createImageData(800,400);
    var curvePhase = (Math.random() * Math.PI * 2);
    var simplex = new SimplexNoise();
    // draw random dots
    for (var xp = 0; xp < (800); xp++) 
    {
        for (yp = 0; yp < (400); yp++) 
        {

            x = xp | 0; // |0 to truncate to Int32
            y = yp | 0;
            
            var curveX = x;
            var curveY = y + (Math.sin( (x/200) + curvePhase) * 50)
                            + (Math.sin( (x/80) + curvePhase) * 10);
            var waterX = x;
            var waterY = Math.sin(y/70 + 2)* 30;
            
            noiseValue = trimZero(simplex.noise3D(curveX / 500,curveY / 100, 10) + 
                                  simplex.noise3D(curveX / 500,curveY / 100, 10) +
                                  simplex.noise3D(curveX / 200,curveY / 50,  10) +
                                  simplex.noise3D(curveX / 10, curveY / 10,  10) +
                                  simplex.noise3D(curveX / 500,curveY / 100, 10));

            if (y < WATER_LEVEL)
            {
                //draw the sky
                noiseValue = noiseValue * (trimZero(simplex.noise3D(curveX / 100, curveY / 50, 60) +
                                            simplex.noise3D(curveX / 50,  curveY / 50,  50) +
                                            simplex.noise3D(curveX / 200, curveY / 100, 40) +
                                            simplex.noise3D(curveX / 30,  curveY / 10,  30) +
                                            simplex.noise3D(curveX / 200, curveY / 200, 20) +
                                            simplex.noise3D(curveX / 10, curveY / 10, 15) +
                                            simplex.noise3D(curveX / 20, curveY / 20, 25) +
                                            trimZero(simplex.noise3D(curveX / 100,curveY / 100, 10)) + 
                                            trimZero(simplex.noise3D(curveX / 150,curveY / 150, 70)))/4);

            }
            else
            {
                //draw water
                noiseValue = ( simplex.noise3D(waterX/500, waterY/20, 10) +
                               simplex.noise3D(waterX/100, waterY/5, 30) +
                               simplex.noise3D(waterX/200, waterY, 30) +
                               simplex.noise3D(waterX/50, waterY * 2, 20))/4;
            }
            
            if (y < WATER_LEVEL)
            {
                //colour the sky
                r = noiseValue * 256 + (Math.random() * 20);
                g = noiseValue * 256 + (y/5) + (Math.random() * 20);
                b = (y/2) + noiseValue * 256 + 32 + (Math.random() * 20);
            }
            else
            {
                //colour the water
                r = noiseValue * 256;
                g = noiseValue * 256 + ((y - WATER_LEVEL)*4) ;
                b = (y/4) + noiseValue * 256 + 32 ;
            }
            setPixel(imageData, x, y, r , g , b , 255); // 255 opaque
        }   
    }
    
    
    //blurCanvas(imageData);
    context.putImageData(imageData, 0, 0);
    
    //draw mountain ranges on horizon
    var gradient1 = context.createLinearGradient(400,300, 400,350);
    gradient1.addColorStop(0, "#2288ff");
    gradient1.addColorStop(1, "#002288");
    
    context.strokeStyle = gradient1;
    context.fillStyle = gradient1;
  
    drawHorizon(context, WATER_LEVEL, 40);
    
    var gradient2 = context.createLinearGradient(400,300, 400,370);
    gradient2.addColorStop(0, "#114488");
    gradient2.addColorStop(1, "#002244"); 
    
    context.strokeStyle = gradient2;
    context.fillStyle = gradient2;
    
    drawHorizon(context, WATER_LEVEL, 30);
    
    var gradient3 = context.createLinearGradient(400,300, 400,380);
    gradient3.addColorStop(0, "#000044");
    gradient3.addColorStop(1, "#001111"); 
    
    context.strokeStyle = gradient3;
    context.fillStyle = gradient3;
    
    drawHorizon(context, WATER_LEVEL, 20); 
    
    //draw some trees
    branch = new Branch;
    branch.x = 600 - + Math.random() * 100;
    branch.y = 400;
    branch.angle = (Math.PI / 8) * 3 + (Math.random() * (Math.PI / 4));
    branch.length = 40;
    branch.width = 8;
    branch.depth = 8;
    
    context.strokeStyle = "#001122";
    drawBranch(branch, context);
    
    branch.x = 700 - + Math.random() * 100;
    branch.y = 400;
    branch.angle = (Math.PI / 8) * 3 + (Math.random() * (Math.PI / 4));
    branch.length = 30;
    branch.width = 7;
    branch.depth = 7;
    
    context.strokeStyle = "#001111";
    drawBranch(branch, context);
    
    branch.x = 680- + Math.random() * 100;
    branch.y = 400;
    branch.angle = (Math.PI / 8) * 3 + (Math.random() * (Math.PI / 4));
    branch.length = 50;
    branch.width = 9;
    branch.depth = 8;
    
    context.strokeStyle = "#000000";
    drawBranch(branch, context);
    
    branch.x = 50 + Math.random() * 100;
    branch.y = 400;
    branch.angle = (Math.PI / 8) * 3 + (Math.random() * (Math.PI / 4));
    branch.length = 60;
    branch.width = 12;
    branch.depth = 8;
    
    context.strokeStyle = "#000000";
    drawBranch(branch, context);
}

function drawHorizon(context, horizonY, height)
{
    var simplex = new SimplexNoise();
    
    context.beginPath();
    context.moveTo(800, horizonY);
    context.lineTo(0, horizonY);
    
    for (var x = 0; x < 800; x++)
    {
        context.lineTo(x, horizonY - Math.abs(simplex.noise2D(x / (10 * height),10)*height +
                                              simplex.noise2D(x / (height / 5), 15)*(height/10)));
    }
    context.closePath();
    context.lineWidth = 2;
    context.stroke();
    context.fill();
}

function trimZero(number)
{
    var retValue = number;
    
    if (number < 0)
    {
        retValue = 0;
    }
    
    return retValue;
}

function Colour()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
}

function noiseDemo(context)
{
   imageData = context.createImageData(800,400);
   var simplex = new SimplexNoise();
    // draw random dots
   for (var xp = 0; xp < (800); xp++) 
   {
        for (yp = 0; yp < (400); yp++) 
        {

            x = xp | 0; // |0 to truncate to Int32
            y = yp | 0;
            
            noiseValue = simplex.noise3D(x / 1000,y / 1000, 10);
            
            var colour = new Col();
            var hue = noiseValue * (Math.PI * 2) * 10;
            
            colour.SetHSLA(hue, 1, 0.5, 1);
            
            r = colour.r;
            g = colour.g;
            b = colour.b;
            
            /*
            x = xp | 0; // |0 to truncate to Int32
            y = yp | 0;
            noiseValue = simplex.noise3D(x / 2000,y / 2000, 10) * 40;
            r = (Math.sin(noiseValue) * 128) + 128;
            g = (Math.sin(noiseValue + 2.0944) * 128) + 128;
            b = (Math.sin(noiseValue + 4.1888) * 128) + 128;
            */
            
            setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
        }   
    }
    //blurCanvas(imageData);
    context.putImageData(imageData, 0, 0);
}

function scaleDemo(context)
{
   imageData = context.createImageData(800,400);
   var simplex = new SimplexNoise();
   // draw random dots
   dotThres = (Math.random() * 16.0) - 8.0;
   maskSeperation = Math.random() * 5;
   maskX = Math.random() * 800.0 + 100.0;
   maskY = Math.random() * 800.0 + 100.0;
   maskSize = Math.random() * 5 + 10;
   hue = Math.random() * 2 * Math.PI;
   for (var xp = 0; xp < (800); xp++) 
   {
        for (yp = 0; yp < (400); yp++) 
        {

            xx = xp | 0; // |0 to truncate to Int32
            yy = yp | 0;
            
            brightA = simplex.noise3D(xx/maskX, yy/maskY, 535);
            brightB = simplex.noise3D((xx + 10)/maskX, (yy + 10)/maskY, 535);
            bright = (brightA - brightB) * 16;
            
            
            
            //mask A
            x = xx + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;
            y = yy + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;
            
            grainA = simplex.noise3D(x/100, y/5, 124) +
                     simplex.noise3D(x/50, y/10, 764) +
                     simplex.noise3D(x/25, y/0.5, 124);
             
            grainB = simplex.noise3D(x/5, y/5, 124) +
                     simplex.noise3D(x/2, y/2, 764) +
                     simplex.noise3D(x/0.5, y/0.5, 124);
             
            grainC = trimZero(simplex.noise3D(x/maskSize, y/maskSize, 888)) *
                     (simplex.noise3D(x/10, y/1000, 124) +
                     simplex.noise3D(x/20, y/1000, 764) +
                     simplex.noise3D(x/5, y/1000, 124)); 
             
            partA = Math.sin(x/maskSize) * Math.cos(y/maskSize) * 10;
            
            partA = partA < dotThres ? 1 : 0;
            
            partB = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(1.5*maskSize))/10) * maskSize;
            
            partB = partB < dotThres ? 1 : 0;  
            
            partC = Math.sin(x/maskSize) * Math.cos((y+(3.0* maskSize))/maskSize) * maskSize;
            
            partC = partC < dotThres ? 1 : 0;
            
            partD = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(4.5*maskSize))/maskSize) * maskSize;
            
            partD = partD < dotThres ? 1 : 0;  
            
            maskA = partA + partB + partC + partD;
            
        
            //mask B
            x = xx + maskSeperation + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;;
            y = yy + maskSeperation + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;;
            partA = Math.sin(x/maskSize) * Math.cos(y/maskSize) * 10;
            
            partA = partA < dotThres ? 1 : 0;
            
            partB = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(1.5*maskSize))/maskSize) * maskSize;
            
            partB = partB < dotThres ? 1 : 0;  
            
            partC = Math.sin(x/maskSize) * Math.cos((y+(3.0*maskSize))/maskSize) * maskSize;
            
            partC = partC < dotThres ? 1 : 0;
            
            partD = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(4.5*maskSize))/maskSize) * maskSize;
            
            partD = partD < dotThres ? 1 : 0; 
            
            maskB = partA + partB + partC + partD;
            
              //mask C
            x = xx + maskSeperation + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;;
            y = yy + maskSeperation + simplex.noise3D(xx/maskX, yy/maskY, 535) * 20.0;;
            partA = Math.sin(x/maskSize) * Math.cos((y+10)/maskSize) * 10;
            
            partA = partA < dotThres ? 1 : 0;
            
            partB = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(1.5*maskSize))/maskSize) * maskSize;
            
            partB = partB < dotThres ? 1 : 0;  
            
            partC = Math.sin(x/maskSize) * Math.cos((y+(3.0*maskSize))/maskSize) * maskSize;
            
            partC = partC < dotThres ? 1 : 0;
            
            partD = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(4.5*maskSize))/maskSize) * maskSize;
            
            partD = partD < dotThres ? 1 : 0; 
            
            maskC = partA;// + partB + partC + partD;
            
            
            gradientA = Math.sin((x+(1.5*maskSize))/maskSize) * Math.cos((y+(4.5*maskSize))/maskSize) * maskSize;
            
            lowlight = Math.sin(x/(maskSize/2)) * Math.cos(y/(maskSize/2)) * 100;
            
            lowlight = lowlight > 80 ? grainC * 10 : grainA * 10;
            
            highlight = Math.sin(x/(maskSize)) * Math.cos(y/(maskSize)) * 100;
            
            highlight = highlight < 50 ? 1 : grainB * 4;  
            
            mask = (maskA !== maskB) && (maskA !== maskC)  ? grainA + 1: grainB;
            
            shadowMask = bright < 1 ? grainC * 255: 0;
            
            hueTheta = simplex.noise3D(x/100, y/100, 261)/4 + hue;
            
            noiseR = (simplex.noise3D(x/400, y/100, 723) + 
                    simplex.noise3D(x/100, y/25, 723) + 
                    simplex.noise3D(x/200, y/50, 723) + grainB)/2
                    * Math.sin(hueTheta) * 128 + 128 - shadowMask;
            
            noiseG = (simplex.noise3D(x/400, y/100, 433) + 
                    simplex.noise3D(x/100, y/25, 483) + 
                    simplex.noise3D(x/200, y/50, 123) + grainB)/2 
                    * Math.sin(hueTheta + 2.0944) * 128 + 128 - shadowMask;
            
            noiseB = (simplex.noise3D(x/400, y/100, 333) + 
                    simplex.noise3D(x/100, y/25, 993) + 
                    simplex.noise3D(x/200, y/50, 353) + grainB)/2
                    * Math.sin(hueTheta + 4.1888) * 128 + 128 - shadowMask;
            
            r = mask * 192 + highlight - lowlight - noiseR + bright * 32;
            g = mask * 192.0 + highlight - lowlight - noiseG + bright * 32;
            b = mask * 192 + highlight + lowlight - noiseB + bright * 32;

            setPixel(imageData, xx, yy, r, g, b, 255); // 255 opaque
        }   
    }
    //blurCanvas(imageData);
    context.putImageData(imageData, 0, 0);
}

function abstractDemo(context)
{
   imageData = context.createImageData(800,400);
   var simplex = new SimplexNoise();
     
   var colourChoice = Math.floor(Math.random()*3); 
   var drawHair = Math.random() < 0.5 ? true : false;
    
   for (var xp = 0; xp < (800); xp++) 
   {
        for (yp = 0; yp < (400); yp++) 
        {

            var x = xp | 0; // |0 to truncate to Int32
            var y = yp | 0;
            var curveX = x + simplex.noise3D(x / 200,y / 800, 10) * 50;
            var curveY = y + simplex.noise3D(x / 200,y / 800, 10) * 200;
            
            var curveShadowA = simplex.noise3D(curveX / 200,curveY / 400, 10);
            var curveShadowB = simplex.noise3D((curveX + 70) / 200,(curveY + 200) / 400, 10);
            var curveShadow = (curveShadowA - curveShadowB + 2) * 64;
            
            var  highlights = trimZero(curveShadowA) * 1.3;
            if (highlights < 0.8)
            {
                highlights = 0;
            }
            else
            {
                highlights -= 0.8;
                highlights = highlights < 0 ? 0 : highlights;
                highlights *= 5.0;
            }
            
            var freckleMask = trimZero(simplex.noise3D(curveX / 50, curveY/ 2000, 40));
            var freckleNoise = simplex.noise3D(curveX / 50,curveY / 100, 20) +
                    simplex.noise3D(curveX / 10,curveY / 30, 60);
            
            if (freckleNoise > 1.6)
            {
                //freckleNoise = freckleNoise;
            }
            else
            {
                freckleNoise = 0;
            }
            var freckles = freckleMask * freckleNoise;
            
            var colorVariantR = (trimZero(simplex.noise3D(curveX/380, curveY/390, 123) ) 
                               + trimZero(simplex.noise3D(curveX/100, curveY/500, 123))) * 16;
                       
            var colorVariantB = (trimZero(simplex.noise3D((curveX + 20)/100, (curveY + 20)/500, 123))
                              + trimZero(simplex.noise3D((curveX + 20)/380, (curveY + 20)/390, 123))) * 6;
                      
            var colorVariantG =   trimZero(simplex.noise3D(curveX * 10, curveY * 10, 324) ) 
                               * (trimZero(simplex.noise3D(curveX/5, curveY/5, 165) ) 
                               +  trimZero(simplex.noise3D(curveX/20, curveY/40, 125))) * 4;
            
            var varicoseX = x + (simplex.noise3D(curveX / 50, curveY / 50, 231)
                               + simplex.noise3D(curveX / 300, curveY / 300, 234)
                               + simplex.noise3D(curveX/20, curveY/20, 243)) * 20;
            var varicoseY = y + (simplex.noise3D(curveX / 50, curveY / 50, 431) 
                               + simplex.noise3D(curveX / 300, curveY / 300, 241)
                               + simplex.noise3D(curveX/20, curveY/20, 432)) * 20;
            
            var varicoseA = simplex.noise3D(varicoseX/15, varicoseY/1000, 763)
                         + simplex.noise3D(varicoseX/5, varicoseY/1000, 763);
                 
            if (varicoseA < 1.2)
            {
                varicoseA = 0.0;
            }
            else
            {
                varicoseA = 2.0;
            }
            
            var varicoseB = simplex.noise3D(varicoseX/1000, varicoseY/2, 763)
                         + simplex.noise3D(varicoseX/1000, varicoseY/5, 763);
                 
            if (varicoseB < 1.2)
            {
                varicoseB = 0.0;
            }
            else
            {
                varicoseB = 2.0;
            }           
            
            var varicoseMask = trimZero(simplex.noise3D(curveX/100, curveY/100, 412))
                             
                             * trimZero(simplex.noise3D(curveX/200, curveY/200, 432));
            var varicose = varicoseMask * (varicoseA + varicoseB) * 128;
            
            var hairX = curveX + simplex.noise3D(curveX/50, curveY/50, 876) * 5;
            var hairY = curveY + simplex.noise3D(curveX/50, curveY/50, 878) * 5;
            
            var hairMask = trimZero(simplex.noise3D(curveX/500, curveY/500, 698))
            
            var hair = hairMask * (simplex.noise3D(hairX/40, hairY/4, 587) * simplex.noise3D(hairX/20, (hairY - 2)/2, 587)) * 2.5;
            
            if (hair > 0.1)
            {
                
            }
            else
            {
                hair = 0;
            }
            
            if (!drawHair)
            {
                hair = 0;
            }
            var pores = simplex.noise3D(x / 2,y / 2, 30);
            switch(colourChoice)//colourChoice
            {
            case (0):            
                r = curveShadow + 100 + pores * 64 - freckles * 192 + (highlights * 40) + colorVariantR - varicose;
                g = curveShadow + pores * 16 - freckles * 256 + (highlights * 16) + colorVariantG - varicose * 1.5;
                b = curveShadow / 3 - freckles * 256 + (highlights * 16) + colorVariantB;
                break;
            case (1):            
                r = (curveShadow / 1.5) + (highlights * 40) + pores * 32 - freckles * 192 + colorVariantR - varicose;
                g = (curveShadow / 3)  + (highlights * 16) + pores * 16 - freckles * 256 + colorVariantG - varicose * 1.5; 
                b = (curveShadow / 4) - 50  + (highlights * 16) - freckles * 256 + colorVariantB;
                break;
            case (2):            
                r = curveShadow/2 + 160 + pores * 64 - freckles * 192 + colorVariantR - varicose + (highlights * 30);
                g = curveShadow/2 + 40 + pores * 16 - freckles * 256 + colorVariantG - varicose * 1.5 + (highlights * 40);
                b = curveShadow/2 - 100 + pores * 16 - freckles * 256 + colorVariantB + (highlights * 10);
                break;
            }
            setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
        }   
    }
    blurCanvas(imageData);
    context.putImageData(imageData, 0, 0);
}

function vedasDemo(context)
{
    var NUM_PETALS = Math.floor(Math.random() * 10) + 2;
    var NUM_RINGS = 20;
    var ORIG_X = Math.random() * 800;
    var ORIG_Y = Math.random() * 400;
    
    var gradient = context.createRadialGradient(ORIG_X,ORIG_Y,0, ORIG_X,ORIG_Y,400);
    gradient.addColorStop(0, "#008844");
    gradient.addColorStop(1, "#4400ff"); 
    
    context.rect(0,0,800,400);
    context.fillStyle=gradient;
    context.fill();
    
    var wavyCircle = new WavyCircle();
    wavyCircle.originX       = ORIG_X;
    wavyCircle.originY       = ORIG_Y;
    wavyCircle.invert        = false;
    wavyCircle.numberOfWaves = NUM_PETALS;
    wavyCircle.radius        = 5;
    
    context.strokeStyle ="#ffffff";
    context.lineWidth = 0.5;
    var nextRadius = drawWavyCircle(wavyCircle, context);
    context.fillStyle = "#ffffff";
    context.fill();
    
    
    for (var i = 0; (i < NUM_RINGS) && (nextRadius < 1000) ; i++)
    {
        context.lineWidth = i/NUM_RINGS * 2 + 0.5;
        
        wavyCircle.originX       = ORIG_X;
        wavyCircle.originY       = ORIG_Y;
        wavyCircle.invert        = (i % 2) === 0;
        wavyCircle.numberOfWaves = NUM_PETALS;
        wavyCircle.radius        = nextRadius;   
        
        nextRadius = drawWavyCircle(wavyCircle, context);
    }
}

//a wavy circle is a circle where its radius has been modulated
//over the rotation of the circle by a sinusoid
function WavyCircle()
{
    //the wavy circle will be draw about this point
    this.originX       = 0;
    //the wavy circle will be draw about this point
    this.originY       = 0;
    //this is the mean radius
    this.radius        = 10;
    //when true the sinusoid will change its phase by 180
    //turning crests into valleys and valleys into crests
    this.invert        = false;
    //this is the frequency of the sinusoid cycles per revolution
    //for the render to connect smoothly this must be an integer number
    this.numberOfWaves = 27;
}

function drawWavyCircle(wavyCircle, context)
{
    //the smallest allowed length of one segment in the rendering in pixels
    var smallestLine = 1;//px
    //the maximum number of segments in the total render
    var maxSteps = 1000;
    
    var phase = wavyCircle.invert ? Math.PI : 0.0;
    
    var nextRadius  = wavyCircle.radius * ( (Math.PI / wavyCircle.numberOfWaves) + 1);
    var midRadius   = (wavyCircle.radius + nextRadius) / 2;
    var radiusSwing = (nextRadius - wavyCircle.radius) / 2;
    
    var circum = Math.PI * 2 * wavyCircle.radius;
    var numSteps = Math.floor(circum / smallestLine);
    
    if (numSteps > maxSteps) 
    {
        numSteps = maxSteps;
    }
    
    var angStep = (2 * Math.PI) / numSteps;
    
    //this array will contain all the points to render the wavyCircle
    var wavyPointsX = new Array();
    var wavyPointsY = new Array();
    
    for(var angInc = 0; angInc < numSteps; angInc++)
    {
        var angle = angInc * angStep;
        
        var newRadius = (Math.cos( (angle * wavyCircle.numberOfWaves) + phase)
                                * radiusSwing) + midRadius;
        
        var newX = wavyCircle.originX +
                (Math.cos(angle) * newRadius);
        var newY = wavyCircle.originY +
                (Math.sin(angle) * newRadius);
        
        wavyPointsX[angInc] = newX;
        wavyPointsY[angInc] = newY;    
    }
    
    //render the wavyCircle to the context
    context.beginPath();
    context.moveTo(wavyPointsX[0],wavyPointsY[0]); 
    
    for(var i = 0; i < numSteps; i++)
    {
        context.lineTo(wavyPointsX[i], wavyPointsY[i]);
    }   
    
    context.closePath();
    context.stroke();
    
    return nextRadius;
}

function woodDemo(context)
{
   imageData = context.createImageData(800,400);
   var simplex = new SimplexNoise();
    // draw random dots
   for (var xp = 0; xp < (800); xp++) 
   {
        for (yp = 0; yp < (400); yp++) 
        {

            x = xp | 0; // |0 to truncate to Int32
            y = yp | 0;
            
            //divide the canvas into four boards
            var seed = 0;
            if (y < 100)
            {
                seed = 10;
            }
            else if (y < 200)
            {
                seed = 20;
            }
            else if (y < 300)
            {
                seed = 30;
            }
            else
            {
                seed = 40;
            }
            
            //bend the xy space to create knotty wood
            var curveX = simplex.noise3D(x/200,y/200, 15 + seed) * 20  + x;
            var curveY = simplex.noise3D(x/400,y/200, 25 + seed) * 100 + y;
            
            noiseValue = (trimZero(simplex.noise3D(curveX / 1000,curveY / 5, 20 + seed)) +
                          trimZero(simplex.noise3D(curveX / 20,curveY / 5, 20 + seed)) +
                          trimZero(simplex.noise3D(curveX / 200,curveY / 1, 20 + seed)) +
                          trimZero(simplex.noise3D(curveX / 50,curveY / 5, 20 + seed)))/4;
            
            r = (noiseValue * 192) + 50 + trimZero(simplex.noise3D(curveX/500, curveY/500, seed) * 50)
                                        + trimZero(simplex.noise3D(curveX/500, curveY/50, seed + 10) * 20);
            g = (noiseValue * 128) + 20 + trimZero(simplex.noise3D(curveX/500, curveY/500, seed) * 50) 
                                        + (trimZero(simplex.noise3D(x/500, y/100, seed + 20)) * noiseValue * 30);
            b = noiseValue * 64 + trimZero(simplex.noise3D(curveX/500, curveY/500, seed) * 50);
            
            if ((y === 100)||(y === 200)||(y === 300))
            {
                r = 0;
                g = 0;
                b = 0;
            }
            
            setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
        }   
    }
    
    context.putImageData(imageData, 0, 0);
}

function blurCanvas(imageData)
{
    for (var x = 0; x < imageData.width; x++)
    {
        for (var y = 0; y < imageData.height; y++)
        {
            var newColour = new Colour;
            
            newColour.r = 0.0;
            newColour.g = 0.0;
            newColour.b = 0.0;
            newColour.a = 0.0;
            
            for(var xi = -1; xi <= 1; xi++)
            {
                for(var yi = -1; yi <= 1; yi++)
                {
                    var pixelColour = new Object;
                    pixelColour = getPixel(imageData, x + xi, y + yi);
                    
                    newColour.r += pixelColour.r;
                    newColour.g += pixelColour.g;
                    newColour.b += pixelColour.b;
                    newColour.a += pixelColour.a;
                }
            }
            
            newColour.r /= 9.0;
            newColour.g /= 9.0;
            newColour.b /= 9.0;
            newColour.a /= 9.0;
            
            setPixel(imageData, x, y, newColour.r, newColour.g, newColour.b, newColour.a);
        }
    }
   
}

function brickDemo(context)
{
    imageData = context.createImageData(800,400);
    
    var brick = new Brick();
    drawBrick(brick, imageData);
    
    context.putImageData(imageData, 0, 0);
}

function Brick()
{
    //position and dimension
    this.lowX = 200;
    this.lowY = 200;
    this.hiX  = 260;
    this.hiY  = 220;
    
    //colour
    this.cR   = 128;
    this.cG   = 64 + Math.random()*64;
    this.cB   = 16 + Math.random()*64;
    
    this.cRx = 32;
    this.cGx = 32;
    this.cBx = 32;
}

function drawBrick (brick, imageData)
{
    
    var simplex = new SimplexNoise();
    // draw random dots
    for (var xp = 0; xp < (800); xp++) 
    {
        for (yp = 0; yp < (400); yp++) 
        {

            x = xp | 0; // |0 to truncate to Int32
            y = yp | 0;
            
            var curveX = x + trimZero(simplex.noise3D(x / 100,y / 80, 10) * 10);
            var curveY = y + trimZero(simplex.noise3D(x / 100,y / 80, 10) * 10);
            
            noiseValue = (trimZero(simplex.noise3D(x / 20,y / 20, 10) * 20)
                       + trimZero(simplex.noise3D(x / 10,y / 10, 10) * 10)
                       + trimZero(simplex.noise3D(x / 3,y / 3, 10) * 3)
                       + trimZero(simplex.noise3D(x / 100,y / 80, 10) * 80))/3;
               
            noiseValueShadow = (trimZero(simplex.noise3D((x + 2) / 20,(y + 2) / 20, 10) * 20)
                            + trimZero(simplex.noise3D((x + 2) / 10,(y + 2) / 10, 10) * 10)
                            + trimZero(simplex.noise3D((x + 2) / 3,(y + 2) / 3, 10) * 3)
                            + trimZero(simplex.noise3D((x + 2) / 100,(y + 2) / 80, 10) * 80))/3;
            
            var streaks = trimZero(simplex.noise3D(curveX / 80,curveY / 1000, 10) * 10);
            
            streaks = streaks < 1 ? streaks : 1;
            
            streaks *=   (trimZero(simplex.noise3D(curveX / 50,curveY / 100, 40) * 5)+ 
                          trimZero(simplex.noise3D(curveX / 10,curveY / 1000, 30) * 3));
            
            //horizontal grout and brick face
            if ( (y >300 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(y < 320 + simplex.noise3D(x/10, y/5, 76) * 2))
            {
                var grout = y - (300 + simplex.noise3D(x/2, y/2, 66) * 5
                                     + simplex.noise3D(x/200, y/2, 96) * 5
                                     + simplex.noise3D(x/10, y/5, 86) * 5);
                
                r = 92 + grout * 10 - streaks * 5;
                g = 32 + grout * 10 - streaks * 8;
                b = 16 + grout * 8 - streaks * 8;
            }
            else if ( (y >150 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(y < 170 + simplex.noise3D(x/10, y/5, 76) * 2))
            {
                var grout = y - (150 + simplex.noise3D(x/2, y/2, 66) * 5
                                     + simplex.noise3D(x/200, y/2, 96) * 5
                                     + simplex.noise3D(x/10, y/5, 86) * 5);
                
                r = 92 + grout * 10 - streaks * 5;
                g = 32 + grout * 10 - streaks * 8;
                b = 16 + grout * 8 - streaks * 8;
            }
            else if ( (y >0 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(y < 20 + simplex.noise3D(x/10, y/5, 76) * 2))
            {
                var grout = y - (0 + simplex.noise3D(x/2, y/2, 66) * 5
                                     + simplex.noise3D(x/200, y/2, 96) * 5
                                     + simplex.noise3D(x/10, y/5, 86) * 5);
                
                r = 92 + grout * 10 - streaks * 5;
                g = 32 + grout * 10 - streaks * 8;
                b = 16 + grout * 8 - streaks * 8;
            }
            else
            {
                if ( ( (y >= 170) && (y < 175) )||
                     ( (y >= 20)  && (y < 25)  )||
                     ( (y >= 320) && (y < 325)))
                {
                    //brick highlight
                    r = brick.cR - ((noiseValue - noiseValueShadow) * 10) 
                            - (simplex.noise3D(x/1000, y/1000, 30)
                            * (simplex.noise3D(x/500, y/500, 30)) * brick.cRx)
                            - streaks * 8 + Math.abs(simplex.noise3D(x/500, y/5, 20) * 255);

                    g = brick.cG - ((noiseValue - noiseValueShadow) * 10)
                              -  (simplex.noise3D(x/1000, y/1000, 20)
                            * (simplex.noise3D(x/500, y/500, 20)) * brick.cGx)
                            - streaks * 8 + Math.abs(simplex.noise3D(x/500, y/5, 20) * 255);

                    b = brick.cB - ((noiseValue - noiseValueShadow) * 10)
                              -  (simplex.noise3D(x/1000, y/1000, 10)
                            * (simplex.noise3D(x/500, y/500, 10)) * brick.cBx)
                    - streaks * 8 + Math.abs(simplex.noise3D(x/500, y/5, 20) * 255);
                }
                else
                {
                    //brick face
                    r = brick.cR - ((noiseValue - noiseValueShadow) * 10) 
                            - (simplex.noise3D(x/1000, y/1000, 30)
                            * (simplex.noise3D(x/500, y/500, 30)) * brick.cRx)
                            - streaks * 8;

                    g = brick.cG - ((noiseValue - noiseValueShadow) * 10)
                              -  (simplex.noise3D(x/1000, y/1000, 20)
                            * (simplex.noise3D(x/500, y/500, 20)) * brick.cGx)
                            - streaks * 8;

                    b = brick.cB - ((noiseValue - noiseValueShadow) * 10)
                              -  (simplex.noise3D(x/1000, y/1000, 10)
                            * (simplex.noise3D(x/500, y/500, 10)) * brick.cBx)
                    - streaks * 8;
                }
            }
            
            //vertical grout
            if ( (y > 320 + simplex.noise3D(x/10, y/5, 76) * 2) ||
                ((y > 20 + simplex.noise3D(x/10, y/5, 76) * 2)&&
                (y < 150 + simplex.noise3D(x/10, y/5, 76) * 2)))
            {
                if ( (x >120 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(x < 140 + simplex.noise3D(x/10, y/5, 76) * 2))
                {
                    var grout = x - (120 + simplex.noise3D(x/2, y/2, 66) * 5
                                         + simplex.noise3D(x/2, y/200, 96) * 5
                                         + simplex.noise3D(x/5, y/10, 86) * 5);
                
                    r = 92 + grout * 10 - streaks * 5;
                    g = 32 + grout * 10 - streaks * 8;
                    b = 16 + grout * 8 - streaks * 8;
                }
                else if ( (x >720 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(x < 740 + simplex.noise3D(x/10, y/5, 76) * 2))
                {
                    var grout = x - (720 + simplex.noise3D(x/2, y/2, 66) * 5
                                         + simplex.noise3D(x/2, y/200, 96) * 5
                                         + simplex.noise3D(x/5, y/10, 86) * 5);
                
                    r = 92 + grout * 10 - streaks * 5;
                    g = 32 + grout * 10 - streaks * 8;
                    b = 16 + grout * 8 - streaks * 8;
                }
            }
            else if ( 
                ((y > 170 + simplex.noise3D(x/10, y/5, 76) * 2)&&
                (y < 300 + simplex.noise3D(x/10, y/5, 76) * 2)))
            {
                if ( (x >420 + simplex.noise3D(x/10, y/5, 76) * 2)
               &&(x < 440 + simplex.noise3D(x/10, y/5, 76) * 2))
                {
                    var grout = x - (420 + simplex.noise3D(x/2, y/2, 66) * 5
                                         + simplex.noise3D(x/2, y/200, 96) * 5
                                         + simplex.noise3D(x/5, y/10, 86) * 5);
                
                    r = 92 + grout * 10 - streaks * 5;
                    g = 32 + grout * 10 - streaks * 8;
                    b = 16 + grout * 8 - streaks * 8;
                }
            }
            setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
        }   
    }
    
      
}    



/*
 * A fast javascript implementation of simplex noise by Jonas Wagner
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 *
 *
 * Copyright (C) 2012 Jonas Wagner
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
(function () {

var F2 = 0.5 * (Math.sqrt(3.0) - 1.0),
    G2 = (3.0 - Math.sqrt(3.0)) / 6.0,
    F3 = 1.0 / 3.0,
    G3 = 1.0 / 6.0,
    F4 = (Math.sqrt(5.0) - 1.0) / 4.0,
    G4 = (5.0 - Math.sqrt(5.0)) / 20.0;


function SimplexNoise(random) {
    if (!random) random = Math.random;
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (var i = 0; i < 256; i++) {
        this.p[i] = random() * 256;
    }
    for (i = 0; i < 512; i++) {
        this.perm[i] = this.p[i & 255];
        this.permMod12[i] = this.perm[i] % 12;
    }

}
SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0,
                            - 1, 1, 0,
                            1, - 1, 0,

                            - 1, - 1, 0,
                            1, 0, 1,
                            - 1, 0, 1,

                            1, 0, - 1,
                            - 1, 0, - 1,
                            0, 1, 1,

                            0, - 1, 1,
                            0, 1, - 1,
                            0, - 1, - 1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, - 1, 0, 1, - 1, 1, 0, 1, - 1, - 1,
                            0, - 1, 1, 1, 0, - 1, 1, - 1, 0, - 1, - 1, 1, 0, - 1, - 1, - 1,
                            1, 0, 1, 1, 1, 0, 1, - 1, 1, 0, - 1, 1, 1, 0, - 1, - 1,
                            - 1, 0, 1, 1, - 1, 0, 1, - 1, - 1, 0, - 1, 1, - 1, 0, - 1, - 1,
                            1, 1, 0, 1, 1, 1, 0, - 1, 1, - 1, 0, 1, 1, - 1, 0, - 1,
                            - 1, 1, 0, 1, - 1, 1, 0, - 1, - 1, - 1, 0, 1, - 1, - 1, 0, - 1,
                            1, 1, 1, 0, 1, 1, - 1, 0, 1, - 1, 1, 0, 1, - 1, - 1, 0,
                            - 1, 1, 1, 0, - 1, 1, - 1, 0, - 1, - 1, 1, 0, - 1, - 1, - 1, 0]),
    noise2D: function (xin, yin) {
        var permMod12 = this.permMod12,
            perm = this.perm,
            grad3 = this.grad3;
        var n0=0, n1=0, n2=0; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin) * F2; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var X0 = i - t; // Unskew the cell origin back to (x,y) space
        var Y0 = j - t;
        var x0 = xin - X0; // The x,y distances from the cell origin
        var y0 = yin - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        var ii = i & 255;
        var jj = j & 255;
        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            var gi0 = permMod12[ii + perm[jj]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
        }
        var t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function (xin, yin, zin) {
        var permMod12 = this.permMod12,
            perm = this.perm,
            grad3 = this.grad3;
        var n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var k = Math.floor(zin + s);
        var t = (i + j + k) * G3;
        var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        var Y0 = j - t;
        var Z0 = k - t;
        var x0 = xin - X0; // The x,y,z distances from the cell origin
        var y0 = yin - Y0;
        var z0 = zin - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        }
        else { // x0<y0
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;
        var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        var y2 = y0 - j2 + 2.0 * G3;
        var z2 = z0 - k2 + 2.0 * G3;
        var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        var y3 = y0 - 1.0 + 3.0 * G3;
        var z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        var ii = i & 255;
        var jj = j & 255;
        var kk = k & 255;
        // Calculate the contribution from the four corners
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) n0 = 0.0;
        else {
            var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
        }
        var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) n1 = 0.0;
        else {
            var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
        }
        var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) n2 = 0.0;
        else {
            var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
        }
        var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) n3 = 0.0;
        else {
            var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
            t3 *= t3;
            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function (x, y, z, w) {
        var permMod12 = this.permMod12,
            perm = this.perm,
            grad4 = this.grad4;

        var n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        var s = (x + y + z + w) * F4; // Factor for 4D skewing
        var i = Math.floor(x + s);
        var j = Math.floor(y + s);
        var k = Math.floor(z + s);
        var l = Math.floor(w + s);
        var t = (i + j + k + l) * G4; // Factor for 4D unskewing
        var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        var Y0 = j - t;
        var Z0 = k - t;
        var W0 = l - t;
        var x0 = x - X0; // The x,y,z,w distances from the cell origin
        var y0 = y - Y0;
        var z0 = z - Z0;
        var w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        var rankx = 0;
        var ranky = 0;
        var rankz = 0;
        var rankw = 0;
        if (x0 > y0) rankx++;
        else ranky++;
        if (x0 > z0) rankx++;
        else rankz++;
        if (x0 > w0) rankx++;
        else rankw++;
        if (y0 > z0) ranky++;
        else rankz++;
        if (y0 > w0) ranky++;
        else rankw++;
        if (z0 > w0) rankz++;
        else rankw++;
        var i1, j1, k1, l1; // The integer offsets for the second simplex corner
        var i2, j2, k2, l2; // The integer offsets for the third simplex corner
        var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        i1 = rankx >= 3 ? 1 : 0;
        j1 = ranky >= 3 ? 1 : 0;
        k1 = rankz >= 3 ? 1 : 0;
        l1 = rankw >= 3 ? 1 : 0;
        // Rank 2 denotes the second largest coordinate.
        i2 = rankx >= 2 ? 1 : 0;
        j2 = ranky >= 2 ? 1 : 0;
        k2 = rankz >= 2 ? 1 : 0;
        l2 = rankw >= 2 ? 1 : 0;
        // Rank 1 denotes the second smallest coordinate.
        i3 = rankx >= 1 ? 1 : 0;
        j3 = ranky >= 1 ? 1 : 0;
        k3 = rankz >= 1 ? 1 : 0;
        l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        var y1 = y0 - j1 + G4;
        var z1 = z0 - k1 + G4;
        var w1 = w0 - l1 + G4;
        var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        var y2 = y0 - j2 + 2.0 * G4;
        var z2 = z0 - k2 + 2.0 * G4;
        var w2 = w0 - l2 + 2.0 * G4;
        var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        var y3 = y0 - j3 + 3.0 * G4;
        var z3 = z0 - k3 + 3.0 * G4;
        var w3 = w0 - l3 + 3.0 * G4;
        var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        var y4 = y0 - 1.0 + 4.0 * G4;
        var z4 = z0 - 1.0 + 4.0 * G4;
        var w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        var ii = i & 255;
        var jj = j & 255;
        var kk = k & 255;
        var ll = l & 255;
        // Calculate the contribution from the five corners
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0) n0 = 0.0;
        else {
            var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
            t0 *= t0;
            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
        }
        var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0) n1 = 0.0;
        else {
            var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
            t1 *= t1;
            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
        }
        var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0) n2 = 0.0;
        else {
            var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
            t2 *= t2;
            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
        }
        var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0) n3 = 0.0;
        else {
            var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
            t3 *= t3;
            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
        }
        var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0) n4 = 0.0;
        else {
            var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
            t4 *= t4;
            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }


};

// amd
if (typeof define !== 'undefined' && define.amd) define(function(){return SimplexNoise;});
// browser
else if (typeof window !== 'undefined') window.SimplexNoise = SimplexNoise;
//common js
if (typeof exports !== 'undefined') exports.SimplexNoise = SimplexNoise;
// nodejs
if (typeof module !== 'undefined') {
    module.exports = SimplexNoise;
}

})();


