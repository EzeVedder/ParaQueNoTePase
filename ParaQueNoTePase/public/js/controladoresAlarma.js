angular.module('alarma.controllers', [])

.controller('controlAlarmas', function($scope,Delitos) {
 
 $scope.alarma=[];
$scope.alarma.latitud="";
$scope.alarma.longitud="";
$scope.alarma.tipo="";


	
$scope.violenciaDeGenero=function(){
	
		if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition($scope.showPosition);
		        $scope.alarma.tipo="violenciaDeGenero";
		
		        
		    } else {
		        console.log("Geolocation is not supported by this browser.");
		    }
		    
}

   
$scope.Accidente=function(){
	
	if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition($scope.showPosition);
		        $scope.alarma.tipo="Accidente";
		        
		       
		    } else {
		        console.log("Geolocation is not supported by this browser.");		    }
}

$scope.Asalto=function(){
	
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

	Delitos.cargarAlarma($scope.alarma);
	console.info($scope.alarma);
	} );
	

}

});