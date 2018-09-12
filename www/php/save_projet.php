<?php 
include_once("db_connect.php");
session_start(); 



$id_admin = $_SESSION['id_admin'];
$id_form = $_POST['id_form'];
$nomProjet =$_POST['nomProjet'];
$descProjet =$_POST['descProjet'];
$agentZone =$_POST['agentZone'];

$array ;

$lengeur =count($agentZone) ;
$temp1 = 0;
for ($row = 0; $row < $lengeur/2 ; $row++) {
   $temp = $row*2;
   $temp1 =0 ;
    for ($col = $temp; $col < $temp+2; $col++) {

       $array[$row][$temp1] =  $agentZone[$col];
     
       $temp1 ++ ;
    }
}

    $lengeur = count($array);

    for ($row = 0; $row < $lengeur ; $row++) {
         for ($col = 0; $col < 2; $col++) {
     echo  ("\n array[".$row."][".$col."]=".$array[$row][$col]." " );
         }
        }


$data=to_pg_array(array_values(array_filter($array)));

function to_pg_array($set) {

    settype($set, 'array');
    
    $result = array();
    
    foreach ($set as $t) {
    
    if (is_array($t)) {
    
    $result[] = to_pg_array($t);
    
    } else {
    
    $t = str_replace('"', '\\"', $t);
    
    if (! is_numeric($t))
    
    $t = '"' . $t . '"';
    
    $result[] = $t;
    
    }
    
    }
    
    return '{' . implode(",", $result) . '}';
    
    }
echo $data ; 

$query = "INSERT INTO projet( id_admin, id_formulaire, titre, description_projet, date_creation_prj,date_modification_prj,agent_zone)VALUES ('$id_admin','$id_form','$nomProjet','$descProjet',now(),now(),'$data')";
$result = pg_query($query); 


if ($result) {
    echo "resultat de la requete";
    echo 1;
	pg_free_result($result);
}
pg_close($dbconn);


 ?>