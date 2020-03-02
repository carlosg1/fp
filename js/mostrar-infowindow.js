/**
 * 
 * Extiendo la clase L.WMS.source
 * Actualizado: 03/02/2020
 * Developer: Lic. Carlos Garcia
 * Contacto: carlosgctes@gmail.com
 * 
 */

 let marcaTramo = undefined;
 let latlon = undefined;

function nvl(p) {
  
  if ( p === null ) {

    return '';

  }

  return p;

}

function formatoFecha(f){
  return (f === "" ? "" : (f.substr(8, 2) + '/' + f.substr(5, 2) + '/' + f.substr(0, 4)));
}

var wms_GIS = L.WMS.Source.extend({

    'showFeatureInfo': function(latlng, info) {

        //verifica usuario
        if(usuario == undefined){
          alert('Debe ingresar con su usuario para poder editar el mapa.');
          return false;
        }

        latlon = latlng;

        if (!this._map){
            return;
        }

        if ( info == '' ) return false;

        var datos1 = undefined;
  
        var datos = JSON.parse(info);

        /* que layer */
        //var queLayer = datos.features[0].gid.split('.');

        //var geomTramo = recuperaGeometriaIdTramo(datos.features[0].properties.gid);

        /*
         * forever pipes
         */

        //if(queLayer[0] == "vw_plan_hidrico_ubicacion_camion"){
          datos1 = '<div><h3>Graba ubicaci&oacute;n Cami&oacute;n</h3></div>';
         //datos1 += '<div>';
         // datos1 += '<div class="alert alert-primary" role="alert">';
         // datos1 += '  <b>ID:</b> ' + datos.features[0].properties['gid'];
         // datos1 += ' - <b>Calle: </b>' + datos.features[0].properties['NAM'];
         // datos1 += '</div>';
          //datos1 += '  <input id="divIdCalles" type="hidden" value="' + datos.features[0].properties['gid'] + '" />';

          // campo sobrestante
          datos1 += '  <div class="form-group style="padding: 7px 0px;">';
          datos1 += '    <span><b>Camion:</b></span>'
          datos1 += '    <select class="form-control" id="idCamion">';
          datos1 += '      <option value="-">Seleccione...</option>';

          camion.forEach(
            function(element, index, array){
              datos1 += '<option value="' + index + '">' + element + '</option>';
              console.log(element); 
          });

          datos1 += '    </select>';
          datos1 += '  </div>';

          // campo fecha 
          datos1 += '<div class="form-group">';
          datos1 += '  <span><b>Fecha intervenci&oacute;n:</b></span>';
          datos1 += '  <input class="form-control" id="fecha_camion" type="date" value="" placeholder="Ingrese una fecha" /> ';
          datos1 += '</div>';

          // campo avance
          datos1 += '<div class="form-group">';
          datos1 += '  <span><b>% avance:</b></span>';
          datos1 += '  <input class="form-control" id="avance" type="number" value="0" min="0" max="100" placeholder="Ingrese un porcentaje" /> ';
          datos1 += '</div>';

          // campo observacion 
          datos1 += '<div class="form-group">';
          datos1 += '  <span><b>Observacion:</b></span>';
          datos1 += '  <textarea class="form-control rouded-1" id="observacion" rows="3"></textarea>';
          datos1 += '</div>';

          // boton Grabar
          datos1 += '  <div class="form-group">';
          datos1 += '    <button class="btn btn-secondary mt-4" id="cancelaSerPub">Cancelar</button>';
          datos1 += '    <button class="btn btn-primary mt-4" id="grabaSerPub">Grabar</button>';
          datos1 += '  </div>';

        //}

        // verifico si hay datos que mostrar
        if (datos1 != undefined) {

          datos1 += '<div style="border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f;">DIR. GRAL. DE S.I.G.</div>';

          this._map.openPopup(datos1, latlng, { 
            "closeButton": false,
            "closeOnClick": false,
            "minWidth": 365 /* ,
            "maxHeight": 400 */
          });

          $("#grabaSerPub").click(function(e) { return grabaServicioPublico(e); });

        } else {

          console.log('mostrar-infowindow.js - ', 'falta infowindow() para la capa: ', queLayer[0])

          // alert('Atributos desactivados para la capa ' + queLayer[0]);

        }
    } /* ,

    'ajax': function(url, callback) {
        ajax.call(this, 'curl.php?url='+url, callback);
    }
  */

  })
  
  function leerAjax(url, callback) {
    var context = this,
        request = new XMLHttpRequest();

    request.onreadystatechange = change;
    request.open('GET', 'curl.php?url=' + url);
    request.send();
  
    function change() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback.call(context, request.responseText);
        } else {
          callback.call(context, "error");
        }
      }
    }
  };

  function grabaServicioPublico(evt) {

    var datos = 'idCamion='  +  $('#idCamion').val();
    datos += '&fechaCamion=' + $('#fecha_camion').val();
    datos += '&avance='      + $('#avance').val();
    datos += '&observacion=' + $('#observacion').val();
    datos += '&lat='         + latlon.lat;
    datos += '&lng='         + latlon.lng;

    let iconoCamion = L.icon({
      iconUrl: 'http://190.7.30.142/idemcc/images/icon/camion-fp128.png',
      iconSize:     [57, 147], // size of the icon
    })

    $.ajax({
      type: "POST",
      url: 'graba_camion.php',
      data: datos,
      async: false, // La petición es síncrona
      cache: false, // No queremos usar la caché del navegador
      dataType: 'text',

      success: function(response){

        var resp = response.split('|');

        switch(resp[0]){
          case 'exito':

            alert(resp[1]);

            $('.leaflet-popup').remove();

            L.Marker(latlon).addTo(map);

          case 'error':

            alert(resp[1]);

          case 'info':

            alert(resp[1]);

            $('.leaflet-popup').remove();

            // L.marker([latlon.lng, latlon.lat],{
            //   icon: 'http://190.7.30.142/idemcc/images/icon/camion-fp128.png',
            //   title: 'Ubicacion del camión'
            // }).addTo(map);

            var marcador = L.marker([latlon.lng, latlon.lat],{
              icon: iconoCamion
            });

            map.addLayer(marcador);

        }
      }
    });

    return false;
  }
  
  function leeSobrestante() {

    $.ajax({

      type: "POST",

      url: 'lee_sobrestante.php',

      data: datos,

      success: function(response){

        var resp = response.split('|');

        switch(resp[0]){

          case 'exito':

            alert(resp[1]);

            $('.leaflet-popup').remove();

          case 'error':

            alert(resp[1]);

          case 'info':

            alert(resp[1]);

            $('.leaflet-popup').remove();

        }

      },

      dataType: 'text'

    });

  }

  function recuperaGeometriaIdTramo(id_tramo) {

    if (marcaTramo != undefined) {

      marcaTramo.remove();

    }

    $.ajax({

      type: 'POST',

      url: 'consulta_tramo_calle.php',

      data: 'a=' + id_tramo,

      success: function(response) {

        var estilo = {"color": "#FFF916", "weight": 5, "opacity": 0.7}

        marcaTramo = L.geoJSON(JSON.parse(response), {
          style: estilo
        }).addTo(map);

      }

    })
  }