<?php
header("Access-Control-Allow-Origin: *");
session_start();

include_once('db_connect.php');

//$query = "SELECT  * FROM projet where id_projet = '2' and agent_zone[1][1]='2' ;";
//$query = "SELECT  * FROM projet ;";
$query = "SELECT  id_agent FROM agent ;";


$result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());


$data=array();

//$arr = pg_fetch_all($result);

//print_r($arr);
$temp;

while ($row = pg_fetch_row($result)) {
    /*echo "<br>"; 
    echo "<br>"; 
    print_r($arr);
//while ($row = pg_fetch_object($result)) {
   // $data[]=$row;
   // $row = pg_fetch_row($result);
   echo $row[0];
   echo "<br>"; 
   echo $row[1];
    echo "<br>";
    echo $row[2];
    echo "<br>";
    echo $row[3];
    echo "<br>";
    echo $row[4];
    echo "<br>"; 
    echo $row[5];
    echo "<br>"; 
    echo $row[6];
    echo "<br>"; 
    echo $row[7];
    echo "<br>"; 
    echo gettype($row[7]); 
    //$array1 = pg_fetch_array($row[7]);
   
    $lengeur = count($array1);
    
   
    /*
    for ($row1 = 1; $row1 < $lengeur+1 ; $row1++) {
         for ($col = 1; $col < 3; $col++) {
     echo  ("\n array[".$row1."][".$col."]=".$array[$row1][$col]." " );
         }
        }
*/
//echo $row[0] ;
$temp =$row[0];
   
}
echo $temp ;


//echo json_encode($data);

// Libère le résultat
pg_free_result($result);

// Ferme la connexion
pg_close($dbconn);

?>