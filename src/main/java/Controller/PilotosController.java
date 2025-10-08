/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Persistence.PilotoJpaController;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Model.Piloto;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.PrintWriter;
import java.util.List;

/**
 *
 * @author niroc
 */
@WebServlet(name = "PilotosController", urlPatterns = {"/PilotosController"})
public class PilotosController extends HttpServlet {

  PilotoJpaController pilotoJpa = new PilotoJpaController();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    List<Piloto> listaPilotos = pilotoJpa.findPilotoEntities();

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setDateFormat("yyyy-MM-dd")
            .create();

    String jsonPilotos = gson.toJson(listaPilotos);

    try (PrintWriter out = response.getWriter()) {
      out.print(jsonPilotos);
      out.flush();
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 
  }
}
