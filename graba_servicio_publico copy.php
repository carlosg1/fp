<?php

    require_once('conPDO1921681051.php');

    require_once('tablas.php');

/*
    $esquema = 'actualizar';
    $tabla_servicio_publico = 'servicio_publico';
*/

    $id_tramo      = $_POST['idCalles'];
    $actividad     = $_POST['actividad'];
    $idSobrestante = $_POST['idSobrestante'];
    $fecha         = $_POST['actividadanio'] . '-' . $_POST['actividadmes'] . '-' . $_POST['actividaddia'];

    $qry_sp = "insert into $esquema.$tabla_servicio_publico(id_tramo_calle, id_servicio_actividad, fecha_servicio, usuario, fecha_carga, id_sobrestante) values($id_tramo, $actividad, '$fecha', 'prueba', now(), $idSobrestante)";

    $reg_sp = $conPdoPg->exec($qry_sp);

    echo 'info| se actualizaron ' . $reg_sp . ' registros.';

    exit();

?>