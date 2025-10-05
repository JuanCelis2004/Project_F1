<%-- 
    Document   : historialCarreras
    Created on : 1/10/2025, 3:13:10 p. m.
    Author     : juand
--%>

<%@page import="Model.HistorialCarrera"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Escuderias <%= request.getAttribute("anio") %></title>
    </head>
    <body>
        <h1>Escuderías - Temporada <%= request.getAttribute("anio") %></h1>

<table border="1">
    <thead>
        <tr>
            <th>No.</th>
            <th>Carrera</th>
            <th>Piloto</th>
            <th>Poisción</th>
            <th>Posición parrilla salida</th>
            <th>Vueltas</th>
            <th>Tiempo carrera</th>
            <th>Puntos</th>
            <th>Mejor tiempo</th>
        </tr>
    </thead>
    <tbody>
        <%
    List<HistorialCarrera> listaHistorialCarrera = (List<HistorialCarrera>) request.getAttribute("listaHistorialCarrera");
    int cont = 1;

    if (listaHistorialCarrera != null && !listaHistorialCarrera.isEmpty()) {
        for (HistorialCarrera historialCarrera : listaHistorialCarrera) {
%>
            <tr>
                <td><%= cont %></td>
                <td><%=historialCarrera.getCarrera().getCircuito().getNombre() %></td>
                <th><%=historialCarrera.getPiloto().getNombre() %></th>
                <th><%=historialCarrera.getPosicion() %></th>
                <th><%=historialCarrera.getPosicionParrillaSalida() %></th>
                <th><%=historialCarrera.getVueltas() %></th>
                <th><%=historialCarrera.getTiempoCarrera() %></th>
                <th><%=historialCarrera.getPuntos() %></th>
                <th><%=historialCarrera.getMejorTiempo() %></th>
            </tr>
<%
            cont++;
        }
    } else {
%>
        <tr>
            <td colspan="3">No hay escuderías registradas para esta temporada.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>
    </body>
</html>

