using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SqlConexion
/// </summary>
public class SqlConexion
{
    private SqlConnection _conn = null;
    string _ConnectionString = "";
    bool _Conectado = false;
    string _NombreProcedimiento = "";
    List<SqlParameter> _Parametros = new List<SqlParameter>();
    bool _Preparado = false;
    public SqlConexion()
    {
        //
        // TODO: Add constructor logic here
        //   
    }
    public bool Conectar(string ConnectionString) {
        bool _Rsp = false;
        _conn = new SqlConnection(ConnectionString);
        try
        {
            _conn.Open();
            _Conectado = true;
            _Rsp = true;
        }
        catch (SqlException SqlEx)
        {
            string MensajeError = "Error: " + SqlEx.Message + "." + " LINEA : " +
                SqlEx.LineNumber + ".";
            throw new Exception(MensajeError, SqlEx);
        }
        catch {
            _Rsp = false;
        }
        return _Rsp;
    }
    public void Desconectar() {
        try
        {
            _conn.Close();
        }
        catch { }
    }
    public void PrepararProcedimiento(string NombreProcedimiento, List<SqlParameter> Parametros)
    {
        if (_Conectado)
        {
            //Se valida si existe algo en memoria y se limpia
            _NombreProcedimiento = "";
            _Parametros.Clear();
            //Asigno a variables locales los parámetros
            _NombreProcedimiento = NombreProcedimiento;
            _Parametros = Parametros;
            //Habilito bandera en true para indicar que esta listo
            // el procedimiento para ejecutarse
            _Preparado = true;
        }
        else
        {
            throw new Exception("No hay conexion con la bd");
        }
    }
    public DataTableReader EjecutarTableReader() {
        if (_Preparado)
        {
            DataTable dt = new DataTable();
            SqlCommand cmm = new SqlCommand(_NombreProcedimiento, _conn);
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            //cmm.CommandTimeout = 120; // Segundos de espera para ejecutar una Consulta en SQL(60 segundos)
            cmm.Parameters.AddRange(_Parametros.ToArray());
            SqlDataAdapter adt = new SqlDataAdapter(cmm);
            adt.Fill(dt);
            _Preparado = false;
            return dt.CreateDataReader();
        }
        else
        {
            _Preparado = false;
            throw new Exception("Procedimiento no preparado");
        }
    }
}
