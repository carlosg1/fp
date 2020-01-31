<?php 
    require_once('conPDO1921681051.php');

    require_once('tablas.php');

    $qry_sobrestante = "SELECT sob.* FROM $esquema.$tabla_sobrestante sob";

    $rst_sobrestante = $conPdoPg->query($qry_sobrestante);

    $reg_sobrestante = $rst_sobrestante->fetchAll();

    echo $reg_sobrestante;

    exit;
?>