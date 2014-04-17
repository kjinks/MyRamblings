/* 
Ken Jinks
April 17 2014
This file contains the lessons introduces recursion using javascript.
Recursion is just a fancy word for a function that calls itself.
 */

//function      :menger(x, y, height, width, depth)
//parameters    :x, y - the coordinates of the top left corner
//              :height, width - the dimensions of the sponge
//              :depth - the depth of recursion
//              :context - the drawing context
//description   :this function draws a rectangle given the coordinates and
//              :dimension. Then it divides the rectangle into three rows
//              :by three columns and recursively calls itself with the 
//              :eight perimeter rectangles as input until depth = 0
function menger(x, y, width, height, depth, context)
{
    //calculate one third of the rectangle
    var thirdWide = width / 3;
    var thirdHigh = height / 3;
    
    //step through a three by three grid of cells
    for (var cellX = 0; cellX < 3; cellX++)
    {
        var newX = thirdWide * cellX + x;
        
        for (var cellY = 0; cellY < 3; cellY++)
        {
            var newY = thirdHigh * cellY + y;

            if (!( cellX === 1 && cellY === 1))
            {
                if (depth >= 0)
                {
                    context.beginPath();
                    context.rect(newX, newY, thirdWide, thirdHigh);
                    context.stroke();  
                    
                    menger(newX, newY, thirdWide, thirdHigh, depth - 1, context);
                }
            }
        }
    }
}

function startUp() 
{
    //this line gets tells the browser where you want to draw
    var context = document.getElementById("myCanvas").getContext("2d");
    
    menger(0, 0, 400, 400, 4, context);
}