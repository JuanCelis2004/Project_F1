<%@page import="Model.Escuderia"%>
<%@page import="java.util.List"%>
<%@page import="Persistence.EscuderiaJpaController"%>
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
            <th>#</th>
            <th>Nombre</th>
            <th>Base</th>
            <th>Jefe equipo</th>
            <th>Jefe técnico</th>
            <th>Chasis</th>
            <th>Unidad potencia</th>
            <th>Temporada</th>
        </tr>
    </thead>
    <tbody>
        <%
    List<Escuderia> listaEscuderia = (List<Escuderia>) request.getAttribute("listaEscuderias");
    int cont = 1;

    if (listaEscuderia != null && !listaEscuderia.isEmpty()) {
        for (Escuderia escuderia : listaEscuderia) {
%>
            <tr>
                <td><%= cont %></td>
                <td><%=escuderia.getNombre() %></td>
                <th><%=escuderia.getBase() %></th>
                <th><%=escuderia.getJefe_equipo() %></th>
                <th><%=escuderia.getJefe_tecnico() %></th>
                <th><%=escuderia.getChasis() %></th>
                <th><%=escuderia.getUnidad_potencia() %></th>
                <th><%=escuderia.getTemporada().getAnio() %></th>
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
