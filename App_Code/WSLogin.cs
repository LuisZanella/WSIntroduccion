using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        SqlConexion _conexion = new SqlConexion();
        List<SqlParameter> _Parametros = new List<SqlParameter>();
        DataTable _dtr = null;
        try
        {
            //Abrir conexion
            _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
            // Se agregan parámetros a la lista List <SqlParameter>, con los valores para cada parametro que se obtienen de los atributos
            // del objeto Pej.Objeto . Atributo_x
            _Parametros.Add(new SqlParameter("@Nick", user.Nick));
            _Parametros.Add(new SqlParameter("@Password", user.Password));
            _conexion.PrepararProcedimiento("sp_LoginUser", _Parametros);
            _dtr = _conexion.EjecutarTableReader();
            if (_dtr.HasRows)
            {
                User _user = new global::User()
                {
                    Id = long.Parse(_dtr["Id_User"].ToString()),
                    Name = _dtr["Name"].ToString(),
                    LastName = _dtr["LastName"].ToString(),
                };
                HttpContext.Current.Session["Identificador"] = _user.Id;
                return _user;
            }
            else
                throw new Exception("User not found");

        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
        finally {
            _conexion.Desconectar();
            _conexion = null;
            _dtr = null;
        }

    //    // Aqui iria la logica de base de datos//
    //    if (user.Nick == "luis" && user.Password == "123")
    //    {
    //        User _user = new global::User()
    //        {
    //            Id = 1001,
    //            Name = "Luis Zanellita",
    //            LastName = "Contreritas",
    //        };
    //        //Crear sesion con el id del usuario
    //        HttpContext.Current.Session["Identificador"] = _user.Id;
    //        return _user;
    //    }
    //    else
    //        throw new Exception("User not found!!! = (");
    //}
    //[WebMethod(EnableSession = true)]
    //public User Registro(User user)
    //{
    //    // Aqui iria la logica de base de datos//
    //    User _user = new global::User()
    //    {
    //        Id = 1,
    //        Nick = user.Nick,
    //        LastName = user.LastName,
    //        Name = user.Name,
    //        Password = user.Password,
    //    };
    //    //Crear sesion con el id del usuario
    //    HttpContext.Current.Session["Identificador"] = _user.Id;
    //    return _user;
    }
    [WebMethod(EnableSession = true)]
    public User Registro(User user)
    {
        SqlConexion _conexion = new SqlConexion();
        List<SqlParameter> _Parametros = new List<SqlParameter>();
        try 
        {
            //Abrir conexion
            _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
            // Se agregan parámetros a la lista List <SqlParameter>, con los valores para cada parametro que se obtienen de los atributos
            // del objeto Pej.Objeto . Atributo_x
            _Parametros.Add(new SqlParameter("@Name", user.Name));
            _Parametros.Add(new SqlParameter("@Password", user.Password));
            _Parametros.Add(new SqlParameter("@LastName", user.LastName));
            _Parametros.Add(new SqlParameter("@Nick", user.Nick));
            _conexion.PrepararProcedimiento("sp_SetUser", _Parametros);
            _conexion.EjecutarProcedimiento();
            return user;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
        finally
        {
            _conexion.Desconectar();
            _conexion = null;
        }
    }
    [WebMethod(EnableSession = true)]
    public bool Vacio()
    {
        bool resultado = true;
        // Aqui iria la logica de base de datos//
        return resultado;
    }
}
