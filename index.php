<?php 
mb_internal_encoding("UTF-8");
?><!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="css/leaflet.css">
        <link rel="stylesheet" href="css/Control.OSMGeocoder.css">
        <link rel="stylesheet" href="css/leaflet-measure.css">

        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css">

        <!-- Material Design Bootstrap -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.11.0/css/mdb.min.css">

        <!-- JQuery -->
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <!-- Jstree -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">

        <!-- Google Web Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato|Roboto&display=swap" rel="stylesheet">

        <!-- Font-awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="css/estilo.css"> 

        <script src="js/leaflet.js"></script>
        <script src="js/proj4.js"></script>
        <script src="js/proj4leaflet.js"></script>
        <script src="js/leaflet.rotatedMarker.js"></script>
        <script src="js/leaflet.pattern.js"></script>
        <script src="js/leaflet-hash.js"></script>
        <script src="js/Autolinker.min.js"></script>
        <script src="js/rbush.min.js"></script>
        <script src="js/labelgun.min.js"></script>
        <script src="js/labels.js"></script>
        <script src="js/leaflet.wms.js"></script>
        <script src="js/Control.OSMGeocoder.js"></script>
        <script src="js/leaflet-measure.js"></script>
        
        <!-- JQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!-- Bootstrap tooltips -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>

        <!-- Bootstrap core JavaScript -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>

        
        <!-- MDB core JavaScript -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.11.0/js/mdb.min.js"></script>

        
        <!-- Jquery UI -->
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

        <!-- Jstree -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>

        <!-- leo camiones -->
        <script>

        var camion = Array(<?php

            $res = '';

            require_once('conPDO1921681051.php');

            $qry_camion = "SELECT * FROM gismcc.plan_hidrico_camion;";

            $rst_camion = $conPdoPg->query($qry_camion);

            $i = 0;

            while($reg_camion = $rst_camion->fetchObject()){

                if($i > 0){
                    echo ', ';
                }

                echo '"' . $reg_camion->patente . '"';

                $i++;

            }

            $reg_camion = null;

            $rst_camion = null;

            ?>);
        </script>
        <!-- // leo camiones -->

        <script src="mapa/mapa.js"></script>
        <script src="js/mostrar-infowindow.js"></script>

        <script src="js/appmcc.js"></script>
        <script src="capas/publico.js"></script>

        <title>Visor de mapa Municipalidad de Corrientes</title>

    </head>
    <body>

        <div id="map"></div>

        <!-- menu hamburguesa --> 
        <div id="contenedor-hamburguesa">
            <div id="botonmax">
                <div id="botonmax-simple" style="text-align: left;">
                    <div id="botonmax-simple-root botonmax-activo">
                        <div class="cajabusqueda-caja-contenedor">
                            <button id="btn-abrir" class="icono-hamburgesa"> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- caja de busqueda --> 
        <div id="busca-contenedor">

            <div id="busca-root">
                <form id="frmBusca">
                    <input type="text" id="input-busqueda" autocomplete="off" placeholder="Buscar calle, ej: Mendoza">
                </form>

                <div id="lupa-busca-contenedor">
                    <button id="lupa-busca-boton"></button>
                </div>

                <span id="busca-separador"></span>

                <div class="busca-root_borrar-busqueda">
                    <button class="busca-root_borra-busqueda_boton" tooltip="Borrar búsqueda"></button>
                </div>
            </div>
            
        </div>

        <!-- opciones y resultado de la busqueda -->
        <div id="opci-contenedor">
            <div id="opci-menu">
                <button id="opci-opci-boton"></button>
            </div>

            <span class="opci-contenedor_opci-texto">M&aacute;s opciones</span>

            <div class="opci-contenedor__opciones opci-contenedor_checkbox">

               <div class="widget" id="botones_opcion">

                    <fieldset>

                        <legend> Seleccion&aacute; un bot&oacute;n </legend>

                        <label for="opciones_busca-calle">Calle</label>
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-calle" class="opci-contenedor__opciones_radio" value="Calle">

                        <label for="opciones_busca-barrio">Barrio</label>
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-barrio" class="opci-contenedor__opciones_radio" value="Barrio">

                        <label for="opciones_busca-partidainmo">Partida inmob.</label>
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-partidainmo" class="opci-contenedor__opciones_radio" value="partida inmo">

                        <label for="opciones_busca-depmunicipal">Dep. Municipal</label>
                        <input type="radio" name="opciones_busca-radio" id="opciones_busca-depmunicipal" class="opci-contenedor__opciones_radio" value="dependencia municipal">

                    </fieldset>

                </div>

            </div>
        </div>

        <!-- ARBOL DE CAPAS -->
        <div id="lateral">
            <!-- div style="display: block;" -->
                <div id="contraer">
                    <button id="btn-contraer" class="sprite-arrow"> </button>
                    <!--
                    <span><img src="images/collapse-arrow.png" border="0" width="12" height="12" /></span>
                    -->
                </div>
            <!-- /div -->

            <div class="topBanner">
                <span>
                    <img src="images/topBanner.jpg" alt="Municipalidad de Corrientes">
                </span>
            </div>

            <!-- contenedor para el arbol -->
            <div id="contenedorArboles">
                <div id="arbolCapaBase">
                        <!-- incluyo capas base --> 
                        <?php include("capas/tree_capa_base.php"); ?>
                </div>

                <div id="arbolMCC">
                    <!-- arbol de capa publico -->
                    <?php include("capas/tree_publico.php"); ?>

                </div>
            </div>

        </div>

        <!-- dialogos -->
        <div class="obj-no-encontre">
            <p id="obj-no-encontre_cuerpo">La busqueda no di&oacute; ning&uacute;n resultado</p>
            <span class="x-cierre"><a href="#" id="x-cierre-btn">x</a></span>
        </div>

        <!-- mensaje que no se encontro ningun elemento -->
        <div id="msg-no-encontre" title="Aviso!!!">
            <p>La busqueda no dió ningun resultado. <br /> Por favor, intente de nuevo con otra busqueda.</p>
        </div>

        <div id="dialogo1">
            <p id="dlgTitulo"></p>
            <div id="dlgCuerpo"></div>
        </div>

        <!-- boton de login -->
        <div class="rounded barra-herramienta sombra-derecha">
           <div class="bh-cuerpo">
               <button type="button" class="btn btn-primary px-3 py-2 sin-opacidad" data-toggle="modal" data-target="#modalLogin"><i class="fa fa-user" aria-hidden="true"></i></button>
               <span id="lblUsuario">Usuario: </span>
               <span id="nombreUsuario"></span>
           </div>
            
        </div>

        <!-- Modal de login -->
        <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="logUsuario" class="col-form-label">Usuario:</label>
                            <input type="text" class="form-control" id="logUsuario">
                        </div>
                        <div class="form-group">
                            <label for="logClave" class="col-form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="logClave">
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" id="btnAceptar" class="btn btn-primary">Aceptar</button>
                </div>
                </div>
            </div>
        </div>

        

        <!-- Referencias -->
        <div class="ref-bacheo">
            <img src="images/ref/referencias-bacheo.png" alt="">
        </div>
    </body>
</html>
