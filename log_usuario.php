<?php 

$usuario = $_POST['usuario'];
$clave = $_POST['clave'];

$logOk = false;

// usuarios //
if($usuario == 'pintos' && $clave == '123'){ 
    $logOk = true; 
    $nombre = 'Gustavo Pintos';
}
if($usuario == 'carlosg' && $clave == '123'){ 
    $logOk = true; 
    $nombre = 'Carlos Garcia';
}
// usuarios //

if($logOk){

    echo '0|' . $usuario . '|' . $nombre;

}else{

    echo '1|Usuario o Clave incorrecta, intente nuevamente...';

}

exit();

?>