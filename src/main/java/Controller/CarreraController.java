/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Model.Carrera;
import Persistence.CarreraJpaController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author juand
 */
@WebServlet(name = "CarreraController", urlPatterns = {"/CarreraController"})
public class CarreraController extends HttpServlet {

  CarreraJpaController carreraJpa = new CarreraJpaController();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    List<Carrera> carreras = carreraJpa.findCarreraEntities();

    // Filtrar solo las de temporada 2025
    List<Carrera> carreras2025 = carreras.stream()
            .filter(c -> c.getTemporada() != null && c.getTemporada().getAnio() == 2025)
            .collect(Collectors.toList());

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setDateFormat("yyyy-MM-dd")
            .create();

    String json = gson.toJson(carreras2025);

    try (PrintWriter out = response.getWriter()) {
      out.print(json);
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 
  }
}
