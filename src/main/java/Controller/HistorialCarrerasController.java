/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Model.HistorialCarrera;
import Persistence.HistorialCarreraJpaController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
    // 
  }
}
