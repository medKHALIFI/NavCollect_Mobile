<?php
header("Access-Control-Allow-Origin: *");
session_start();

include_once('db_connect.php');

$query = "SELECT DISTINCT affectation.id_affect,affectation.id_geom_affect,affectation.id_projet_affect,affectation.id_agent_affect,affectation.id_projet_zone,affectation.id_formulaire_affect,formulaire.id_formulaire,formulaire.nom_form,agent.id_agent,agent.nom_agent,projet.id_projet,projet.titre, zone_etude.id_zone,zone_etude.nom_zone FROM affectation,formulaire,agent,projet,zone_etude where affectation.id_formulaire_affect=formulaire.id_formulaire and projet.id_projet=affectation.id_projet_affect and agent.id_agent=affectation.id_agent_affect and zone_etude.id_zone = affectation.id_projet_zone ;";
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