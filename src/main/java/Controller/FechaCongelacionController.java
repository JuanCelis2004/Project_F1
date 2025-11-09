/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Model.FechaCongelacion;
import Persistence.FechaCongelacionJpaController;
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
@WebServlet(name = "FechaCongelacionController", urlPatterns = {"/FechaCongelacionController"})
public class FechaCongelacionController extends HttpServlet {

  FechaCongelacionJpaController FechaCongeJpa = new FechaCongelacionJpaController();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    List<FechaCongelacion> listaFechas = FechaCongeJpa.findFechaCongelacionEntities();

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setDateFormat("yyyy-MM-dd")
            .create();

    // Transformar la info que retorna el JAP a formato JSON
    String jsonPilotos = gson.toJson(listaFechas);

    try (PrintWriter out = response.getWriter()) {
      out.print(jsonPilotos);
      out.flush();
    }
  }
}
