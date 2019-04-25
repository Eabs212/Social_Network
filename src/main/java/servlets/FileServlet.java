/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.FileHandler;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Emilio
 */
@MultipartConfig
public class FileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      FileHandler file = new FileHandler();
      file.fileDown(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      FileHandler file = new FileHandler();
      PrintWriter out = response.getWriter();
      response.setContentType("application/json");
      String json = file.fileUp(request);
      out.write(json);

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     FileHandler file = new FileHandler();
      PrintWriter out = response.getWriter();
      response.setContentType("application/json");
      String json = file.fileUpdate(request);
      out.write(json);
    }
}    