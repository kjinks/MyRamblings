/* 
Ken Jinks
April 17 2014
This file contains the lessons for teaching about loops and functions.
 */

//at the beginning you may have seen the word function before startUp
//that is because startUp is a function
//a function is a small program that your program can run when it needs to
// -it can take variables as input and give you new variables
// -it must be created before it is used
// -you name it and its parameters, the parameters are the variables you give 
//  it when you use the function
function pickle(ginger, hamburger)
{
    var combo = ginger + hamburger;
    
    return combo;
}

function potato(numberOfPotatoes)
{
    for (var p = 0; p < numberOfPotatoes; p++)
    {
        document.write("potatoe, ");
    }
    
    document.write("<br>");
}

function startUp() 
{
    //this line gets tells the browser where you want to draw
    var context = document.getElementById("myCanvas").getContext("2d");
    
    var happy = 6;
    //call the function pickle and give it some parameters, 
    //give ther result to cheer
    var cheer = pickle(5, happy);
    
    document.write("Cheer equals " + cheer + "<br>");
    
    var eye = 0;
    var max = 3;
    
    //while statements are like if statements except they keep
    //doing the same thing over and over if the statement is true
    while (eye < max)
    {
        document.write("Eye equals " + eye + "<br>");
        eye = eye + 1; 
    }
    
    // do ... while statement repeat the last statement if
    //the while statement is true
    do
    {
        document.write("Eye equals " + eye + "<br>");
        eye = eye - 1;
    } while (eye >= 0);
    
    //a for loop is a little program
    //the first part, var tiger = 0; is the start
    //it will repeat the code until the second part is true, tiger < max;
    //and each time it runs the code it will run the 
    //third part, tiger++, which means add one to tiger, 
    //we could write tiger = tiger + 1 and it would do the same thing
    //we use these as counters tyically but you can use them however you need
    for (var tiger = 0; tiger < max; tiger++)
    {
        var blue = pickle(tiger, happy);
        document.write("Blue equals " + blue + "<br>");
        potato(blue);
    }
}


