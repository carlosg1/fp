/**
 * 
 * Extiendo la clase L.WMS.source
 * Actualizado: 17/01/2020
 * Developer: Lic. Carlos Garcia
 * Contacto: carlosgctes@gmail.com
 * 
 */

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
        if (!this._map){
            return;
        }

        if ( info == '' ) return false;

        var datos1 = undefined;
  
        var datos = JSON.parse(info);

        /* que layer */
        var queLayer = datos.features[0].id.split('.');

       

        // Inmuebles de valor patrimonial
        if(queLayer[0] == "vw_edificios_historicos") {
          datos1 = '<div><h2>Inmuebles de valor patrimonial</h2></div>';
          datos1 += '<span class="prompt1">Adrema:</span> ' + datos.features[0].properties['adrema'];
          datos1 += '<BR />' + '<span class="prompt1">Manzana:</span> ' + datos.features[0].properties['mzd'];
          datos1 += '<BR />' + '<span class="prompt1">Lote:</span> ' + datos.features[0].properties['lote'];
          datos1 += '<BR />' + '<span class="prompt1">Calle:</span> ' + datos.features[0].properties['calle'];
          datos1 += '<BR />' + '<span class="prompt1">Altura:</span> ' + datos.features[0].properties['altura'];
          datos1 += '<BR />';

          if(datos.features[0].properties['catalogo'] != null) {
            datos1 += '<BR />' + '<span class="titulo1">Informaci&oacute;n relacionada</span>';
            datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/catalogo_edificios_historicos/' + datos.features[0].properties['catalogo'] + '.pdf">pdf ' + datos.features[0].properties['catalogo'] + '</a>';
          }

          if (datos.features[0].properties['foto_num'] != null) {
            datos1 += '<div style="width:300px;height:164px;border: #666 solid 2px;"><img border="0" width="300" height="164" src="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/fotos_edificios_historicos/' + datos.features[0].properties['foto_num'] + ' .png" /></div>';
          }
        }

        /*
         * Informacion municipal
         */

        // centros de pago
        if(queLayer[0] == "vw_centros_de_pago"){
          datos1 = '<div><h2>Centros de pago</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegado'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Dependencias municipales
        if(queLayer[0] == "vw_dependencias_municipales"){
          datos1 = '<div><h2>Dependencias municipales</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // link Dependencias municipales
        if(queLayer[0] == "vwlnk_dependencias_municipales"){
          datos1 = '<div><h2>Dependencias municipales</h2></div>';
          datos1 += '<span class="prompt1">Instituci&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          // datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['domicilio'];
        }

        /*
         * Estadistica y censo
         */
        // Poblacion
        if(queLayer[0] == "vw_poblacion"){
          datos1 = '<div><h2>Densidad de Poblaci&oacute;n</h2></div>';
          datos1 += '<span class="prompt1">Var&oacute;n:</span> ' + datos.features[0].properties['varon'];
          datos1 += '<BR />' + '<span class="prompt1">Mujer:</span> ' + datos.features[0].properties['mujer'];
          datos1 += '<BR />' + '<span class="prompt1">Total poblac.:</span> ' + datos.features[0].properties['total_poblacion'];
          datos1 += '<BR />' + '<span class="prompt1">Hogares:</span> ' + datos.features[0].properties['hogares'];
          datos1 += '<BR />' + '<span class="prompt1">Viviendas partic.:</span> ' + datos.features[0].properties['viviendas_particulares'];
        }

        // densidad de poblacion
        if(queLayer[0] == "vw_densidad_de_poblacion"){
          datos1 = '<div><h2>Poblaci&oacute;n</h2></div>';
          datos1 += '<span class="prompt1">Var&oacute;n:</span> ' + datos.features[0].properties['varon'];
          datos1 += '<BR />' + '<span class="prompt1">Mujer:</span> ' + datos.features[0].properties['mujer'];
          datos1 += '<BR />' + '<span class="prompt1">Total poblac.:</span> ' + datos.features[0].properties['total_poblacion'];
          datos1 += '<BR />' + '<span class="prompt1">Hogares:</span> ' + datos.features[0].properties['hogares'];
          datos1 += '<BR />' + '<span class="prompt1">Viviendas partic.:</span> ' + datos.features[0].properties['viviendas_particulares'];
          datos1 += '<BR />' + '<span class="prompt1">Superficie:</span> ' + datos.features[0].properties['superficie'];
          datos1 += '<BR />' + '<span class="prompt1">Densidad poblaci&oacute;n:</span> ' + datos.features[0].properties['densidad_poblacion'];
        }

        /*
         * Desarrollo social comunitario 
         */

        // centros de integracion comunitario
        if(queLayer[0] == "vw_cic"){
          datos1 = '<div><h2>Centro de Integraci&oacute;n Comunitario</h2></div>';
          datos1 += '<span class="prompt1">Nombre:</span> ' + datos.features[0].properties['cic'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Delegaciones municipales
        if(queLayer[0] == "vw_delegaciones_municipales"){
          datos1 = '<div><h2>Delegaci&oacute;n Municipal</h2></div>';
          datos1 += '<span class="prompt1">Zona:</span> ' + datos.features[0].properties['numero_zona'];
          datos1 += '<BR />' + '<span class="prompt1">Delegaci&oacuten:</span> ' + datos.features[0].properties['nombre_delegacion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegados'];
        }

        // Salon de usos multiples
        if(queLayer[0] == "vw_sum"){
          datos1 = '<div><h2>Sal&oacute;n de uso m&uacute;ltiple</h2></div>';
          datos1 += '<span class="prompt1">S.U.M.:</span> ' + datos.features[0].properties['sum'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // zonas municipales
        if(queLayer[0] == "vw_zonas_municipales"){
          datos1 = '<div><h2>Zonas municipales</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['delegacion'];
          datos1 += '<BR />' + '<span class="prompt1">Delegado:</span> ' + datos.features[0].properties['delegado'];
          datos1 += '<BR />' + '<span class="prompt1">Tel&eacute;fono:</span> ' + datos.features[0].properties['teléfono'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        /*
         * Salud 
         */

         // caps
         if(queLayer[0] == "vw_caps"){
          datos1 = '<div><h2>C.A.P.S.</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // saps
        if(queLayer[0] == "vw_saps_municipales"){
          datos1 = '<div><h2>S.A.P.S.</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Centros de salud
        if(queLayer[0] == "vw_centros_de_salud"){
          datos1 = '<div><h2>Centros de Salud</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // farmacias
        if(queLayer[0] == "vw_farmacias"){
          datos1 = '<div><h2>Farmacias</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // hospitales
        if(queLayer[0] == "vw_hospitales"){
          datos1 = '<div><h2>Hospitales</h2></div>';
          datos1 += '<span class="prompt1">Delegaci&oacute;n:</span> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<span class="prompt1">Tipo:</span> ' + datos.features[0].properties['tipo'];
          datos1 += '<BR />' + '<span class="prompt1">Direcci&oacute;n:</span> ' + datos.features[0].properties['direccion'];
        }

        // Areas programaticas salud
        if(queLayer[0] == "vw_areas_program&aacute;ticas_saps"){
          datos1 = '<div><h2>Areas programaticas Salud</h2></div>';
          datos1 += '<span class="prompt1">Zona:</span> ' + datos.features[0].properties['zona'];
          datos1 += '<BR /><BR />';
        }

        /**
         * Corredor vial
         */
        // carga y descarga
        if(queLayer[0] == "vw_corredor_vial_carga_descarga"){
          datos1 = '<div><h2>Areas de carga y descarga</h2></div>';
          datos1 += '<span class="prompt1">Ubicaci&oacute;n:</span> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<br><span class="prompt1">Descripc&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
          datos1 += '<BR /><BR />';
        }

        // Prohibicion de estacionar
        if(queLayer[0] == "vw_corredor_vial_prohibido_estacionar"){
          datos1 = '<div><h2>Prohibido estacionar</h2></div>';
          datos1 += '<span class="prompt1">Ubicaci&oacute;n:</span> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<br><br><span class="prompt1">Descripc&oacute;n:</span> ' + datos.features[0].properties['descripcion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
          datos1 += '<BR /><BR />';
        }
        

        // estacionamiento para motos
        if(queLayer[0] == 'vw_estacionamiento_moto'){
          datos1 = '<div><span style="float:right";>';
          datos1 += '<img style="display: inline;" height="46" alt="Estacionamiento para motos" src="images/icon/estacionamiento_moto1.png" />';
          datos1 += '</span><h2>Estacionamiento para motos</h2></div>';
          datos1 += '<b>Ubicaci&oacute;n:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<BR />' + '<b>Descripci&oacute;n:</b> ' + datos.features[0].properties['descripcion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // estacionamiento medido
        if(queLayer[0] == 'vw_estacionamiento_medido'){
          datos1 = '<div><span style="float:right";>';
          datos1 += '<img style="display: inline;" height="36" alt="Estacionamiento Medido" src="images/icon/estacionamiento-medido.png" />';
          datos1 += '</span><h2>Estacionamiento medido</h2></div>';
          datos1 += '<b>Calle:</b> ' + datos.features[0].properties['calle'];
          datos1 += '<BR />' + '<b>Altura:</b> ' + datos.features[0].properties['altura'];
          datos1 += '<BR />' + '<b>Institucion:</b> ' + nvl(datos.features[0].properties['institucion']);
          datos1 += '<BR />' + '<b>Garage:</b> ' + nvl(datos.features[0].properties['garage']);
          datos1 += '<BR />' + '<b>Espacio reservado Moto (mts):</b> ' + nvl(datos.features[0].properties['espacio_reservado_moto']);
          datos1 += '<BR />' + '<b>Giro de colectivos (mts):</b> ' + nvl(datos.features[0].properties['giro_transporte']);
          datos1 += '<BR />' + '<b>Carga y Descarga (mts):</b> ' + nvl(datos.features[0].properties['carga_descarga']);
          datos1 += '<BR />' + '<b>Ascenso y Descenso pasajeros (mts):</b> ' + nvl(datos.features[0].properties['ascenso_descenso']);
          datos1 += '<BR />' + '<b>Parada transporte publico (mts):</b> ' + nvl(datos.features[0].properties['parada_transporte']);
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        /*
         * Transporte
         */

        // falta cargar puntos recarga sube
        if(queLayer[0] == "vw_puntos_recarga_sube"){
          datos1 = '<div><h2>Puntos de recarga SUBE</h2></div>';
          datos1 += '<b>Terminal:</b> ' + datos.features[0].properties['descripcion'];
          datos1 += '<BR />' + '<b>Direcci&oacute;n:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Horario Atenci&oacute;n:</b> ' + datos.features[0].properties['horario_atencion'];
          datos1 += '<BR />' + '<b>T&eacute;lefono:</b> ' + datos.features[0].properties['totem_digital'];
          datos1 += '<BR />' + '<b>Responsable:</b> ' + datos.features[0].properties['estado'];
        }

        // recorrido total colectivos
        if(queLayer[0] == 'vw_recorrido_total_colectivo'){
          datos1 = '<div><span style="float:right";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/recorrido-colectivo.png" /></span><h2>Recorrido todas la l&iacute;neas</h2></div>';
          datos1 += '<b>Linea:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<BR />' + '<b>Ramal:</b> ' + datos.features[0].properties['ramal'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Estacionamiento privado
        if(queLayer[0] == 'vw_estacionamiento_privado'){
          datos1 = '<div><span style="float:right";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/estacionamiento-privado.png" /></span><h2>Estacionamiento Privado</h2></div>';
          datos1 += '<b>Calle:</b> ' + datos.features[0].properties['descripcio'];
          datos1 += '<BR />' + '<b>Puerta:</b> ' + datos.features[0].properties['puerta'];
          datos1 += '<BR />' + '<b>Piso:</b> ' + datos.features[0].properties['piso'];
          datos1 += '<BR />' + '<b>Barrio:</b> ' + datos.features[0].properties['barrio'];
        }

        // paradas de colectivo urbano
        if(queLayer[0] == 'vw_paradas_colectivos'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="36" alt="Estacionamiento Privado" src="images/icon/pin-verde-1.png" /></span><h2>Parada Colectivo</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['tipo_recorrido'];
          datos1 += '<BR />' + '<b>Linea / Ramal:</b> ' + datos.features[0].properties['linea_ramal'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        /***
         * Recorridos por ramal
         */

         // recorrido ramal 101 B
         if(queLayer[0] == 'recorrido_ramal_101_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 101 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 101 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 101 C
         if(queLayer[0] == 'recorrido_ramal_101_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 101 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 101 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 102 A
        if(queLayer[0] == 'recorrido_ramal_102_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 102 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 102 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 102 B
        if(queLayer[0] == 'recorrido_ramal_102_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 102 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 102 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

         // recorrido ramal 103 A
         if(queLayer[0] == 'recorrido_ramal_103_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 B
        if(queLayer[0] == 'recorrido_ramal_103_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 C Directo
        if(queLayer[0] == 'recorrido_ramal_103_C_directo'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 C Directo" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 C Directo</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 C - Esperanza - Dr. Montaña
        if(queLayer[0] == 'recorrido_ramal_103_C_esperanza_montania'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 C Esperanza - Dr. Montaña" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 C - Esperanza - Dr. Montaña</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 103 D
        if(queLayer[0] == 'recorrido_ramal_103_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 103 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 103 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 A
        if(queLayer[0] == 'recorrido_ramal_104_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 B
        if(queLayer[0] == 'recorrido_ramal_104_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 C
        if(queLayer[0] == 'recorrido_ramal_104_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 104 D
        if(queLayer[0] == 'recorrido_ramal_104_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 104 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 104 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 A
        if(queLayer[0] == 'recorrido_ramal_105_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 B
        if(queLayer[0] == 'recorrido_ramal_105_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 105 C 250 viv
        if(queLayer[0] == 'recorrido_ramal_105_C_250_viv'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 105 C 250 Viv." src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 105 C 250 Viv.</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 A
        if(queLayer[0] == 'recorrido_ramal_106_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 B
        if(queLayer[0] == 'recorrido_ramal_106_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 C
        if(queLayer[0] == 'recorrido_ramal_106_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 106 D
        if(queLayer[0] == 'recorrido_ramal_106_D'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 106 D" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 106 D</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 108 AB
        if(queLayer[0] == 'recorrido_ramal_108_AB'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 108 AB" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 108 AB</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 108 C
        if(queLayer[0] == 'recorrido_ramal_108_C'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 108 C" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 108 C</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 109 A laguna soto
        if(queLayer[0] == 'recorrido_ramal_109_A_Laguna_Soto'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 109 A Laguna Soto" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 109 A Laguna Soto</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 109 B yecoha
        if(queLayer[0] == 'recorrido_ramal_109_B_Yecoha'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 109 B Yecoha" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 109 B Yecoha</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 A
        if(queLayer[0] == 'recorrido_ramal_110_A'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 A" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 A</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 B
        if(queLayer[0] == 'recorrido_ramal_110_B'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 B" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 B</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // obras de bacheo
        if(queLayer[0] == 'vw_obras_de_bacheo'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Obras de Bacheo" src="images/icon/bandera_roja.png" /></span><h2>Obras de bacheo</h2></div>';
          datos1 += '<b>Estado:</b> ' + nvl(datos.features[0].properties['avance']);
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + nvl(datos.features[0].properties['ubicacion']);
          datos1 += '<BR />' + '<b>Descrip.:</b> ' + nvl(datos.features[0].properties['descripcion']);
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // recorrido ramal 110 C
        if(queLayer[0] == 'recorrido_ramal_110_C_sta_catalina'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Ramal 110 C Sta. Catalina" src="images/icon/transporte/recorrido-ramal.png" /></span><h2>Recorrido Ramal 110 C Sta. Catalina</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['linea_descrip'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // paradas Barranqueras
        if(queLayer[0] == 'vw_paradas_barranqueras'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Estacionamiento Privado" src="images/icon/pin-parada-colectivo-azul32.png" /></span><h2>Parada Barranqueras</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // paradas Campus
        if(queLayer[0] == 'vw_paradas_campus'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Estacionamiento Privado" src="images/icon/pin-parada-colectivo-verde40.png" /></span><h2>Parada Campus</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicaci&oacute;n:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido barranqueras
        if(queLayer[0] == 'vw_recorrido_barranqueras'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Barranqueras" src="images/icon/ruta.png" /></span><h2>Recorrido Barranqueras</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido Campus
        if(queLayer[0] == 'vw_recorrido_campus'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Campus" src="images/icon/ruta.png" /></span><h2>Recorrido Campus</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['direccion'];
          datos1 += '<BR />' + '<b>Nombre:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Paradas Sarmiento
        if(queLayer[0] == 'vw_paradas_sarmiento'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Paradas Linea Sarmiento" src="images/icon/parada-colectivo-azul.png" /></span><h2>Paradas L&iacute;nea Sarmiento</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['sentido'];
          datos1 += '<BR />' + '<b>Ubicacion:</b> ' + datos.features[0].properties['ubicacion'];
          datos1 += '<div style="width:300px;">&nbsp;</div>';
        }

        // Recorrido Sarmiento
        if(queLayer[0] == 'vw_recorrido_sarmiento'){
          datos1 = '<div><span style="float:right; margin-right: 10px;";><img style="display: inline;" height="40" alt="Recorrido Linea Sarmiento" src="images/icon/recorrido-sarmiento.jpg" /></span><h2>Recorrido L&iacute;nea <br />Sarmiento</h2></div>';
          datos1 += '<b>Sentido:</b> ' + datos.features[0].properties['nombre'];
          datos1 += '<div style="width:350px;">&nbsp;</div>';
        }

        /*
         * Red vial
         */
        
        if(queLayer[0] == "vw_ide_calle"){
          datos1 = '<div style="width:409px;"><h2>Actualiza Servicios Publicos</h2></div>';
          datos1 += '<div style="width:409px;">';
          datos1 += '<div style="padding: 7px 0px;">ID:</b> ' + datos.features[0].properties['gid'] + '</div>';
          datos1 += '  <input id="divIdCalles" type="hidden" value="' + datos.features[0].properties['gid'] + '" />';
          datos1 += '<div style="padding: 7px 0px;">Calle:</b> ' + datos.features[0].properties['NAM'] + '</div>';
          // campo actividad
          datos1 += '<div style="padding: 7px 0px;">Actividad: ';
          datos1 += ' <select class="select" id="idActividad">';
          datos1 += ' <option value="0" selected>Seleccione...</option>';
          datos1 += ' <option value="2">Aporte de suelo</option>';
          datos1 += ' <option value="5">Cuneteo</option>';
          datos1 += ' <option value="8">Enripiado</option>';
          datos1 += ' <option value="13">Perfilado calle de tierra</option>';
          datos1 += ' <option value="14">Perfilado de ripio</option>';
          datos1 += '</select>';
          datos1 += '</div>';
          // campo fecha
          datos1 += '  <div style="padding: 7px 0px;">';
          datos1 += '    Fecha: ';
          datos1 += '    Dia: <input type="number" min="1" max="31" interval="1" value="" id="diaActividad"/>';
          datos1 += '    <span style="margin-left: 5px;">Mes: <input type="number" min="1" max="12" interval="1" value="" id="mesActividad"/></span>';
          datos1 += '    <span style="margin-left: 5px;">Año: <input type="number" min="2019" max="2020" interval="1" value="" id="anioActividad"/></span>';
          datos1 += '  </div>';
          // campo sobrestante
          datos1 += '  <div style="padding: 7px 0px;">';
          datos1 += '    <span>Sobrestante: </span>'
          datos1 += '    <select class="select" id="idSobrestante">';
          datos1 += '      <option value="-">Seleccione...</option>'
          datos1 += '      <option value="1">CASAFUS FLAVIA</option>'
          datos1 += '      <option value="2">CUADRILLA</option>'
          datos1 += '      <option value="3">GOMEZ PEDRO</option>'
          datos1 += '      <option value="4">GOMEZ PEDRO (PADRE)</option>'
          datos1 += '      <option value="5">GORDIOLA FERNANDO SEBASTIAN</option>'
          datos1 += '      <option value="6">HERNANDEZ RICARDO</option>'
          datos1 += '      <option value="7">IBARRA DIEGO</option>'
          datos1 += '      <option value="8">MONZON TRANSITO</option>'
          datos1 += '      <option value="9">PELOZO LUIS</option>'
          datos1 += '      <option value="10">PELOZO REINALDO</option>'
          datos1 += '      <option value="11">RUIZ DIAZ FERNANDO ANTONIO</option>'
          datos1 += '      <option value="12">SAUCEDO GERMAN</option>'
          datos1 += '      <option value="13">S/D</option>'
          datos1 += '      <option value="14">URBINA NAHUEL</option>'
          datos1 += '      <option value="15">VICCINI JUAN</option>'
          datos1 += '    </select>'
          datos1 += '  </div>';
          // boton Grabar
          datos1 += '  <div>';
          datos1 += '    <button class="btn btn-primary mt-4" id="grabaSerPub">Grabar</button>';
          datos1 += '  </div>';

          datos1 += '</div>';

        }

        // verifico si hay datos que mostrar
        if (datos1 != undefined) {

          datos1 += '<div style="border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f; width: 430px;">DIR. GRAL. DE S.I.G.</div>';

          this._map.openPopup(datos1, latlng);

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

    var datos = 'idCalles='    +  $('#divIdCalles').val();
    datos += '&actividad='     + $('#idActividad').val();
    datos += '&actividadanio=' + $('#anioActividad').val();
    datos += '&actividadmes='  + $('#mesActividad').val();
    datos += '&actividaddia='  + $('#diaActividad').val();
    datos += '&idSobrestante=' + $('#idSobrestante').val();

    $.ajax({
      type: "POST",
      url: 'graba_servicio_publico.php',
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