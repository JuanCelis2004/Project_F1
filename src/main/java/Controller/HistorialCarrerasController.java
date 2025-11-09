/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Model.Carrera;
import Model.HistorialCarrera;
import Model.Piloto;
import Persistence.CarreraJpaController;
import Persistence.HistorialCarreraJpaController;
import Persistence.PilotoJpaController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "HistorialCarrerasController", urlPatterns = {"/HistorialCarrerasController"})
public class HistorialCarrerasController extends HttpServlet {
  HistorialCarreraJpaController historiCarreJpa = new HistorialCarreraJpaController();
  PilotoJpaController pilotoJpa = new PilotoJpaController();
    CarreraJpaController carreraJpa = new CarreraJpaController();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    List<HistorialCarrera> listaHistorialCarreras = historiCarreJpa.findHistorialCarreraEntities();

    // Establecer el tipo de respuesta
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setDateFormat("yyyy-MM-dd")
            .create();

    // Transformar la info que retorna el JAP a formato JSON
    String jsonHistorialCarrera = gson.toJson(listaHistorialCarreras);

    try (PrintWriter out = response.getWriter()) {
      out.print(jsonHistorialCarrera);
      out.flush();
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    
      response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try (BufferedReader reader = request.getReader()) {
            Gson gson = new Gson();
            HistorialCarrera historial = gson.fromJson(reader, HistorialCarrera.class);

            // Validar carrera y piloto
            Carrera carrera = carreraJpa.findCarrera(historial.getCarrera().getIdCarrera());
            Piloto piloto = pilotoJpa.findPiloto(historial.getPiloto().getIdPiloto());

            if (carrera == null || piloto == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().print("{\"error\": \"Carrera o piloto no encontrados\"}");
                return;
            }

            historial.setCarrera(carrera);
            historial.setPiloto(piloto);

            historiCarreJpa.create(historial);

            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().print("{\"message\": \"Historial creado correctamente\"}");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print("{\"error\": \"Error al crear el historial\"}");
        }
      
  }
}
