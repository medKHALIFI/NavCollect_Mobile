$(document).ready(function() {

    // GLOBAL VARIABLES
    var nom_agent;
    var nom_projet;
    var nom_zone;
    var nom_form;
    var data;
    var zone;
    var id_projet_globale = decodeURI(getUrlVars()["id_projet"]);
    var id_agent_globale = decodeURI(getUrlVars()["id_agent"]);
    var id_zone_globale = decodeURI(getUrlVars()["id_zone"]);
    var id_form_globale = decodeURI(getUrlVars()["id_form"]);
    var geojson = decodeURI(getUrlVars()["geojson"]);

    var url = "http://192.168.1.199/php/get_forms.php";
    $.getJSON(url, function(result) {
        $.each(result, function(i, field) {

            var id_projet_affect = field.id_projet_affect;
            var id_agent_affect = field.id_agent_affect;
            var id_formulaire_affect = field.id_formulaire_affect;
            var id_projet_zone = field.id_projet_zone;

            if (id_agent_affect == id_agent_globale && id_projet_affect == id_projet_globale && id_projet_zone == id_zone_globale && id_formulaire_affect == id_form_globale) {
                nom_agent = field.nom_agent;
                nom_projet = field.titre;
                nom_zone = field.nom_zone;
                nom_form = field.nom_form;
            }
        });
    });

    //GET FORM
    $("#form_contenu").html(" ");
    var url = "http://192.168.1.199/php/get_form_html.php";
    $.getJSON(url, function(result) {
        //alert(result);

        $.each(result, function(i, field) {
            var id_formulaire = field.id_formulaire;
            var champs = field.champs;
            if (id_form_globale == id_formulaire) {
                $("#form_contenu").html(champs);
            }
        });
    });
    //Save button
    $("#save_data").click(function() {

        data = JSON.stringify($("#idform").serializeArray());

        swal({
            title: 'Êtes-vous sûr des données?',
            text: "Vous ne pourrez pas revenir en arrière!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1ABB9C',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Confirmer',
            animation: false,
            customClass: 'animated swing',
            cancelButtonText: 'annuler'
        }).then((result) => {
            if (result.value) {
                //Send to SQLIte database
                myDB.transaction(function(transaction) {
                    var executeQuery = "INSERT INTO data (nom_projet,nom_agent,nom_zone ,nom_form ,data  ,zone ) VALUES (?,?,?,?,?,?)";
                    transaction.executeSql(executeQuery, [nom_projet, nom_agent, nom_zone, nom_form, data, geojson], function(tx, result) {
                            //  SUCCESS MESSAGE
                            swal({
                                position: 'center',
                                type: 'success',
                                title: 'Les données ont bien été enregistrées',
                                showConfirmButton: false,
                                animation: false,
                                customClass: 'animated zoomInUp',
                                timer: 1500
                            });

                            $("#save_data").prop('disabled', true);
                        },
                        function(error) {
                            alert('Error occurred');
                        });
                });
                setTimeout(function() {
                    url = 'data.html';
                    location.replace(url);
                }, 1500);
            }
        })
    });
    //RESET FORM
    $("#refresh").click(function() {
        $("#idform").trigger("reset");
    });

    var myDB;
    //Open Database Connection
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        myDB = window.sqlitePlugin.openDatabase({
            name: "mySQLite.db",
            location: 'default'
        });

        //creation de la table 
        myDB.transaction(function(transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS data (id integer primary key,nom_projet text,nom_agent text,nom_zone text,nom_form text,data json ,zone json)', [],

                function(tx, result) {},
                function(error) {
                    alert("Error occurred while creating the table.");
                });
        });
    }
});

function go_home() {
    url = 'index.html';
    location.replace(url);
}

function go_data() {
    url = 'data.html';
    location.replace(url);
}