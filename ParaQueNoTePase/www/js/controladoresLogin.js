angular.module('login.controllers', [])



.controller('controlRegistro', function($scope, $stateParams) {


  $scope.registrando=false;
   if ( firebase.auth().currentUser) {
        $scope.estaLogeado="si";
         console.info("controlRegistro", firebase.auth().currentUser);
      }else{
         $scope.estaLogeado="no";
      };
 console.info("controlRegistro", "ingreso");
  //$scope.usuario=firebase.auth().currentUser.email;

   
   $scope.registrar=function(){

    $scope.registrando=true;
   }

})





.controller('controlLogin', function($scope, $stateParams,$timeout,$state) {
    $scope.Datos={};
    $scope.Datos.usuario="usuario@gmail.com";
    $scope.Datos.clave="clave";
    $scope.habilitarForm=true;
     $scope.mensaje="";



    console.info("controlLoginIN", firebase.auth().currentUser);
       $scope.datosDelUsuario=JSON.stringify(firebase.auth().currentUser,"sin registrar",' ');
     //$scope.datosDelUsuario=firebase.auth().currentUser;
      
      if ( firebase.auth().currentUser) {
        $scope.estaLogeado="si";
      }else{
         $scope.estaLogeado="no";
      };

      $scope.logear=function(){

          $scope.habilitarForm=false;
              firebase.auth().signInWithEmailAndPassword($scope.Datos.usuario, $scope.Datos.clave).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // [START_EXCLUDE]
                  if (errorCode === 'auth/wrong-password') {
                    console.log('Wrong password.');

                  } else {
                    console.log(errorMessage);
                  }
                  console.info("errores:",error);
                  //document.getElementById('quickstart-sign-in').disabled = false;
                  // [END_EXCLUDE]
                $scope.habilitarForm=true;
              
                 $scope.mensaje= errorMessage;
              }).then(function(user ){ 
                      $timeout(function() {

                            console.info("controlLoginOUT", user);
                            console.info("controlLoginOUT", firebase.auth().currentUser);
                            $scope.datosDelUsuario=JSON.stringify(user,"sin registrar",' ');
                            if(user)
                            {
                                $scope.estaLogeado="si";
                                $state.go('/exportar');
                            }
                            else
                            {
                               $scope.estaLogeado="no";
                            }
                            
                             $scope.habilitarForm=true;
                      });
                    
              });



      };




      $scope.salir= function(){

               firebase.auth().signOut().then(function(){ 
                    $timeout(function(){


                      console.info("controlLoginsignOut", firebase.auth().currentUser);
                     //$scope.datosDelUsuario= firebase.auth().currentUser;
                        $scope.datosDelUsuario=JSON.stringify(firebase.auth().currentUser,"sin registrar",' ');
                        $scope.estaLogeado="no";
                    });
                    
                  }


                );
              
      }
});
