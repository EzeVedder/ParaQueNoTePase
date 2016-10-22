angular.module('alta.controllers', [])

//app.controller('controlAlta', function($scope, $http, FileUploader) {
.controller('controlAlta', function($scope, Delitos){

    //Inicio las variables
    $scope.alta = {};
    $scope.alta.tipo = "";
    $scope.alta.fecha = "";
    $scope.alta.foto = "sinfoto.jpg";
    
    $scope.Guardar=function(){

        //Recupero las coordenadas
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        
        alert("La carga se realizó con éxito");
        //$scope.alta = {};
        $scope.alta.foto = "sinfoto.jpg";

    }

    $scope.showPosition = function(position) {
        setTimeout(function() {
            $scope.alta.latitud=position.coords.latitude;
            $scope.alta.longitud=position.coords.longitude;
            console.info($scope.alta);
            Delitos.cargar($scope.alta);
        });
    };
});