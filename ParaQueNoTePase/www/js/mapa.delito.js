'use strict';
angular
  .module('mapa.delito', ['firebase'])

  .service('DB',['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope){

      this.ref       = ref;
      this.lista     = lista;
      this.listaRef  = listaRef;
      this.cargarUID = cargarUID;
      this.cargar    = cargar;
      this.updateUID = updateUID;
      this.update    = update;
      this.listaPers = listaPers;
      /*
      *
      */
      function ref(coleccion){
        if (!coleccion){
          console.log("Debe pasar una coleccion como parametro");
          return Promise.fail("Debe pasar una coleccion como paramtero");
        }
        var ref = firebase.database().ref();

        return ref.child(coleccion);
      }

      /*
      *
      */
      function lista(coleccion){

        return $firebaseArray(ref(coleccion));
      }

      /*
      *
      */
      function listaPers(ref){

        return $firebaseArray(ref);
      }
      /*
      *
      */
      function listaRef(ref){

        return $firebaseArray(ref);
      }

      /*
      *
      */
      function cargarUID(objeto, coleccion){
        if (!$rootScope.user.uid || !coleccion){
          console.log('No existe uid que cargar.');

          return Promise.fail('No existe uid que cargar.');
        }
        // coleccion += '/' + $rootScope.user.uid;

        // return cargar(objeto, coleccion);
        return firebase.database().ref(anadirUID(coleccion)).set(objeto);
      }

      /*
      *
      */
      function cargar(objeto, coleccion){
        if (!objeto || typeof objeto != 'object' || !coleccion){
          console.log('El parametro tiene que ser un objeto.');
          return Promise.fail('El parametro tiene que ser un objeto.');
        }

        return lista(coleccion)
        .$add(objeto)
        .then(function(ref){
          return ref.key
        })
        .catch(function(e){
          return e
        })
      }
      /*
      *
      */
      function updateUID(objeto, coleccion){
        if (!objeto || typeof objeto != 'object' || !coleccion){
          console.log('El parametro tiene que ser un objeto.');
          return Promise.fail('El parametro tiene que ser un objeto.');
        }
        if (!$rootScope.user.uid || !coleccion){
          console.log('No existe uid que modificar.');

          return Promise.fail('No existe uid que modificar.');
        }
        return firebase.database().ref(anadirUID(coleccion)).update(objeto);

      }
      /*
      *
      */
      function update(objeto, coleccion){
        if (!objeto || typeof objeto != 'object' || !coleccion){
          console.log('El parametro tiene que ser un objeto.');
          return Promise.fail('El parametro tiene que ser un objeto.');
        }
        if (!$rootScope.user.uid || !coleccion){
          console.log('No existe uid que modificar.');

          return Promise.fail('No existe uid que modificar.');
        }
        return firebase.database().ref(coleccion).update(objeto);

      }

      function anadirUID(coleccion){
        return coleccion + '/' + $rootScope.user.uid;
      }
    }])

  .service('Delitos',['DB',
    function(DB){

      this.cargar = cargar;
      this.cargarAlarma = cargarAlarma;
      this.getDelitos = getDelitos;
      this.getAlarmas = getAlarmas;
      this.listado = listado;

      function listado(){
        var ref = DB.ref('delitos/');//.orderByChild('uid').equalTo($rootScope.uid);

        try {
          console.log(ref);
          return DB.listaPers(ref);
        } catch (e) {
          console.log(e);
        } finally {

        }
      }
      function listadoAlarmas(){
        var ref = DB.ref('alarmas/');//.orderByChild('uid').equalTo($rootScope.uid);

        try {
          console.log(ref);
          return DB.listaPers(ref);
        } catch (e) {
          console.log(e);
        } finally {

        }
      }
      function cargar(objeto){
        var coleccion = 'delitos/';

        return DB.cargar(objeto, coleccion);

      }
      function cargarAlarma(objeto){
        var coleccion = 'alarmas/';

        return DB.cargar(objeto, coleccion);

      }
      function getDelitos(){
        var ref = DB.ref('delitos/');//.orderByChild('nombre');

        console.log(ref);
        return DB.listaRef(ref);
      }
      function getAlarmas(){
        var ref = DB.ref('alarmas/');//.orderByChild('nombre');

        console.log(ref);
        return DB.listaRef(ref);
      }

      function _formatear(objeto) {

        console.log(objeto);
        // objeto.tomado = {};

        // objeto.salida = {};
        // objeto.salida.dia = objeto.cargaDia.toString();
        var empresa = {};
        empresa.nombre = 'EMPRESA';
        empresa.reputacion = 4;
        empresa.telContacto = '11 4568-9875';
        objeto.dador = empresa;
        objeto.time = firebase.database.ServerValue.TIMESTAMP;
        objeto.uid = $rootScope.uid;
        objeto.tomado = false;
        return objeto;
      }

      function _fechas(dia, hora){

        dia.setHours(hora.getHours());
        dia.setMinutes(hora.getMinutes());

        return dia.getTime();
      }
    }]);
