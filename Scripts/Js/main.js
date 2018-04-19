$(document).ready(function ()
{
    cargarCookieRegistro();
    cargarCookieInicio();
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
            cargarCookieInicio(nick, password);
            MiFuncionLogin(null, nick, password, null, modulo, send, alerta);
            
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
        var modulo = "Registro";
        var send = "Bienvenido.aspx"
        var alerta = "LLene todos los campos";
        if (nick != '' && password != '' && lastname != '' && name != '') {
            if (checkPassword(password)) {
                MiFuncionRegistro(name, nick, password, lastname, modulo, send, alerta);
                
            }
            else alert('Por favor introduzca una contraseña dificil');

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
function checkPassword(str) {
    // ar least one number , one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
}
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
            //"Password": password,
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
                if (name != null && nick != null && password != null && lastname != null) {
                    $.cookie('registroFull', stringJson);
                };
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
function MiFuncionRegistro(name, nick, password, lastname, modulo, send, alerta) {
    var objJson = {
        "Name": name,
        "Nick": nick,
        "Password": password,
        //"Password": password,
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
            if (name != null && nick != null && password != null && lastname != null) {
                $.cookie('registroFull', stringJson);
            };
            alert("Registrado");
                window.location.href = send
                //alert(msg.d.Name)
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }

    });
}
    function CargarModulo(modulo, send, alerta)
    {
        $.ajax({

            url: "WSLogin.asmx/" + modulo,
            data: "",
            dataType: "json",
            type: "POST",
            contentType: "application/json; utf-8",
            success: function (msg) {
                window.location.href = send
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }

        });
    }
function cargarCookieInicio(nick,password) {
    if (typeof $.cookie('newCookie') === "undefined" && typeof nick !== "undefined") {
        $.cookie('newCookie', nick, { expires: 7 });
        $.cookie('ContaseniaCookie', password, { expires: 7 });
    }
    else {
        if (typeof $.cookie('newCookie') !== "undefined") {
            $('#txtNick').val($.cookie('newCookie'));
            $('#txtPassword').val($.cookie('ContaseniaCookie'));
        }
    }
    }
function cargarCookieRegistro() {
    if (typeof $.cookie('registroFull') !== "undefined") {
        var objCookie = $.parseJSON($.cookie('registroFull'));
        $('#txtNameRegistrar').val(objCookie.Name);
        $('#txtLastNameRegistrar').val(objCookie.LastName);
        $('#txtNickRegistrar').val(objCookie.Nick);
        $('#txtPasswordResgitrar').val(objCookie.Password);
    }
}
    