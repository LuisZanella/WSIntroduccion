using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de WSLogin
/// </summary>
[WebService(Namespace = "http://localhost/WSIntroduccion/WSIntroduccion")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class WSLogin : System.Web.Services.WebService
{

    public WSLogin()
    {

        //Elimine la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    //[WebMethod]
    //public string HelloWorld()
    //{
    //    return "Hola a todos";
    //}
    [WebMethod(EnableSession = true)]
    public User Login(User user)
    {
        // Aqui iria la logica de base de datos//
        if (user.Nick == "luis" && user.Password == "123")
        {
            User _user = new global::User()
            {
                Id = 1001,
                Name = "Luis Zanellita",
                LastName = "Contreritas",
            };
            //Crear sesion con el id del usuario
            HttpContext.Current.Session["Identificador"] = _user.Id;
            return _user;
        }
        else
            throw new Exception("User not found!!! = (");

    }
    [WebMethod(EnableSession = true)]
    public User Registrar(User user)
    {
        // Aqui iria la logica de base de datos//
        
        if (user.Name != String.Empty  && user.Nick != String.Empty && user.Password != String.Empty && user.LastName != String.Empty)
        {
            User _user = new global::User()
            {
                Id = 1001
            };
            //Crear sesion con el id del usuario
            HttpContext.Current.Session["Identificador"] = _user.Id;
            return _user;
        }
        else
            throw new Exception("User not found!!! = (");

    }
    [WebMethod(EnableSession = true)]
    public bool Vacio()
    {
        bool resultado = true;
        // Aqui iria la logica de base de datos//
        return resultado;
    }
}
