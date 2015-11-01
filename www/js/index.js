/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var confDB = {
    initialize: function() {

        var existe_db;
        // Comprobacion de la existencia de la base de datos
        existe_db = window.localStorage.getItem("existe_db");


        if (typeof existe_db == 'undefined' || existe_db == null)
            this.confirmaCreacionBBDD()
    },

    //lanza el dialogs de confirmación y retorna su resultado
    confirmaCreacionBBDD:function() {
        var confirm = false;
        navigator.notification.confirm(
            'La base de datos no existe.\n' +
            '¿Desea crear una nueva?',
            this.onConfirm,
            'Base de datos',
            ['Crear', 'Salir']
        );


    },

    //genera la base de datos
    creaBBDD:function() {
        //Simulamos generación de base de datos
        window.localStorage.setItem("existe_db", 1);


    },

    //Maneja el resultado del dialogo de confirmación.
    //En caso de darle a salir sale de la aplicación.
    onConfirm:function(confirm) {
        if(confirm == 1) {
            confDB.creaBBDD();
        }
        else navigator.app.exitApp();

    }


};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        confDB.initialize();
    }
};

app.initialize();