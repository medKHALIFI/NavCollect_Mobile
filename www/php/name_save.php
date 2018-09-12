<?php
header("Access-Control-Allow-Origin: *");
session_start();

include_once('db_connect.php');

$query = "SELECT affectation.*,formulaire.*,projet.*,agent.*,zone_etude.* FROM affectation,formulaire,projet,zone_etude,agent where affectation.id_formulaire_affect=formulaire.id_formulaire and projet.id_projet=affectation.id_projet_affect and agent.id_agent=affectation.id_agent_affect and zone_etude.id_zone = affectation.id_projet_zone ;";
$result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());


$data=array();

while ($row = pg_fetch_object($result)) {
 
    $data[]=$row;
}

echo json_encode($data);

// Libère le résultat
pg_free_result($result);

// Ferme la connexion
pg_close($dbconn);

?>