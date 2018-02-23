<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bienvenido.aspx.cs" Inherits="Bienvenido" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
           <asp:LinkButton ID="lnkCerrar" runat="server" OnClick="lnkCerrar_click">Close Session</asp:LinkButton>
        </div>
    </form>
</body>
</html>
