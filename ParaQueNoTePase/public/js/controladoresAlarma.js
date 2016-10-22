angular.module('alarma.controllers', [])

.controller('controlAlarmas', function($scope) {
 
$scope.violenciaDeGenero=function(){
	alert("violencia de genero");
}
$scope.Accidente=function(){
	alert("accidente");
}

$scope.Asalto=function(){
	alert("asalto");
}

});