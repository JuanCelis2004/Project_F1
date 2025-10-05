/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Model.Carrera;
import Model.Circuito;
import Model.Escuderia;
import Model.HistorialCarrera;
import Model.Piloto;
import Model.PosicionConstructor;
import Model.PosicionConstructor_;
import Model.Temporada;
import Persistence.CarreraJpaController;
import Persistence.CircuitoJpaController;
import Persistence.EscuderiaJpaController;
import Persistence.HistorialCarreraJpaController;
import Persistence.PilotoJpaController;
import Persistence.PosicionConstructorJpaController;
import Persistence.TemporadaJpaController;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author juand
 */
@WebServlet(name = "TemporadaController", urlPatterns = {"/Temporada/*"})
public class TemporadaController extends HttpServlet {

    TemporadaJpaController tempoJpa = new TemporadaJpaController();
    EscuderiaJpaController escudeJpa = new EscuderiaJpaController();
    CircuitoJpaController circuitJpa = new CircuitoJpaController();
    CarreraJpaController carreJpa = new CarreraJpaController();
    PosicionConstructorJpaController constructorJpa = new PosicionConstructorJpaController();
    PilotoJpaController pilotJpa = new PilotoJpaController();
    HistorialCarreraJpaController historiCarreJpa = new HistorialCarreraJpaController();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String pathInfo = request.getPathInfo();
        System.out.println("PathInfo recibido: " + pathInfo);

        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Año no especificado");
            return;
        }

        String[] parts = pathInfo.split("/");
        // /2024 -> ["", "2024"]
        // /2024/escuderias -> ["", "2024", "escuderias"]

        if (parts.length >= 2) {
            String anioStr = parts[1];
            int anio = Integer.parseInt(anioStr);

            if (parts.length == 2) {
                // Solo año -> redirige a vista de temporada
                switch (anioStr) {
                    case "2024":
                        request.getRequestDispatcher("/temporada2024.jsp").forward(request, response);
                        break;
                    case "2025":
                        request.getRequestDispatcher("/temporada2025.jsp").forward(request, response);
                        break;
                    default:
                        response.sendError(HttpServletResponse.SC_NOT_FOUND, "No hay vista para la temporada " + anioStr);
                }
            } else if (parts.length == 3 && "escuderias".equals(parts[2])) {
                // Año + escuderias -> carga la lista
                List<Escuderia> listaEscude = escudeJpa.findEscuderiasByAnio(anio);
                System.out.println("Escuderías encontradas: " + listaEscude.size());

                request.setAttribute("listaEscuderias", listaEscude);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/escuderias.jsp").forward(request, response);
            } else if (parts.length == 3 && "circuitos".equals(parts[2])) {
                
                List<Circuito> listaCircuit = circuitJpa.findCircuitoByAnio(anio);
                
                request.setAttribute("listaCircuitos", listaCircuit);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/circuitos.jsp").forward(request, response);
            } else if (parts.length == 3 && "carreras".equals(parts[2])) {
                
                List<Carrera> listaCarrera = carreJpa.findCarreraByAnio(anio);
                
                request.setAttribute("listaCarrera", listaCarrera);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/carreras.jsp").forward(request, response);
            } else if (parts.length == 3 && "posicionConstructor".equals(parts[2])) {
                
                List<PosicionConstructor> listaConstructor = constructorJpa.findPosicionConstructorByAnio(anio);
                
                request.setAttribute("listaConstructor", listaConstructor);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/posicionConstructor.jsp").forward(request, response);
            } else if (parts.length == 3 && "pilotos".equals(parts[2])) {
                
                List<Piloto> listaPilotos = pilotJpa.findPilotoByAnio(anio);
                
                request.setAttribute("listaPilotos", listaPilotos);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/pilotos.jsp").forward(request, response);
            } else if (parts.length == 3 && "historialCarreras".equals(parts[2])) {
                
                List<HistorialCarrera> listaHistorialCarrera = historiCarreJpa.findHistorialCarreraByAnio(anio);
                
                request.setAttribute("listaHistorialCarrera", listaHistorialCarrera);
                request.setAttribute("anio", anio);
                request.getRequestDispatcher("/historialCarreras.jsp").forward(request, response);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
