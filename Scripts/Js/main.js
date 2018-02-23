$(document).ready(function () {
    //$('#btnPrueba').click(function () {
    //    funcionWebService();
    //});
    $('#btnLogin').click(function () {
        var nick = $('#txtNick').val();
        var password = $('#txtPassword').val();
        var modulo = "Login";
        var send = "Bienvenido.aspx";
        var alerta = "No existe usuario";
        if (nick != '' && password != '') {
            MiFuncionLogin(null,nick, password,null, modulo,send,alerta);
        }
        else {
            alert('Proporcione Nick y Password')
        }
    });
    $('#btnRegistroCompleto').click(function () {
        var name = $('#txtNameRegistrar').val();
        var nick = $('#txtNickRegistrar').val();
        var lastname = $('#txtLastNameRegistrar').val();
        var password = $('#txtPasswordResgitrar').val();
        var modulo = "Registrar";
        var send = "Bienvenido.aspx"
        var alerta = "LLene todos los campos";
        if (nick != '' && password != '' && lastname != '' && name != '') {
            MiFuncionLogin(name, nick, password, lastname, modulo, send, alerta);
        }
        else {
            alert('Proporcione Todos los datos')
        }
        });
    $('#btnRegistrar').click(function () {
            var modulo = "Vacio";
            var send = "Registrar.html";
            var alerta = "Error 404";
            CargarModulo(modulo, send, alerta);
        });
    $('#btnInicio').click(function () {
            var modulo = "Vacio";
            var send = "Login.html";
            var alerta = "Error 404";
            CargarModulo(modulo, send, alerta);
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
function MiFuncionLogin(name, nick, password, lastname, modulo, send, alerta) {
    var objJson = {
        "Name": name,
        "Nick": nick,
        "Password": password,
        "LastName": lastname
    };
    var stringJson = JSON.stringify(objJson);
    $.ajax({

        url: "WSLogin.asmx/" + modulo,
        data: "{'user':" + stringJson + "}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; utf-8",
        success: function (msg) {
            if (msg.d.Id > 0) {
                window.location.href = send
            }
            else {
                alert(alerta);
                //alert(msg.d.Name)
            }
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }

    });
}
    function CargarModulo(modulo, send, alerta) {
        $.ajax({

            url: "WSLogin.asmx/" + modulo,
            data: "",
            dataType: "json",
            type: "POST",
            contentType: "application/json; utf-8",
            success: function (msg) {
                if (msg.d == true) {
                    window.location.href = send
                }
                else {
                    alert(alerta);
                    //alert(msg.d.Name)
                }
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }

        });
    }