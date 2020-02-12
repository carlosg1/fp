<?php

require_once('conPDO1921681051.php');

$ret = '';

$id_tramo = is_null($_POST['a']) ? '' : $_POST['a'];

if($id_tramo == ''){

    echo '-1|No recibio el id de tramo'; // no hay que buscar

    exit();

}

// st_transform(st_setsrid(t1.the_geom, 4326), 22185) AS the_geom,
$qry_tramo = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom_calles, 22185), 4326))::json as \"geometry\"
FROM gismcc.calles 
WHERE id_calles = $id_tramo";

$rst_tramo = $conPdoPg->query($qry_tramo);

if(!$rst_tramo || $rst_tramo->rowCount() == 0){

    echo '-2|No se encontraron resultados'; // no hay resultados

    exit();

}

$reg_tramo = $rst_tramo->fetchObject();

$ret = $reg_tramo->geometry;

echo $ret;

exit();


?>