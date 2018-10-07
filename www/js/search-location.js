/** menu de recherche**/
$(document).ready(function() {
    $(".form-control1").css('border-radius', '30px');
    $(".form-control1").css('border', '2px solid #1abb9c');
    $(".form-group1").addClass("sb-search-open");
    $('#search').on("click", (function(e) {
        e.stopPropagation()
    }));

    $(".form-control-submit").click(function(e) {
        $(".form-control1").each(function() {
            if ($(".form-control1").val().length == 0) {
                e.preventDefault();
                $(this).css('border', '2px solid red');
            } else {
                $(this).css('border', '2px solid #1abb9c');
            }
        })
    });
});

/** Les adresses en utilisant l'api de NavCities **/

$("#search-input").on('keyup', function(event) {
    var addrVal = $("#search-input").val();
    if ($("#search-input").val().length) {
        $("#address-bar").show();
        getAddressList(addrVal, 'address-bar', "http://www.navcities.com/api/geocoding/?user=demo&maxNumberOfPois=5&find=");

        if (event.keyCode === 13) {
            $($("#address-list").children(":first")).click();
        }
    } else {
        $("#address-bar").hide();
    }
});

function getAddressList(string, id, url) {
    var res = '';
    $.ajax({
        url: url + string,
        data: {},
        type: 'GET',
        dataType: 'JSON',
        async: true,
        cache: false,
        timeout: 5000,
        success: function(result) {
            var features = result.features;
            if (features.length > 0) {
                res += '<div id="address-list" class="list-group" style="max-height: 200px; overflow-y: auto;">';
                for (var i = 0; i < features.length; i++) {

                    var name = features[i].properties.nom;
                    name = name.replace(/[']/g, "|");
                    if (features[i].properties.typedata == 'POI') {
                        res += '<a href="javascript:void(0)" onclick="getSelectedAddress(\'' + name + '\', ' + features[i].geometry.coordinates[0] + ', ' + features[i].geometry.coordinates[1] + ',\'' + id + '\');" class="list-group-item list-group-item-action"><i class="fas fa-map-pin"></i> ' + features[i].properties.nom + ' ' + features[i].properties.adresse + '</a>';

                    } else if (features[i].properties.typedata == 'Localite') {
                        res += '<a href="javascript:void(0)" onclick="getSelectedAddress(\'' + name + '\', ' + features[i].geometry.coordinates[0] + ', ' + features[i].geometry.coordinates[1] + ',\'' + id + '\');" class="list-group-item list-group-item-action"><i class="fas fa-city"></i> ' + features[i].properties.adresse + '</a>';
                    } else {
                        res += '<a href="javascript:void(0)" onclick="getSelectedAddress(\'' + name + '\', ' + features[i].geometry.coordinates[0] + ', ' + features[i].geometry.coordinates[1] + ',\'' + id + '\');" class="list-group-item list-group-item-action"><i class="fas fa-road"></i> ' + features[i].properties.nom + '</a>';
                    }

                }
                res += '</div>';
                $("#" + id).empty();
                $("#" + id).append(res);
            }
        },
        error: function() {
            swal("Attention", "Veuillez vérifier votre connexion internet et réessayez", "error");
        },
        complete: function() {

        }
    });
}

var mapAdvancedSearch_AddressStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'images/pinMap.png'
    })
});

var mapAdvancedSearch_AddressGeometryVector = new ol.layer.Vector({
    name: 'MapAdvancedSearch_Address',
    source: new ol.source.Vector(),
    style: mapAdvancedSearch_AddressStyle
});

function getSelectedAddress(name, longitude, latitude, id) {
    $("#address-bar").hide();
    $('#searchLocation-modal').modal('hide');
    mapAdvancedSearch_AddressGeometryVector.getSource().clear();
    name = name.replace(/[|]/g, "'");

    var point_pos_search_inp = new ol.geom.Point(
        ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
    );

    var point_position_search_inp = new ol.Feature(point_pos_search_inp);
    mapAdvancedSearch_AddressGeometryVector.getSource().addFeature(point_position_search_inp);
    var defaultCenter = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');

    view.animate({
        center: defaultCenter,
        duration: 2000,
        zoom: 17
    });

}

map.addLayer(mapAdvancedSearch_AddressGeometryVector);