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
   };
 

})


.controller('controlLogin', function($scope, $stateParams,$timeout) {
    $scope.Datos={};
    $scope.Datos.usuario="octaviovillegas@ymail.com";
    $scope.Datos.clave="encuesta2016";
    $scope.habilitarForm=true;
     $scope.mensaje="";

$scope.mostrarSpiner=false;
})

.controller('controlLogin', function($scope, $stateParams,$timeout,$state) {
    $scope.Datos={};
    $scope.Datos.usuario="usuario@gmail.com";
    $scope.Datos.clave="clave";



})
.controller('controlLogin', function($scope, $stateParams,$timeout) {
    $scope.Datos={};
    $scope.Datos.usuario="octaviovillegas@ymail.com";
    $scope.Datos.clave="firebasechat";
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
                            }
                            else
                            {
                               $scope.estaLogeado="no";
                            }
                            
                             $scope.habilitarForm=true;
                      });
                    
              });



      };

 

 $scope.authenticate = function(proveedor) {
   $scope.mensaje= "";
    $scope.mostrarSpiner=true;
    $scope.habilitarForm=false;
   $scope.estaLogeado="no";
        if(proveedor=="google")
        {
           // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
        }
        if(proveedor=="github")
        {
            // [START createprovider]
            var provider = new firebase.auth.GithubAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('repo');
                 provider.addScope('user');
                       provider.addScope('public_repo');
            // [END addscopes]
         }

        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          console.info("logeado", result);
          // The signed-in user info.   
          var user = result.user;
          $timeout(function(){
                  $scope.mostrarSpiner=false;
              $scope.habilitarForm=true;
              $scope.estaLogeado="si";
              $scope.datosDelUsuario=JSON.stringify(user,"sin registrar",' ');

             });
        }).catch(function(error) {
            
         $timeout(function(){
            $scope.habilitarForm=true;
            $scope.estaLogeado="no";
                $scope.mostrarSpiner=false;
        });
       
            
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          $scope.mensaje= errorMessage;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
     
    
        
      // [END_EXCLUDE]

    // [END buttoncallback]




    };


    $scope.logout = function() {
      $auth.logout();
    };

      $scope.salir= function(){

               firebase.auth().signOut().then(function(){ 
                    $timeout(function(){


                      console.info("controlLoginsignOut", firebase.auth().currentUser);
                     //$scope.datosDelUsuario= firebase.auth().currentUser;
                        $scope.datosDelUsuario=JSON.stringify(firebase.auth().currentUser,"sin registrar",' ');
                        $scope.estaLogeado="no";
                    });
                    
                  });
              
      };
});
