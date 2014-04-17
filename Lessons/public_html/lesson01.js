/* 
 Ken Jinks
April 17 2014
This file contains the code for lesson one, the nuts and bolts.
In this lesson we will learn how to draw circles, lines and squares.
 */

function startUp() 
{
    //this line gets tells the browser where you want to draw
    var context = document.getElementById("myCanvas").getContext("2d");
    
    //all drawing begins with beginPath(), notice the word context
    //it is same as the line before, that is important, here we are
    //sending the command beginPath to myCanvas
    context.beginPath();
    //before we draw anything we need to choose a colour and pen to draw with
    //first is strokeStyle, this is the colour of the lines we will draw with
    //the rgba means red green blue and alpha, alpha is just transparency
    //the numbers after the rgba give the values for reg green blue and alpha
    context.strokeStyle = "rgba(255, 255, 0, 1.0)";
    //lineWidth is the width of the line we are drawing with
    context.lineWidth = 20;
    //fillStyle is the colour we will fill in our shape
    context.fillStyle = "rgba(0, 0, 255, 1.0)";
    //rect is short for rectangle, it needs four numbers
    //the first two numbers tell where to put the top left corner
    //this is 20 pixels to the left and 30 pixels down from the top corner of 
    //the canvas
    //the second two numbers tell how wide and tall the rectangle has to be
    //this is 50 pixels wide and 60 pixels tall
    context.rect(20, 30, 50, 60);
    //after all that we tell the canvas to draw the lines by stroke
    context.stroke();
    //then fill it in with fill
    context.fill();
    
    
    context.beginPath();
    //there are other ways to set colour
    //here is hsla, hue, saturation, luminance and alpha
    context.strokeStyle = "hsla(0, 100%, 50%, 0.5)";
    context.lineWidth = 50;
    context.fillStyle = "hsla(180, 100%, 50%, 1.0)";
    //this time draw two rectangles overlapping
    context.rect(100, 50, 200, 200);
    context.rect(110, 60, 200, 200);
    //notice the lines of this one
    context.stroke();
    context.fill();
    
    //here is a circle
    context.beginPath();
    //the arc can draw a circle for you
    //the first two numbers are the center of the circle
    //next is the radius of the circle
    //the last two tell the start and end of the arc
    //the circumference of a circle is 2 PI
    //the first number says start at 0 and draw around the 
    //circle until you are 2 PI around, which is the whole circumference    
    context.arc(200,200, 50, 0, Math.PI * 2);
    context.stroke();
    
    //here is arc again with a slightly smaller radius
    //this time it only draws half of a circle
    context.beginPath();
    context.arc(200,200, 40, Math.PI / 2, 3 * (Math.PI / 2));
    context.fillStyle = "#00ff00";
    context.fill();
    
    //here are lines
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(400,400);
    context.moveTo(0, 400);
    context.lineTo(400, 0);
    context.stroke();
}

