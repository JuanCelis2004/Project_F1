<%@page import="Model.PosicionConstructor"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Posicion de constructores <%= request.getAttribute("anio") %></title>
    </head>
    <body>
        <h1>Posicion de constructores - Temporada <%= request.getAttribute("anio") %></h1>

        <table border="1">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Temporada</th>
                    <th>Constructor</th>
                    <th>Posición</th>
                    <th>Puntos</th>
                    <th>Victorias</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<PosicionConstructor> listaConstructor = (List<PosicionConstructor>) request.getAttribute("listaConstructor");
                    int cont = 1;

                    if (listaConstructor != null && !listaConstructor.isEmpty()) {
                        for (PosicionConstructor constructor : listaConstructor) {
                %>
                <tr>
                    <td><%= cont%></td>
                    <td><%=constructor.getTemporada().getAnio() %></td>
                    <td><%=constructor.getConstructor().getNombre() %></td>
                    <th><%=constructor.getPosicion() %></th>
                    <th><%=constructor.getPuntos() %></th>
                    <th><%=constructor.getVictorias() %></th>
                </tr>
                <%
                        cont++;
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">No hay Constructores registrados</td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </body>
</html>
