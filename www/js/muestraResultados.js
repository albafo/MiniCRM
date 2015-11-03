/**
 * Created by alvarobanofos on 2/11/15.
 */

var muestraResultados = {
    db:null,

    initialize:function () {
        confDB.initialize();
        this.db = confDB.db;
    },

    mostrarListado:function() {
        this.db.transaction(this.throwUsersList, confDB.onErrorTransaction);
    },




    throwUsersList:function(tx) {
        var sql = "SELECT * FROM usuarios";
        tx.executeSql(
            sql,
            [],
            muestraResultados.showUserList,
            confDB.onErrorTransaction
        );
    },



    showUserList:function(tx, result){
        if(result.rows.length > 0)
        {

            var html = '';
            for(var i=0; i<result.rows.length; i++)
            {
                var item = result.rows.item(i);
                html += '<li>\
                    <a href="profile.html" data-ajax="false" class="linkToProfile" data-id="'+item.id+'">\
                        <img src="img/user_'+item.id+'.jpg"  class="ui-thumbnail ui-thumbnail-circular" />\
                        <h2>'+item.nombre+'</h2>\
                        <p>'+item.puesto+'</p>\
                    </a>\
                 </li>';
                $('#UsersList').html('<ul data-role="listview" data-icon="false" id="UsersList">'+html+'</ul><hr/>').enhanceWithin();

            }
        }

        $('body').on('click', '#UsersList a', function() {
            window.localStorage.setItem("user_id", $(this).attr('data-id'));
        });
    },

    mostrarPerfil:function()
    {
        this.db.transaction(this.throwShowProfile, confDB.onErrorTransaction);

    },

    throwShowProfile:function(tx)
    {
        var user_id = window.localStorage.getItem("user_id");
        if(user_id != null) {
            var sql = "SELECT * FROM usuarios where id = "+user_id;
            tx.executeSql(
                sql,
                [],
                muestraResultados.showProfile,
                confDB.onErrorTransaction
            );
        }

    },



    showProfile:function(tx, result)
    {

        if(result.rows.length > 0) {
            var item = result.rows.item(0);

            $('#profileName').text(item.nombre);
            $('#profileEmail').text(item.email);
            $('#profilePhone').text(item.telefono);
            $('#profileEmployment').text(item.puesto);
            $('#profileValoration').text(item.valoracion+'/5');
            $('#titleName').text(item.nombre);
            var img = 'img/user_'+item.id+'.jpg';
            $('#profileImage').attr('src', img);
        }
    },

    rellenarForm:function() {
        this.db.transaction(this.throwFillForm, confDB.onErrorTransaction);
        $('body').on('click', 'a#changePhoto', function() {
            app.getCamera($(this).find('img'));
        });
    },

    throwFillForm:function(tx) {
        var user_id = window.localStorage.getItem("user_id");
        if(user_id != null) {
            var sql = "SELECT * FROM usuarios where id = "+user_id;
            tx.executeSql(
                sql,
                [],
                muestraResultados.fillForm,
                confDB.onErrorTransaction
            );
        }
    },

    fillForm:function(tx, result) {
        if(result.rows.length > 0) {
            var item = result.rows.item(0);
            $('#formName').val(item.nombre);
            $('#formEmail').val(item.email);
            $('#formPhone').val(item.telefono);
            $('#formEmployment').val(item.puesto).selectmenu('refresh');
            $('#formValoration').val(item.valoracion);
            $('#formValoration').slider('refresh');
            var img = 'img/user_'+item.id+'.jpg';
            $('#profileImage').attr('src', img).enhanceWithin();

        }
    }






}