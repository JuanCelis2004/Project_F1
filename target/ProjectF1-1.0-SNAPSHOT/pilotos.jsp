<%@page import="Model.Piloto"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>PIlotos <%= request.getAttribute("anio") %></title>
    </head>
    <body>
        <h1>Pilotos - Temporada <%= request.getAttribute("anio") %></h1>

        <table border="1">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>No. Piloto</th>
                    <th>Codigo</th>
                    <th>Escuderia</th>
                    <th>Podios</th>
                    <th>Puntos</th>
                    <th>Campeonatos Ganados</th>
                    <th>Posición más alta</th>
                    <th>Fecha de nacimiento</th>
                    <th>Lugar de nacimineto</th>
                    <th>Temporada</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<Piloto> listaPilotos = (List<Piloto>) request.getAttribute("listaPilotos");
                    int cont = 1;

                    if (listaPilotos != null && !listaPilotos.isEmpty()) {
                        for (Piloto pilotos : listaPilotos) {
                %>
                <tr>
                    <td><%= cont%></td>
                    <td><%=pilotos.getNombre() %></td>
                    <td><%=pilotos.getNoPiloto() %></td>
                    <th><%=pilotos.getCodigo() %></th>
                    <th><%=pilotos.getEscuderia().getNombre() %></th>
                    <th><%=pilotos.getPodios() %></th>
                    <th><%=pilotos.getPuntos() %></th>
                    <th><%=pilotos.getCampeonatosGanados() %></th>
                    <th><%=pilotos.getPosicionMasAlta() %></th>
                    <th><%=pilotos.getFechaNacimiento() %></th>
                    <th><%=pilotos.getLugarNacimiento() %></th>
                    <th><%=pilotos.getTemporada().getAnio() %></th>
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
