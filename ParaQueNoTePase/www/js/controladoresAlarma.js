angular.module('alarma.controllers', [])

.controller('controlAlarmas', function($scope) {
 
 $scope.alarma=[];
$scope.alarma.latitud="";
$scope.alarma.longitud="";
$scope.alarma.tipo="";


	
$scope.violenciaDeGenero=function(){
	alert("violencia de genero");
		if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition($scope.showPosition);
		        $scope.alarma.tipo="violenciaDeGenero";

		        
		    } else {
		        console.log("Geolocation is not supported by this browser.");
		    }
		    
}

   
$scope.Accidente=function(){
	alert("accidente");
	if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition($scope.showPosition);
		        $scope.alarma.tipo="Accidente";
		       
		    } else {
		        console.log("Geolocation is not supported by this browser.");		    }
}

$scope.Asalto=function(){
	alert("asalto");
	if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition($scope.showPosition);
		        $scope.alarma.tipo="Asalto";
		       
		    } else {
		        console.log("Geolocation is not supported by this browser.");		    }
}
$scope.showPosition=function(position){

	setTimeout(function() {
	
	$scope.alarma.latitud=position.coords.latitude;
	$scope.alarma.longitud=position.coords.longitude;
	x.innerHTML=position.coords.latitude;
	console.info($scope.alarma);
	} );
	

}

});