<?php
header("Access-Control-Allow-Origin: *");
include_once("db_connect.php");

/*echo $_POST['nom_add']." | ".$_POST['prenom_add']." | ".$_POST['pseudo_add']." | ". $_POST['password_add']." | ".$_POST['email_add']." | ".$_POST['tele_add']."</br>";*/

$nom_projet=$_POST[ 'nom_projet'];
 $nom_agent=$_POST['nom_agent'];
 $nom_zone=$_POST['nom_zone'];
 $nom_form=$_POST['nom_form'];
$data=$_POST['data'];
 $zone=$_POST['zone'];


//$hash = password_hash($form_pass, PASSWORD_DEFAULT);
 
// Exécution de la requête SQL


//enregistrer le nouveau utilisateur 


	$query="INSERT INTO donnee(nom_projet,nom_agent,nom_zone ,nom_form , data_form  ,zone_form)VALUES ('".$nom_projet."','".$nom_agent."','".$nom_zone."', '".$nom_form."', '".$data."','".$zone."')";

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

