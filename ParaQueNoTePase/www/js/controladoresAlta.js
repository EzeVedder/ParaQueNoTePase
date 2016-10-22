angular.module('alta.controllers', [])

app.controller('controlAlta', function($scope, $http, FileUploader) {
    $scope.DatoTest="**alta**";

    //Inicio las variables
    $scope.persona = {};
    $scope.persona.foto = "sinfoto.jpg";
    
    $scope.uploader = new FileUploader({url:'PHP/upload.php'});
    $scope.uploader.queueLimit = 1;


    $scope.ValidarText = function(name){
        return !($scope.formAlta[name].$dirty && $scope.formAlta[name].$invalid);
    }

    $scope.Guardar=function(){
        if($scope.uploader.queue.length>0){
            console.info($scope.uploader.queue.length);
            console.info($scope.uploader.queue[0].file.name);
            $scope.uploader.queue[0].file.name = $scope.persona.dni+".jpg";
            $scope.persona.foto = $scope.persona.dni+".jpg";
            $scope.uploader.uploadAll();
            console.info($scope.uploader.queue[0].file.name);
        }

        console.log("persona a guardar:");
        console.log($scope.persona);

        //$http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
        //$http.get('PHP/nexo.php', { params: {accion: "insertar", persona: $scope.persona}})// -> Sin Slim Framework

        //Le tendria que pasar el objeto hecho string como parametro. Para eso lo paso como ruta.
        //$http.post('ws1/usuario/'+JSON.stringify($scope.persona))
        $http.post('ws1/usuario/'+"Lautaro")
        .then(function(respuesta) {         
            //aca se ejetuca si retorno sin errores         
            console.log(respuesta.data);
        },function errorCallback(response) {            
            //aca se ejecuta cuando hay errores
            console.log( response);                 
        });
    }

    /*
        //--------------------------- FILE-UPLOAD --------------------------------------
        $scope.cargar = function(){
            $scope.uploader.uploadAll();
        }
        $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
        };
    */
});