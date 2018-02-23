$(document).ready(function () {
    //$('#btnPrueba').click(function () {
    //    funcionWebService();
    //});
    $('#btnLogin').click(function () {
        var nick = $('#txtNick').val();
        var password = $('#txtPassword').val();
        if (nick != '' && password != '') {
            MiFuncionLogin(nick, password);
        }
        else {
            alert('Proporcione Nick y Password')
        }
    });

});
function funcionWebService() {
    $.ajax({
        url: "WSLogin.asmx/HelloWorld",
        data: "",
        dataType: "json",
        type: "POST",
        contentType: "application/json; utf-8",
        success: function (msg) {
            alert(msg.d.name);
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }

    });


};
function MiFuncionLogin(nick, password) {
    var objJson = {
        "Nick": nick,
        "Password": password
    };
    var stringJson = JSON.stringify(objJson);
    $.ajax({

        url: "WSLogin.asmx/Login",
        data: "{'user':" + stringJson + "}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; utf-8",
        success: function (msg) {
            if (msg.d.Id > 0) {
                window.location.href = "Bienvenido.aspx"
            }
            else {
                alert('No existe usuario!!!');
                //alert(msg.d.Name)
            }
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }

    });
}