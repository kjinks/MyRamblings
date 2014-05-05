<?php
#Ken Jinks
#April 19 2014
#This file contains the php script for kenjinks.com

#function       :fileToString($filename)
#parameters     :$filename - the name of the file to load into a string
#description    :this function loads a file into a string and returns that
#               :string
#returns        :a string containing the file contents
function fileToString($filename)
{
    $f2sString = file_get_contents($filename);
    
    return $f2sString;
}

#function       :getLogo()
#description    :loads the svg logo file into a string
function getLogo()
{
    return fileToString("kenJinks100pct.svg");
}

#function       :getMenu()
#description    :loads the svg menu file into a string
function getMenu()
{
    return fileToString("kenJinksComMenu100wide.svg"); 
}


?>
<!-- Ken Jinks April 21 2014 -->
<!DOCTYPE html>
<html>
    <head>
        <title>Ken Jinks</title>
        <script type="text/javascript" src="main.js"></script>
        <script type="text/javascript" src="theArtOTron.js"></script>
        <style>
            body
            {
                background-color:#e4edf4;
            }
            #mainPanel
            {
                position : fixed;
                top      : 30%;
                left     : 0;
                width: 80%;
                height: 50%;  
                margin:10%; 
                padding:0;
                z-index:20;
                background-color:#e4edf4;
            }
            canvas
            {
                box-shadow: 15px 10px 20px #444444; 
            }
            .center 
            {
                position: absolute;       /* take element out of the normal page flow! */
                top: 0px;                /* position the element vertically using top or bottom
                                             and define width as you like:*/
                width: 60%;   
                left: 0;                  /* set left and right to the same value! */
                right: 0;
                margin-left: auto;        /* adding auto-margins left and right will
                                             center the element horizontally!*/
                margin-right: auto;
            }

            .prompt 
            {
                position: absolute;       /* take element out of the normal page flow! */
                top: -20%;                /* position the element vertically using top or bottom
                                             and define width as you like:*/
                width: 80%;   
                left: 0;                  /* set left and right to the same value! */
                right: 0;
                margin-left: auto;        /* adding auto-margins left and right will
                                             center the element horizontally!*/
                margin-right: auto;
                text-align: center;
                z-index:22;
            }
        </style>
    </head>
    <body onload="startUp();" onresize="startUp();">
        <div id="mainPanel">
            
        </div>
    </body>
</html>

<?php 
#echo var_dump(getDirectoryList("."));
#echo phpversion();
echo getLogo(); 
echo getMenu();

?>