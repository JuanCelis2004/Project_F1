<%@page import="Model.Carrera"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Carreras <%= request.getAttribute("anio") %></title>
    </head>
    <body>
        <h1>Carreras - Temporada <%= request.getAttribute("anio") %></h1>

        <table border="1">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Temporada</th>
                    <th>Circuito</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<Carrera> listaCarrera = (List<Carrera>) request.getAttribute("listaCarrera");
                    int cont = 1;

                    if (listaCarrera != null && !listaCarrera.isEmpty()) {
                        for (Carrera carrera : listaCarrera) {
                %>
                <tr>
                    <td><%= cont%></td>
                    <td><%=carrera.getTemporada().getAnio() %></td>
                    <th><%=carrera.getCircuito().getNombre() %></th>
                </tr>
                <%
                        cont++;
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">No hay Carreras registradas</td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </body>
</html>
