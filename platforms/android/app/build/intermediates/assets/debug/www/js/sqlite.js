$(document).ready(function() {

    var myDB;
    //Open Database Connection
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite.db", location: 'default' });


        //creation de la table 
        myDB.transaction(function(transaction) {
            // transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
            transaction.executeSql('CREATE TABLE IF NOT EXISTS data (id integer primary key,nom_projet text,nom_agent text,nom_zone text,nom_form text,data json ,zone json)', [],

                function(tx, result) {
                    alert("Table created successfully");
                },
                function(error) {
                    alert("Error occurred while creating the table.");
                });
        });
        // var desc = $("#desc").val();
        // var data = '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-761007.0536072147,4029148.6349682105],[-765058.2161063291,4025632.5316670923],[-756573.7059666745,4022651.4875639705],[-755044.965400971,4028307.8276570733],[-761007.0536072147,4029148.6349682105],[-761007.0536072147,4029148.6349682105]]]},"properties":null}]}'
        //var zone = '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-761007.0536072147,4029148.6349682105],[-765058.2161063291,4025632.5316670923],[-756573.7059666745,4022651.4875639705],[-755044.965400971,4028307.8276570733],[-761007.0536072147,4029148.6349682105],[-761007.0536072147,4029148.6349682105]]]},"properties":null}]}'


        // insert(1, 1, 1, 1, data, zone);
        // remplir_table();
        // seulement pour le teste 
        //$("#data_collect").append("<tr><td> projt_test </td><td> agent_test </td><td> zone_test </td><td>form_test </td><td> data_test </td><td>zone_test</td></tr>");


    };




    //remplissage de la table des donnes
    function remplir_table() {
        // afficher les infos
        $("#data_collect").html("");
        myDB.transaction(function(transaction) {
            transaction.executeSql('SELECT * FROM data', [], function(tx, results) {
                var len = results.rows.length,

                    i;
                // alert(len);
                // $("#table12").append(" <p class='text-muted font-13 m-b-30'> </p> <table id='datatable-responsive' class='table table-striped table-bordered dt-responsive nowrap' cellspacing='0' width='100%'> <thead><tr><th>Date de collecte</th>  <th>Date de modification </th>  <th>Position</th>    <td>data</td></tr></thead><tbody id='data_collect'> </tbody> </table>");
                //  alert("lexecution de la requete");
                //$("#rowCount").html(len);


                var nom_projet;
                var nom_agent;
                var nom_zone;
                var nom_form;




                var url = "http://localhost/php_mobile/name_save.php";
                $.getJSON(url, function(result) {
                    console.log("les ids des projet existes de l'agent 5  ");

                    //console.log(result);
                    $.each(result, function(i, field) {
                        nom_projet = field.nom_projet;
                        nom_agent = field.nom_agent;
                        nom_zone = field.nom_zone;
                        nom_form = field.nom_form;






                        //var id_projet = field.id_projet;
                        // var id_agent_affect = field.id_agent_affect;

                        // alert(id_projet_affect);

                        //    if (id_agent_affect == id_agent_globale) {
                        //  alert(html);
                        // alert("remble");
                        //$("#form_user").append(html);
                        //  console.log("projet  id : " + id_projet);
                        //  $("#homeSubmenu").append(" <li><a href='<a href='#'>#'>" + id_projet_affect + "<i class='fa fa-refresh fa-spin' ></i></a></li>");
                        // $("#homeSubmenu").append(" <li id='" + id_projet_affect + ">" + id_projet_affect + "<i class='fa fa-refresh fa-spin' ></i></a></li>");
                        // $("#homeSubmenu").append(" <li id='" + id_projet_affect + "'>" + id_projet_affect + "<i class='fa fa-refresh fa-spin' ></i></li>");
                        for (i = 0; i < len; i++) {
                            // alert("remplissage " + i);
                            // $("#data_collect").append("<tr><td>Tiger</td> <td>Nixon</td><td>System Architect</td><td>Junior </td></tr>");



                            // seulement pour le teste 
                            //$("#data_collect").append("<tr><td>" + results.rows.item(i).id_projet + "</td><td>" + results.rows.item(i).id_agent + "</td><td>" + results.rows.item(i).id_zone + "</td><td>" + results.rows.item(i).id_form + "</td><td>" + results.rows.item(i).data + "</td><td>" + results.rows.item(i).zone + "</td></tr>");



                            if (results.rows.item(i).id_projet == field.id_projet && results.rows.item(i).id_agent == field.id_agent && results.rows.item(i).id_zone == field.id_zone && results.rows.item(i).id_form == field.id_form) {

                                $("#data_collect").append("<tr><td>" + nom_projet + "</td><td>" + nom_agent + "</td><td>" + nom_zone + "</td><td>" + nom_form + "</td><td>" + results.rows.item(i).data + "</td><td>" + results.rows.item(i).zone + "</td></tr>");

                            }
                        }

                        //  }
                        /* var duration = field.duration;
                                        var price = field.price;
                                        $("#listview").append("<a class='item' href='form.html?id=" + id + "&title=" + title + "&duration=" + duration + "&price=" + price + "'><span class='item-note'>$" + price + "</span><h2>" + title + " </h2><p>" + duration + "</p></a>");
                                    */
                    });
                });














            }, null);
        });



    }

});