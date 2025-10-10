/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

import Persistence.PosicionConstructorJpaController;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Model.PosicionConstructor;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;

/**
 *
 * @author niroc
 */
@WebServlet(name = "PositionConstructorController", urlPatterns = {"/PositionConstructorController"})
public class PositionConstructorController extends HttpServlet {
  PosicionConstructorJpaController posicionResultadoJpa = new PosicionConstructorJpaController();

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    List<PosicionConstructor> listaPosiciones = posicionResultadoJpa.findPosicionConstructorEntities();
    
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    
    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setDateFormat("yyyy-MM-dd")
            .create();
    
    String jsonEscuderias = gson.toJson(listaPosiciones);
    
    try (PrintWriter out = response.getWriter()) {
      out.print(jsonEscuderias);
      out.flush();
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 
  }
}
