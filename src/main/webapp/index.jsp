<%@page import="Model.Temporada"%>
<%@page import="Persistence.TemporadaJpaController"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lista de Temporadas</title>
    </head>
    <body>
        <h1>Temporadas</h1>

        <h1>En este espacío podras consultar que temporadas te interesa ver</h1>     
        <table border="1">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Años</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <%
                    TemporadaJpaController temporadaJpa = new TemporadaJpaController();
                    List<Temporada> listaTemporadas = temporadaJpa.findTemporadaEntities();
                    int cont = 1;
                    if (listaTemporadas != null && !listaTemporadas.isEmpty()) {
                        for (Temporada temporada : listaTemporadas) {
                %>
                <tr>
                    <td><%=cont%></td>
                    <td><%=temporada.getAnio()%></td>
                    <%--
                    <td>
                        <form method="POST" action="Temporada">
                            <input type="hidden" name="id" value="<%=temporada.getIdTemporada() %>">
                            
                            <button type="submit" name="action" value="consultar">
                                Consultar
                            </button>
                        </form>
                    </td>
                    --%>
                    <td>
                        <a href="${pageContext.request.contextPath}/Temporada/<%=temporada.getAnio()%>">
                            Consultar
                        </a>
                    </td>
                </tr>
                <%
                            cont++;
                        }
                    } else {
                    }
                %>
            </tbody>
        </table>
    </body>
</html>
