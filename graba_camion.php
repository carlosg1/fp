<?php

    require_once('conPDO1921681051.php');

    require_once('tablas.php');

/*
    $esquema = 'actualizar';
    $tabla_servicio_publico = 'servicio_publico';
*/

    $idCamion    = $_POST['idCamion'];
    $fechaCamion = ($_POST['fechaCamion'] == 'undefined' ? 'null' : $_POST['fechaCamion']);
    $avance      = $_POST['avance'];
    $observacion = $_POST['observacion'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    $qry_sp = "INSERT INTO $esquema_gismcc.$tabla_plan_hidrico_camion_calle(id_camion, id_calles, fecha, observacion, the_geom, avance) 
    VALUES($idCamion, 0, '$fechaCamion', '$observacion', ST_Transform(ST_SetSRID(ST_GeomFromText('POINT($lng $lat)', 4326), 4326), 22185), $avance)";


    $reg_sp = $conPdoPg->exec($qry_sp);

    echo 'info| se actualizaron ' . $reg_sp . ' registros.';

    exit();

?>