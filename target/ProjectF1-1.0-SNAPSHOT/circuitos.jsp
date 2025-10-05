<%@page import="Model.Circuito"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Circuitos <%= request.getAttribute("anio") %></title>
    </head>
    <body>
        <h1>Circuitos - Temporada <%= request.getAttribute("anio") %></h1>

        <table border="1">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Localidad</th>
                    <th>Pais</th>
                    <th>lat</th>
                    <th>Lng</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<Circuito> listaCircuito = (List<Circuito>) request.getAttribute("listaCircuitos");
                    int cont = 1;

                    if (listaCircuito != null && !listaCircuito.isEmpty()) {
                        for (Circuito circuito : listaCircuito) {
                %>
                <tr>
                    <td><%= cont%></td>
                    <td><%=circuito.getNombre()%></td>
                    <th><%=circuito.getLocalidad() %></th>
                    <th><%=circuito.getPais() %></th>
                    <th><%=circuito.getLat() %></th>
                    <th><%=circuito.getLng() %></th>
                </tr>
                <%
                        cont++;
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">No hay Circuitos registrados</td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </body>
</html>
