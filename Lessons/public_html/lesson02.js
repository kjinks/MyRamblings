/* 
Ken Jinks
April 17 2014
This file contains the lessons for teaching about variables and logic.
First you must learn to walk before you can run.
 */

function startUp() 
{
    //this line gets tells the browser where you want to draw
    var context = document.getElementById("myCanvas").getContext("2d");
    
    //that line up there creates a variable, a variable is a place to 
    //store anything, lets look at that
    //a variable needs a name, above context is the name used it could
    //be anything, bob, joe, shoe
    //lets create a variable called bob and store the value 5 inside
    var bob = 5;
    //now lets create another variable called joe and give him the value 3
    var joe = 3;
    //let us create a new variable called jill and she will be equal
    //to bob plus joe
    var jill = bob + joe;
    //next lets write that value in the browser
    document.write("The variable jill equals :" + jill + "<br>");
    
    //variables can contain words as well, we call them strings, 
    var wendy = "I love mice!";
    //that <br> means break and starts a new line
    document.write(wendy + "<br>");
    //you can add two strings together to make a longer string
    var sam = "I do not like mice.";
    var samAndWendy = sam + wendy;
    document.write(samAndWendy + "<br>");
    
    //sometimes we need to make a decision in programming
    //lets create two variables
    var cake = 32;
    var banana = 32;
    
    //introducing the if statement
    //the > symbol means greater than
    if (cake > banana)
    {
        document.write("Cake is larger<br>");
    }
    else
    {
        document.write("Banana is larger<br>");
    }
    
    //the < symbol means smaller than
    if (cake < banana)
    {
        document.write("Cake is smaller<br>");
    }
    else
    {
        document.write("Banana is smaller<br>");
    }  
    
    //the === symbol means exactly equal to
    if (cake === banana)
    {
        document.write("Cake is the same as banana<br>");
    }
    else
    {
        document.write("Cake is not equal to banana<br>");
    } 
    
    //the <= mean less than or equal to, there is also >= which is 
    //greater or equal to
    if (cake <= banana)
    {
        document.write("Cake is less than or equal to banana<br>");
    }
    else
    {
        document.write("Cake is greater than banana<br>");
    } 
    
    //we can chain ifs
    //what if I put a string here instead of a number?
    //try different values see what happens...
    var pie = "1";
    var alfred = 1;
    
    if (pie > alfred)
    {
        document.write("Pie is greater than alfred<br>");
    }
    else if (pie < alfred)
    {
        document.write("Pie is smaller than alfred<br>");
    }
    else if (pie === alfred)
    {
        document.write("Pie is equal to alfred<br>");
    }
    else if (pie == alfred)
    {
        document.write("Pie is somewhat equal to alfred<br>");
    }
    else
    {
        //will this ever run?
        document.write("What did you do? Why did this happen?<br>");
    }
    
}
