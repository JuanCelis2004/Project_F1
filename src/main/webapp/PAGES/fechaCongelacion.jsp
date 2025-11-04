<%-- 
    Document   : fechaCongelacion
    Created on : 27/10/2025, 6:24:30 p. m.
    Author     : juand
--%>

<%@page import="Persistence.FechaCongelacionJpaController"%>
<%@page import="Model.FechaCongelacion"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                <%
                    FechaCongelacionJpaController FechaCongeJpa = new FechaCongelacionJpaController();
                    
                    List<FechaCongelacion> listafechas = FechaCongeJpa.findFechaCongelacionEntities();
                    request.setAttribute("listafechas", listafechas);
                    request.getAttribute("listafechas");
                    int cont = 1;

                    if (listafechas != null && !listafechas.isEmpty()) {
                        for (FechaCongelacion fechasCongelacion : listafechas) {
                %>
                <tr>
                    <td><%= cont%></td>
                    <td><%=fechasCongelacion.getFecha() %></td>
                </tr>
                <%
                        cont++;
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">No hay Pilotos registrados</td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </body>
</html>
