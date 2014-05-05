/* 
Ken Jinks
April 28 2014
This is the refactored ArtOTron version 2.
Here lie a collection of functions and objects for creating procedural art.
 */

//function          :Col()
//description       :This represents a colour, the colour can be set using RGBA or
//                  :HSVA.
function Col()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;    
    
    //function      :SetHSVA(h, s, v, a)
    //parameters    :h - hue in radians 0 - 2PI
    //              :s - saturation - 0(grey) - 1(normal) - 2(over)
    //              :v - value, more like brightness 0(black) - 1(normal) - 2(over)
    //              :if you want white you need to desaturate in this model the go over
    //description   :This HSVA is modeled using
    this.SetHSVA = function(h, s, v, a)
    {
        var third = (Math.PI * 2) / 3;
        
        var r1 = (Math.cos(h) + 1) * v;
        var g1 = (Math.cos(h + third) + 1) * v;
        var b1 = (Math.cos(h + third * 2) + 1) * v;
        
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

//function      :setPixel(imageData, x, y, r, g, b, a)
//parameters    :imageData - an array containing the 32 bit pixel data
//              :x, y - the pixel location
//              :r, g, b, a - rgba color
function setPixel(imageData, x, y, r, g, b, a) 
{
    var index = (x + y * imageData.width) * 4;
    
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

//function      :getPixel(imageData, x, y)
//parameters    :imageData - an array containing the 32 bit pixel data
//              :x, y - the pixel location
//description   :given an array of 32 bit pixel data and a pixel location
//              :this function will return the rgba values
//returns       : {r : value, g : value, b : value, a : value }
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
    
    var colour = {    
                r : imageData.data[index+0],
                g : imageData.data[index+1],
                b : imageData.data[index+2],
                a : imageData.data[index+3]
                };
                
    return (colour);
}


//function      :Canvas()
//date          :April 28 2014
//description   :holds the pointers to the html elements
//              :resizes canvas element to the size of the browser 
//              :inner dimensions                      
function Canvas()
{
    Canvas.layer = [document.getElementById("layer000")];
    
    for (var i = 0; i < Canvas.layer.length; i++)
    {
        Canvas.layer[i].context = Canvas.layer[i].getContext("2d");
    }
    
    //function      :Canvas.Resize
    //description   :resizes all the canvas elements to fill the browser
    //              :window
    Canvas.Resize = function()
    {
        Canvas.width  = window.innerWidth;
        Canvas.height = window.innerHeight;

        for (var i = 0; i < Canvas.layer.length; i++)
        {
            Canvas.layer[i].width = Canvas.width;
            Canvas.layer[i].height = Canvas.height;
        }
    };

    //resize the elements when Canvas is called
    Canvas.Resize();

    //function      :Canvas.pctX(xPct)
    //parameter     :xPct the percent of the width
    //description   :converts percent to pixel
    //returns       :xPct expressed in pixels
    Canvas.pctX = function(xPct)
    {
        return (xPct/100) * Canvas.width;
    };

    //function      :Canvas.pctY(yPct)
    //parameter     :yPct the percent of the height
    //description   :converts percent to pixel
    //returns       :yPct expressed in pixels               
    Canvas.pctY = function(yPct)
    {
        return (yPct/100) * Canvas.height;
    };
};//Canvas()

//function      :ParametricNoise
//date          :April 27 2014
//description   :This models how I tend to use the simplex noise by either
//              :summing weighted noise values or multiplying weighted noise 
//              :values.
//              :Here you can define an array for each of the parameters, this
//              :will make reading the code easier.
function ParametricNoise() 
{
    //parametrics, each parameter should be assigned the same number of elements
    this.xPeriod = [0];//mean width of noise
    this.yPeriod = [0];//mean height of noise
    
    this.amplitude = [0];//peak amplitude, where output peak to peak range is +/-amplitude

    this.seed      = [0];//noise seed, use the same seed to get the same noise out
    
    this.simplex   = new SimplexNoise(),//the noise generator
    
    //function      :calcAsSum
    //parameters    :x, y - the coordinates for the noise
    //description   :This function will throw an exception if the parametric
    //              :arrays do not have the same number of elements.
    //              :After verifying the number of elements, the output will
    //              :be the sum of each result together.
    //              :noise[0] * amplitude[0] + 
    //              :noise[1] * amplitude[1] +
    //              :... + 
    //              :noise[n-1] * amplitude[n-1] +
    //              :noise[n] * amplitude[n]
    this.calcAsSum  = function(x, y)
    {
        var numElements = this.xPeriod.length;
        var sumResult = 0; //this is a sum, 0 plus anything is itself
        
        if (this.yPeriod.length   !== numElements ||
            this.amplitude.length !== numElements ||
            this.seed.length      !== numElements)
        {
            throw "Parametric values have an unequal number of elements.";
        }
        
        
        for (var e = 0; e < numElements; e++)
        {
            sumResult += this.simplex.noise3D(x/this.xPeriod[e], y/this.yPeriod[e], this.seed[e]) * this.amplitude[e];
        }
        
        return sumResult;
    };//calcAsSum
    
    //function      :calcAsProduct
    //parameters    :x, y - the coordinates for the noise
    //description   :This function will throw an exception if the parametric
    //              :arrays do not have the same number of elements.
    //              :After verifying the number of elements, the output will
    //              :be the product of each result together.
    //              :noise[0] * amplitude[0] * 
    //              :noise[1] * amplitude[1] *
    //              :... * 
    //              :noise[n-1] * amplitude[n-1] *
    //              :noise[n] * amplitude[n]
    this.calcAsProduct = function(x, y)
    {
        var numElements = this.xPeriod.length;
        var productResult = 1; //this is a product, 1 times anything is itself
        
        if (this.yPeriod.length   !== numElements ||
            this.amplitude.length !== numElements ||
            this.seed.length      !== numElements)
        {
            throw "Parametric values have an unequal number of elements.";
        }

        for (var e = 0; e < numElements; e++)
        {
            productResult *= this.simplex.noise3D(x/this.xPeriod[e], y/this.yPeriod[e], this.seed[e]) * this.amplitude[e];
        }
        
        return productResult;
    };//calcAsProduct
};

//object        :ParametricNoiseTest 
//date          :April 27 2014
//description   :This is the test suite for the function ParametricNoise 
var ParametricNoiseTest = 
{
    functionalExceptionTest : 
    {t1 : function() 
    {
        //this will throw an exception because amplitude has 2 elements where
        //the other parameters all have 1
        var underTest = new ParametricNoise();
        
        underTest.seed       = [0];
        underTest.amplitude  = [0, 0];
        underTest.xPeriod    = [0];        
        underTest.yPeriod    = [0];
        
        try
        {
            underTest.calcAsSum(10, 10);
        }
        catch (ex)
        {
            alert(ex);
        }
        /* The resulting alert should be something like this:
        
        Parametric values have an unequal number of elements. 

         */
    }},
        
    functionalPositiveTest :
    {t1 : function(context)
    {
        var testWidth = 400;
        var testHeight = 400;
        //this will produce a 400x400 pixel image with
        //xPeriod   = [100] 
        //yPeriod   = [200] 
        //amplitude = [128] 
        //seed      = [0] 
        //the period of the generated image should be observed to repeat about 
        //four times on the x axis and twice on the y axis
        var underTest = new ParametricNoise();
        var imageData = context.createImageData(testWidth, testHeight);
                       
        underTest.seed       = [0];
        underTest.amplitude  = [128];
        underTest.xPeriod    = [100];        
        underTest.yPeriod    = [200];
        
        for (var x = 0; x < testWidth; x++)
        {
            for (var y = 0; y < testHeight; y ++)
            {
                var noise = Math.floor(underTest.calcAsSum(x, y) + 128);
                setPixel(imageData, x, y, noise, noise, noise, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    },t2 : function(context)
    {
        var testWidth = 400;
        var testHeight = 400;
        //this will produce a 400x400 pixel image using calcAsProduct
        //the red, green and blue channels will have their own unique seeds
        //
        var red = new ParametricNoise();
        var green = new ParametricNoise();
        var blue = new ParametricNoise();
        
        var imageData = context.createImageData(testWidth, testHeight);
                       
        red.seed       = [0, 10, 100, 1000];
        red.amplitude  = [1, 1, 1, 1];
        red.xPeriod    = [10, 20, 50, 70];        
        red.yPeriod    = [10, 20, 50, 70];
  
        green.seed       = [10, 20, 200, 2000];
        green.amplitude  = [1, 1, 1, 1];
        green.xPeriod    = [10, 20, 50, 70];        
        green.yPeriod    = [10, 20, 50, 70];
        
        blue.seed       = [20, 30, 300, 3000];
        blue.amplitude  = [1, 1, 1, 1];
        blue.xPeriod    = [10, 20, 50, 70];        
        blue.yPeriod    = [10, 20, 50, 70];
        
        for (var x = 0; x < testWidth; x++)
        {
            for (var y = 0; y < testHeight; y ++)
            {
                var redNoise = Math.floor( (red.calcAsProduct(x, y) + 1) * 128);
                var greenNoise = Math.floor( (green.calcAsProduct(x, y) + 1) * 128);
                var blueNoise = Math.floor( (blue.calcAsProduct(x, y) + 1) * 128);
                
                setPixel(imageData, x, y, redNoise, greenNoise, blueNoise, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    }}
    
};

//function      :InstaPalette()
//date          :April 30 2014
//description   :This function randomly generates a colour triad upon
//              :instantiation, with leadCol as the main colour and
//              :leftCol and rightCol as two colours equidistant
//              :to the leadCol.
function InstaPalette()
{
    var hue        = Math.random() * (Math.PI * 2.0);
    var saturation = Math.random() * 0.75 + 0.25;
    var value      = Math.random() * 0.75 + 0.25;
    var hueDelta   = Math.random() * (Math.PI/4) + (Math.PI/4);
    var satDelta   = Math.random() * 0.5 + 0.5;
    var valDelta   = Math.random() * 0.5 + 0.5;
    
    this.leadCol = new Col();
    this.leadCol.SetHSVA(hue, saturation, value, 1);
    
    this.leadColDelta = function(h, s, l)
    {
        var result = new Col();
        
        result.SetHSVA(hue + h, saturation * s, value * l, 1);
        
        return result;
    };   
    
    this.leftCol = new Col();
    this.leftCol.SetHSVA(hue + hueDelta, saturation * satDelta, value * valDelta, 1);
    
    this.leftColDelta = function(h, s, l)
    {
        var result = new Col();
        
        result.SetHSVA(hue + hueDelta + h, saturation * s, value * l, 1);
        
        return result;
    };
    
    this.rightCol = new Col();
    this.rightCol.SetHSVA(hue - hueDelta, saturation * satDelta, value * valDelta, 1);   
    
    this.rightColDelta = function(h, s, l)
    {
        var result = new Col();
        
        result.SetHSVA(hue - hueDelta + h, saturation * s, value * l, 1);
        
        return result;
    }; 
}

//object        :InstaPaletteTest
//date          :April 30 2014
//description   :This object contains the test suite for the InstaPalette 
//              :function.
var InstaPaletteTest = 
{
    functionalPositive :
    {t1 : function(context)
    {
        //This test will use the instapalette to generate a colour triad.
        //It will then draw three palettes crosssectioning the 
        //saturation - value plane. As well three bars underneath will have the 
        ///colour triad.
        var width = 200;//size of one of the three crosssections
        var height = 200;
        var numCells = 11;//number of cell on a side
        
        var cellWidth = width / numCells;
        var cellHeight = height / numCells;
        
        var underTest = new InstaPalette();

        var leadCol = underTest.leadCol;
        var leftCol = underTest.leftCol;
        var rightCol = underTest.rightCol;
      
        for (var cx = 0; cx < numCells; cx++)
        {
            var cellX = cellWidth * cx;
            
            for (var cy = 0; cy < numCells; cy++)
            {
                var cellY = cellHeight * cy;
                var deltaColour = underTest.leadColDelta(0, cx/numCells * 2, cy/numCells * 2);
                context.beginPath();
                context.fillStyle = "rgba("+deltaColour.r+","+deltaColour.g+","+deltaColour.b+", 1)";
                context.rect(cellX + width, cellY, cellWidth, cellHeight);
                context.fill();
            }
        }
        
        for (var cx = 0; cx < numCells; cx++)
        {
            var cellX = cellWidth * cx;
            
            for (var cy = 0; cy < numCells; cy++)
            {
                var cellY = cellHeight * cy;
                var deltaColour = underTest.leftColDelta(0, cx/numCells * 2, cy/numCells * 2);
                context.beginPath();
                context.fillStyle = "rgba("+deltaColour.r+","+deltaColour.g+","+deltaColour.b+", 1)";
                context.rect(cellX, cellY, cellWidth, cellHeight);
                context.fill();
            }
        }    
        
        for (var cx = 0; cx < numCells; cx++)
        {
            var cellX = cellWidth * cx;
            
            for (var cy = 0; cy < numCells; cy++)
            {
                var cellY = cellHeight * cy;
                var deltaColour = underTest.rightColDelta(0, cx/numCells * 2, cy/numCells * 2);
                context.beginPath();
                context.fillStyle = "rgba("+deltaColour.r+","+deltaColour.g+","+deltaColour.b+", 1)";
                context.rect(cellX + width + width, cellY, cellWidth, cellHeight);
                context.fill();
            }
        } 
        
        context.beginPath();
        context.fillStyle = "rgba("+leftCol.r+","+leftCol.g+","+leftCol.b+", 1)";
        context.rect(0, height, width * 3, cellHeight);
        context.fill();
        context.beginPath();
        context.fillStyle = "rgba("+leadCol.r+","+leadCol.g+","+leadCol.b+", 1)";
        context.rect(0, height + cellHeight, width * 3, cellHeight);
        context.fill();
        context.beginPath();
        context.fillStyle = "rgba("+rightCol.r+","+rightCol.g+","+rightCol.b+", 1)";
        context.rect(0, height + cellHeight * 2, width * 3, cellHeight);
        context.fill();
    }}
};

function InstaMap()
{
    this.altitude = {min : 0, max : 100};
    this.waterLevel = 30;
    
    this.water = new ParametricNoise();
    
    this.water.seed = [120, 180, 280, 330, 440];
    this.water.xPeriod = [5, 50, 75, 100, 150];
    this.water.yPeriod = [0.5, 0.7, 1, 2, 5];
    this.water.amplitude = [1, 1, 1, 1, 1];
    
    this.foilage = {trees : new ParametricNoise(), 
                    grass : new ParametricNoise()};
    
    this.foilage.trees.seed = [111, 222, 333, 444, 555];
    this.foilage.trees.xPeriod = [0.01, 0.05, 0.1, 10, 5];
    this.foilage.trees.yPeriod = [0.01, 0.05, 0.1, 10, 5];
    this.foilage.trees.amplitude = [1, 1, 1, 2, 2];

    this.foilage.grass.seed = [666, 777, 888, 999, 1010];
    this.foilage.grass.xPeriod = [0.010, 0.020, 30, 40, 50];
    this.foilage.grass.yPeriod = [0.010, 0.020, 30, 40, 50];
    this.foilage.grass.amplitude = [1, 1, 1, 1, 1];
    
    this.zone = new ParametricNoise();
    
    this.zone.seed = [1100, 1200];
    this.zone.xPeriod = [500, 1000];
    this.zone.yPeriod = [500, 1000];
    this.zone.amplitude = [0.5, 0.5];
    
    this.elevation = new ParametricNoise();
    
    this.elevation.seed = [100, 150, 200, 300, 400];
    this.elevation.xPeriod = [5, 10, 200, 100, 150];
    this.elevation.yPeriod = [5, 10, 200, 100, 150];
    this.elevation.amplitude = [0.2, 0.2, 0.2, 0.2, 0.2];
    
    this.curve = {x : new ParametricNoise(), y : new ParametricNoise()};
    
    this.curve.x.seed = [500, 525, 550, 600, 700, 750];
    this.curve.x.xPeriod = [5, 10, 100, 500, 1000, 5000];
    this.curve.x.yPeriod = [5, 10, 100, 500, 1000, 5000];
    this.curve.x.amplitude = [0.5, 0.5, 2, 20, 20, 100];
    
    this.curve.y.seed = [800, 825, 850, 900, 1000, 1050];
    this.curve.y.xPeriod = [5, 10, 100, 500, 1000, 5000];
    this.curve.y.yPeriod = [5, 10, 100, 500, 1000, 5000];
    this.curve.y.amplitude = [0.5, 0.5, 2, 20, 20, 100];  
    
    this.GetColourAt = function(x, y)
    {
        var warpX = this.curve.x.calcAsSum(x, y);
        var warpY = this.curve.y.calcAsSum(x, y);
        var elv = (this.elevation.calcAsSum(warpX, warpY) + 1) / 2;
        
        var waterColour = new Col();
        var treeColour = new Col();
        var grassColour = new Col();
        var foilageColour = new Col();
        
        var resultColour = new Col();
        
        
        elv = (elv * (this.altitude.max - this.altitude.min)) + this.altitude.min;
        
        waterColour.r = (this.water.calcAsSum(warpX, warpY) + 1) * 32;
        waterColour.g = (this.water.calcAsSum(warpX, warpY) + 1 ) * 32;
        waterColour.b = (this.water.calcAsSum(warpX, warpY) + 1) * 64 + 192;
        
        treeColour.r = (this.foilage.trees.calcAsSum(x, y) + 1) * 64;
        treeColour.b = this.foilage.trees.calcAsSum(x, y) * 16 + 32;
        treeColour.g = (this.foilage.trees.calcAsSum(x, y) + 1) * 64 + 128;
        
        grassColour.r = (this.foilage.grass.calcAsSum(warpX, warpY) + 1) * 64 + 64 * Math.random();
        grassColour.b = this.foilage.grass.calcAsSum(warpX, warpY) * 8 + 64 * Math.random();
        grassColour.g = (this.foilage.grass.calcAsSum(warpX, warpY) + 1) * 64 + 128 * Math.random();
        
        foilageColour.r = ((treeColour.r * (this.zone.calcAsSum(x, y) + 1))
                         + (grassColour.r * (2 - this.zone.calcAsSum(x, y) + 1)))/4;
                 
        foilageColour.g = ((treeColour.g * (this.zone.calcAsSum(x, y) + 1))
                         + (grassColour.g * (2 - this.zone.calcAsSum(x, y) + 1)))/4;
                 
        foilageColour.b = ((treeColour.b * (this.zone.calcAsSum(x, y) + 1))
                         + (grassColour.b * (2 - this.zone.calcAsSum(x, y) + 1)))/4;
        
        
        if (elv < this.waterLevel)
        {
            resultColour = waterColour;

        }
        else
        {
            var shore = 20;
            var wetness = elv - this.waterLevel;
            
            var blue = wetness < shore ? (((shore - wetness)/shore) * waterColour.b + (wetness/shore) * foilageColour.b) : foilageColour.b;
            var red = wetness < shore ? ((shore - wetness)/shore) * 64 + 64 + (((shore - wetness)/shore) * waterColour.r + (wetness/shore) * foilageColour.r) : foilageColour.r;
            var green = wetness < shore ? ((shore - wetness)/shore) * 64 + 64 + (wetness/shore) * foilageColour.g + waterColour.g: foilageColour.g;
            
            resultColour.r = red;
            resultColour.g = green;
            resultColour.b = blue;
        }
        
        return resultColour;
    };
}

var InstaMapTest =
{
    functionalPositive :
    {t1 : function(context)
    {  
        var underTest = new InstaMap();
        
        var height = context.canvas.height;
        var width = context.canvas.width;
        var imageData = context.createImageData(width, height);
        
        for (x = 0; x < width; x++)
        {
            for (y = 0; y < height; y++)
            {
                var col = underTest.GetColourAt(x, y);
                
                setPixel(imageData, x, y, col.r, col.g, col.b, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    }}
};

//function          :TextureGen()
//Date              :May 1 2014
//description       :This function manages an array of 2d sinusoids.
//                  :Each sinusoid has three properties, frequency, sinAmplitude,
//                  :and cosAmplitude.
function TextureGen()
{
    this.sinusoid = {freqency : [100], sin : [1], cos : [1]};
    
    this.GetValueAt = function(x, y)
    {
        if( (this.sinusoid.freqency.length !== this.sinusoid.sin.length) ||
            (this.sinusoid.freqency.length !== this.sinusoid.cos.length))
        {
            throw "Sinusoid has unequal number of elements";
        }
        
        var result = 0;
        
        for (var s = 0; s < this.sinusoid.sin.length; s++)
        {
            result += (Math.sin(x * this.sinusoid.freqency[s]) * this.sinusoid.sin[s] + 
                       Math.cos(x * this.sinusoid.freqency[s]) * this.sinusoid.cos[s])+
                      (Math.sin(y * this.sinusoid.freqency[s]) * this.sinusoid.sin[s] + 
                       Math.cos(y * this.sinusoid.freqency[s]) * this.sinusoid.cos[s]);
        }
        result /= (this.sinusoid.sin.length * 4);
        
        return result;
    };
    
}

var TextureGenTest =
{
    functionalPositive :
    {t1 : function(context)
    {  
        var underTest = new TextureGen();
        
        var height = context.canvas.height;
        var width = context.canvas.width;
        var imageData = context.createImageData(width, height);
        
        for (x = 0; x < width; x++)
        {
            for (y = 0; y < height; y++)
            {
                var val = underTest.GetValueAt(x, y) * 255;
                
                setPixel(imageData, x, y, val, val, val, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    },
    t2 : function(context)
    {  
        var underTest = new TextureGen();
                
        var height = context.canvas.height;
        var width = context.canvas.width;
        var imageData = context.createImageData(width, height);
        
        underTest.sinusoid.freqency = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
        underTest.sinusoid.sin = [1, 1, 1, 1, 1, 1];
        underTest.sinusoid.cos = [1, 1, 1, 1, 1, 1];
        
        for (x = 0; x < width; x++)
        {
            for (y = 0; y < height; y++)
            {
                var val = underTest.GetValueAt(x, y) * Math.PI * 2;
                var colour = new Col();
                colour.SetHSVA(val, 1, 1, 255);
                
                setPixel(imageData, x, y, colour.r, colour.g, colour.b, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    },
    t3 : function(context)
    {  
        var underTest = new TextureGen();
                
        var height = context.canvas.height;
        var width = context.canvas.width;
        var imageData = context.createImageData(width, height);
        
        underTest.sinusoid.freqency = [0.1, 0.3, 0.5, 0.7, 0.9, 1.1];
        underTest.sinusoid.sin = [1, 1/3, 1/5, 1/7, 1/9, 1/11];
        underTest.sinusoid.cos = [1, 1/3, 1/5, 1/7, 1/9, 1/11];
        
        for (x = 0; x < width; x++)
        {
            for (y = 0; y < height; y++)
            {
                var val = underTest.GetValueAt(x, y) < 0 ? 0 : 255;
                
                setPixel(imageData, x, y, val, val, val, 255);
            }
        }
        
        context.putImageData(imageData, 0, 0);
    }}    
};

//function      :InstaTree(options)
//parameters    :options 
//              :
//Date          :May 1 2014
//description   :This function contains the methods for generating trees.

function InstaTree(options)
{
    this.trunk = {width : {start : 20, end : 1}, 
                 length : 800, 
             lengthRate : 1.5,
                  angle : Math.PI / 2, 
                   curl : 0.2, /*the randomness of the path*/
             branchProb : 0.05,
          segmentLength : 10,
                 colour : {r : 128, g : 64, b : 64}};

    var branchObj = function()
    {        
        this.width = {start : 50, end : 1}; 
        this.length = 0; 
        this.lengthRate = 1.0;
        this.curl = 0.2; /*the randomness of the path*/
        this.angleDelta = {min : Math.PI / 8, max : Math.PI / 2};
        this.branchProb = 0.07,
        this.angle = 30;
        this.depth = 3;
        this.graviphobia = 0.02;
        this.segmentLength = 10;
        this.colour = {r : 128, g : 64, b : 64};
    };
    
    var leafObj = function()
    {
        this.size = 20;
        this.angle  = 0;
        this.colour = {r : 0, g : 255, b : 0};
    };
    
    var DrawLeaf = function(x, y, leaf, context)
    {
        var points = {x : [x,
                           x + Math.cos(leaf.angle + Math.PI/4) * leaf.size/2,
                           x + Math.cos(leaf.angle) * leaf.size,
                           x + Math.cos(leaf.angle - Math.PI/4) * leaf.size/2], 
                      y : [y,
                           y + Math.sin(leaf.angle + Math.PI/4) * leaf.size/2,
                           y + Math.sin(leaf.angle) * leaf.size,
                           y + Math.sin(leaf.angle - Math.PI/4) * leaf.size/2]};
        
        context.fillStyle =  "rgba(" + leaf.colour.r + "," + leaf.colour.g + "," + leaf.colour.b + ", 1)";
        context.strokeStyle =  "rgba(" + leaf.colour.r + "," + leaf.colour.g + "," + leaf.colour.b + ", 1)";
        context.beginPath();
        context.moveTo(points.x[0], points.y[0]);  
        
        for (p = 0; p < points.x.length; p++)
        {
            context.lineTo(points.x[p], points.y[p]);
        }
        
        context.closePath();
        context.stroke();
        context.fill();
    };  
    
    
    //function      :this.Draw(x, y, context)
    //date          :May 1 2014
    //parameters    :x, y, - the location of the base of the tree
    //              :context - the drawing context
    //description   :This funcion draws the trunk while arbitrarily adding branchs
    //              :along the way. The objects this.trunk and this.branch hold
    //              :the parameters used in constructing the tree.
    this.Draw = function(x, y, context)
    {
        var segmentLength = this.trunk.segmentLength;
        var   numSegments = this.trunk.length / segmentLength;
        var segmentShrink = (this.trunk.width.end - this.trunk.width.start) / numSegments;

        var segment = {x : [this.trunk.width.start / -2,this.trunk.width.start / 2,0,0], y : [0,0,0,0]};
        
        var  vertex = {x : 0, y : 0};
        
        var branchRight = false; //to keep the tree asymetrical, branching alternates left/right
        
        //walk along the main trunk while arbitrarily choosing branch points
        for (var s = 0; s < numSegments; s++)
        {
            //the angle for this segment based on trunk angle
            //makes the trunk more rough by shifting the angle from side to side
            var angle = this.trunk.angle + ((Math.random() - 0.5) * Math.PI * this.trunk.curl);
            
            //this is how wide the segment will be
            //each segment gets thinner as we move along the trunk
            var segmentWidth = (this.trunk.width.start + (segmentShrink * s)) / 2;
            
            //leaves are more probable near the end of the trunk
            var leafProb = s / (numSegments - 1);
            
            //calculate the end midpoint of the segment
            vertex.x -= Math.cos(angle) * segmentLength;
            vertex.y -= Math.sin(angle) * segmentLength;
            
            //calculate the end left and right points of the segment
            segment.x[2] = vertex.x + Math.cos(angle - Math.PI / 2) * segmentWidth;
            segment.y[2] = vertex.y + Math.sin(angle - Math.PI / 2) * segmentWidth;
            segment.x[3] = vertex.x + Math.cos(angle + Math.PI / 2) * segmentWidth;
            segment.y[3] = vertex.y + Math.sin(angle + Math.PI / 2) * segmentWidth;
            
            //set the colour
            context.fillStyle = "rgba(" + this.trunk.colour.r + "," + this.trunk.colour.g + "," + this.trunk.colour.b + ", 1)";
            context.strokeStyle = "rgba(" + this.trunk.colour.r + "," + this.trunk.colour.g + "," + this.trunk.colour.b + ", 1)";
                
            //draw the segment
            context.beginPath();            
            context.moveTo(x + segment.x[0], y + segment.y[0]);
            context.lineTo(x + segment.x[1], y + segment.y[1]);
            context.lineTo(x + segment.x[2], y + segment.y[2]);
            context.lineTo(x + segment.x[3], y + segment.y[3]);            
            context.closePath();            
            context.fill();
            context.stroke();
            
            //the end points of the segment become the start points of the next segment
            segment.x[0] = segment.x[3];
            segment.y[0] = segment.y[3];
            
            segment.x[1] = segment.x[2];
            segment.y[1] = segment.y[2];
            
            //choose to add a branch if we are up far enough along the trunk
            if (Math.random() < this.trunk.branchProb && (s * segmentLength) > segmentWidth)
            {
                //create a new branch
                var branch = new branchObj();
                
                //calculate the angle of the new branch depending on if it is going left or right
                var range = branch.angleDelta.max - branch.angleDelta.min;
                var min = branch.angleDelta.min;
                var branchAngle =  0;
                
                if (branchRight === true)
                {
                    branchAngle = angle - (Math.random() * range) - min;
                    branchRight = false;
                }
                else
                {
                    branchAngle = angle + (Math.random() * range) + min;
                    branchRight = true;
                }
                
                //set up branch
                branch.angle = branchAngle;
                //length is proportional to the remaining length of the trunk
                branch.length = (segmentWidth * (numSegments - s - 1)) * this.trunk.lengthRate;
                branch.width.start = segmentWidth;
                branch.width.end = 1;
                branch.colour.r = this.trunk.colour.r;
                branch.colour.g = this.trunk.colour.g;
                branch.colour.b = this.trunk.colour.b;
                
                DrawBranch(x + vertex.x, y + vertex.y, branch, context);
            }
            
            if (Math.random() < leafProb)
            {
                var leaf = new leafObj();
                var left = Math.random() < 0.5;
                
                if (left === true)
                {
                    leaf.angle = angle + Math.random() * Math.PI / 4 + Math.PI/2;
                }
                else
                {
                    leaf.angle = angle - Math.random() * Math.PI / 4 - Math.PI/2;
                }
                
                leaf.colour.r = this.trunk.colour.r;
                leaf.colour.g = this.trunk.colour.g;
                leaf.colour.b = this.trunk.colour.b;
                
                DrawLeaf(x + vertex.x, y + vertex.y, leaf, context);
            }
         }
    };
    
    //function      :this.DrawBranch(x, y, branch, context)
    //date          :May 2 2014
    //parameters    :x, y, - the location of the base of the tree
    //              :branch - an object containing the properties of the branch
    //              :context - the drawing context
    //description   :This funcion draws the trunk while arbitrarily adding branchs
    //              :along the way. The objects this.trunk and this.branch hold
    //              :the parameters used in constructing the tree.
    var DrawBranch = function(x, y, branch, context)
    {
        var segmentLength = branch.segmentLength;
        var numSegments = branch.length / segmentLength;
        var segmentShrink = (branch.width.end - branch.width.start) / numSegments;

        var segment = {x : [branch.width.start / -2,branch.width.start / 2,0,0], y : [0,0,0,0]};
        
        var vertex = {x : 0, y : 0};
        
        var branchRight = false;
        
        //walk along the length of the branch adding more branches as needed
        for (var s = 0; s < numSegments; s++)
        {
            var angle = branch.angle + ((Math.random() - 0.5) * Math.PI * branch.curl);
                        
            var segmentWidth = (branch.width.start + (segmentShrink * s))/2;
            
            var leafProb = s / (numSegments - 1);
            
            //graviphobic responce - branchs curl up away from gravity
            if (angle < 0)
            {
                branch.angle += Math.PI / 16;
            }
            else if(angle > Math.PI)
            {
                branch.angle -= Math.PI / 16;
            }
            else if(angle < Math.PI/2)
            {
                branch.angle += branch.graviphobia;
            }
            else if(angle > Math.PI/2)
            {
                branch.angle -= branch.graviphobia;
            }
            
            //choose to create a new branch as long as we are far along the branch
            //enough and ensure we don't go too deep into the recursion and 
            //cause a stack overflow
            if (Math.random() < branch.branchProb && 
               (s * segmentLength) > segmentWidth &&
               (branch.depth > 0))
            {
                //create new branch
                var newBranch = new branchObj();
                var range = newBranch.angleDelta.max - newBranch.angleDelta.min;
                var min = newBranch.angleDelta.min;
                var branchAngle =  0;
                
                if (this.branchRight === true)
                {
                    branchAngle = angle - (Math.random() * range) - min;
                    this.branchRight = false;
                }
                else
                {
                    branchAngle = angle + (Math.random() * range) + min;
                    this.branchRight = true;
                }
                
                //set up branch
                newBranch.angle = branchAngle;
                newBranch.length = (segmentWidth * (numSegments - s - 1)) * branch.lengthRate;
                newBranch.width.start = segmentWidth;
                newBranch.width.end = 1;
                newBranch.colour.r = branch.colour.r;
                newBranch.colour.g = branch.colour.g;
                newBranch.colour.b = branch.colour.b;
                newBranch.depth = branch.depth - 1; //count down the recursion
                
                DrawBranch(x + vertex.x, y + vertex.y, newBranch, context);
                
            }
            
            //calculate end midpoint of branch
            vertex.x -= Math.cos(angle) * segmentLength;
            vertex.y -= Math.sin(angle) * segmentLength;
            
            //calculate end points of segment
            segment.x[2] = vertex.x + Math.cos(angle - Math.PI / 2) * segmentWidth;
            segment.y[2] = vertex.y + Math.sin(angle - Math.PI / 2) * segmentWidth;
            segment.x[3] = vertex.x + Math.cos(angle + Math.PI / 2) * segmentWidth;
            segment.y[3] = vertex.y + Math.sin(angle + Math.PI / 2) * segmentWidth;
            
            //draw the segment
            context.fillStyle = "rgba(" + branch.colour.r + "," + branch.colour.g + "," + branch.colour.b + ", 1)";
            context.strokeStyle = "rgba(" + branch.colour.r + "," + branch.colour.g + "," + branch.colour.b + ", 1)";
            context.beginPath();
            context.moveTo(x + segment.x[0], y + segment.y[0]);
            context.lineTo(x + segment.x[1], y + segment.y[1]);
            context.lineTo(x + segment.x[2], y + segment.y[2]);
            context.lineTo(x + segment.x[3], y + segment.y[3]);
            context.closePath();
            context.fill();
            context.stroke();
            
            //end points become start points of next segment
            segment.x[0] = segment.x[3];
            segment.y[0] = segment.y[3];           
            segment.x[1] = segment.x[2];
            segment.y[1] = segment.y[2];
            
            if (Math.random() < leafProb)
            {
                var leaf = new leafObj();
                var left = Math.random() < 0.5;
                
                if (left === true)
                {
                    leaf.angle = angle + Math.random() * Math.PI / 4 + Math.PI/2;
                }
                else
                {
                    leaf.angle = angle - Math.random() * Math.PI / 4 - Math.PI/2;
                }
                
                leaf.colour.r = branch.colour.r;
                leaf.colour.g = branch.colour.g;
                leaf.colour.b = branch.colour.b;

                DrawLeaf(x + vertex.x, y + vertex.y, leaf, context);
            }
         }
    };   
    

}

var InstaTreeTest = 
{
    functionalPositive :
    {t1 : function(context)
    {  
        var underTest = new InstaTree();
        
        underTest.Draw(context.canvas.width / 2, context.canvas.height, context);
    },
    t2 : function(context)
    {  
        var underTest = new InstaTree();
        var numTrees = 50;
        var skyCol = new Col();
        
        skyCol.SetHSVA(Math.PI, 2, 0.05, 1);
        
        context.fillStyle = "rgba(" + skyCol.r + "," + skyCol.g + "," + skyCol.b + ", 1)";
        context.rect(0,0,context.canvas.width, context.canvas.height);
        context.fill();
        
        for (var t = 0; t <= numTrees; t++)
        {
            var xPos = Math.random() * context.canvas.width;
            var col = new Col();
            var dark = t/numTrees;
            
            col.SetHSVA(Math.random() * Math.PI / 4 + 4.0, 1, dark/2, 1);
            
            underTest.trunk.colour = col;//{r : grey / 2, g : (grey / 2), b : grey};
            //underTest.trunk.width = {start : 100, end : 1};
            underTest.length = 500 + Math.random() * 1000;
            underTest.Draw(xPos, context.canvas.height, context);
        }
    }}    
};

//function      :InstaMountains()


//function      :toImage(canvas, image);
//Date          :May 3 2014
//description   :This function will convert the canvas into an image that can 
//              :be saved.
function toImage()
{
    var canvas = Canvas.layer[0];
    var image = document.getElementById("imageHolder");
    
    image.src = canvas.toDataURL("image/png");    
}

//function      :startUp()
//date          :April 27 2014
//description   :This function is called during the onload event of the body in
//              :index.html and it used for debugging the textures.
function startUp()
{
    Canvas();//initialize the canvas
    
    //tests
    //ParametricNoiseTest.functionalExceptionTest.t1();
    //ParametricNoiseTest.functionalPositiveTest.t1(Canvas.layer[0].context);
    ParametricNoiseTest.functionalPositiveTest.t2(Canvas.layer[0].context);
    //InstaPaletteTest.functionalPositive.t1(Canvas.layer[0].context);
    //InstaMapTest.functionalPositive.t1(Canvas.layer[0].context);
    //TextureGenTest.functionalPositive.t2(Canvas.layer[0].context);
    //TextureGenTest.functionalPositive.t3(Canvas.layer[0].context);
    //InstaTreeTest.functionalPositive.t1(Canvas.layer[0].context);
    //InstaTreeTest.functionalPositive.t2(Canvas.layer[0].context);
}
