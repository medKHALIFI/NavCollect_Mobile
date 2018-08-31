<?php
include_once("db_connect.php");

/*echo $_POST['nom_add']." | ".$_POST['prenom_add']." | ".$_POST['pseudo_add']." | ". $_POST['password_add']." | ".$_POST['email_add']." | ".$_POST['tele_add']."</br>";*/

$nom=$_POST['nom_add'];
$prenom=$_POST['prenom_add'];
$username = $_POST['pseudo_add'];
$password = $_POST['password_add'];
$email=$_POST['email_add'];
$tele=$_POST['tele_add'];

//$hash = password_hash($form_pass, PASSWORD_DEFAULT);
 
// Exécution de la requête SQL
$query = "SELECT * FROM agent where pseudo_agent= '$username' ";
$result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

//enregistrer le nouveau utilisateur 
if (pg_num_rows($result) == 0) {

	$query="INSERT INTO agent(nom_agent,prenom_agent,pseudo_agent,password_agent, email_agent, tele_agent, date_creation_agent, date_modification_agent, id_admin )VALUES ('".$nom."','".$prenom."','".$username."', '".$password."', '".$email."','".$tele."', now(), now(), 1)";

	$result = pg_query($query); 
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

