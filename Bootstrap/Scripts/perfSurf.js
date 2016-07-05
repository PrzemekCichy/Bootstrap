(function(){
    var perfHub = $.connection.perfHub;

    $.connection.hub.logging = true;
    $.connection.hub.start();
    perfHub.client.newMessage = function (message) {
        model.addMessage(message);
    }

    var Model = function () {
    }
    Model.prototype = {
        sendMessage: function () {
            perfHub.server.send($("#message").val());
            message.val = "";
        },

        addMessage: function(message) {
            $("#messages").text(message);
    }
    }
    var model = new Model;
    (function () {
        $("#sendMessage").click(model.sendMessage);

    })();

})();