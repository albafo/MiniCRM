/**
 * Created by alvarobanofos on 3/11/15.
 */

var addMember = {
    initialize:function()
    {
        alert("hola");
        $('body').on('click', 'a', this.takePicture);
    },
    takePicture: function () {
        navigator.camera.getPicture(function(imageData){alert(imageData)}, function(){}, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI });

    }
}

addMember.initialize();