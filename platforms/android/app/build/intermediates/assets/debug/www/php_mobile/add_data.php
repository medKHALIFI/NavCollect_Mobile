<?php
header("Access-Control-Allow-Origin: *");
include_once("db_connect.php");

/*echo $_POST['nom_add']." | ".$_POST['prenom_add']." | ".$_POST['pseudo_add']." | ". $_POST['password_add']." | ".$_POST['email_add']." | ".$_POST['tele_add']."</br>";*/

$id_projet=$_POST[ 'id_projet'];
 $id_agent=$_POST['id_agent'];
 $id_zone=$_POST['id_zone'];
 $id_form=$_POST['id_form'];
$data=$_POST['data'];
 $zone=$_POST['zone'];


//$hash = password_hash($form_pass, PASSWORD_DEFAULT);
 
// Exécution de la requête SQL


//enregistrer le nouveau utilisateur 


	$query="INSERT INTO donnee(nom_projet,nom_agent,nom_zone ,nom_form , data_form  ,zone_form)VALUES ('".$id_projet."','".$id_agent."','".$id_zone."', '".$id_form."', '".$data."','".$zone."')";

    $result = pg_query($query); 
if ($result == true) {
	echo 2 ;
}
else 
{
	echo 1;
}



// Libère le résultat
pg_free_result($result);

// Ferme la connexion
pg_close($dbconn);
 ?>

