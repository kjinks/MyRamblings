<?php
/*
Ken Jinks
 April 20 2014
 This file contains the fileServer. This will return the contents of 
 a file given an index and category. This will look into the category directory, 
 create an array of files, and given the value in the query string output the 
 contents of the file at the index of the value.
  */

//function      :getDirectoryList($directory)
//parameters    :$directory - the path of the directory
//description   :this function creates an array of file names that are 
//              :discovered in the directory
//returns       :an array of filenames
function getDirectoryList($directory)
{
    $directoryList = array();
    if (is_dir($directory))
    {
        $dirHandle = opendir($directory);
        if ($dirHandle !== false)
        {      
            do
            {
                $file = readdir($dirHandle); 
                if (is_dir($file) === false && $file !== false)
                {
                    array_push($directoryList, $file);
                }
            }while ($file !== false);
            
            closedir($dirHandle);
        }
    }
    
    return $directoryList;
}

$directory = "./";

$category = $_GET["category"];
$index = $_GET["index"];

switch ($category)
{
    case "home":
        $directory = "./home/";
        break;
    case "contact":
        $directory = "./contact/";
        break;
}

$files = getDirectoryList($directory);

//return the file at the index
echo file_get_contents($directory.$files[abs($index) % count($files)]);
?>
