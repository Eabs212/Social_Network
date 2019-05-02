/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.AdminHandler;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Emilio
 */
@WebServlet(name = "AdminServlet", urlPatterns = {"/admin"})
public class AdminServlet extends HttpServlet {
  @Override
  protected void doPut(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    AdminHandler updateUser = new AdminHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String json = updateUser.changeUserState(request);
    out.print(json);
 }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    AdminHandler admin = new AdminHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String op = request.getParameter("op");
    System.out.println(op);
    String json;
    switch(op){
      case "1":
        json = admin.postsByType();
        out.write(json);
        break;
      case "2":
        json = admin.usersByGenre();
        out.write(json);
        break;
      case "3":
        json = admin.usersByAge();
        out.write(json);
        break;
      default:
        out.write("error");
    }

  }
    @Override
  protected void doDelete(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    AdminHandler adminDelete = new AdminHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String op = request.getParameter("op");
    System.out.println(op);
    String json;
    switch(op){
      case "1":
        json = adminDelete.deletePost(request);
        out.write(json);
        break;
      case "2":
        json = adminDelete.deleteComment(request);
        out.write(json);
        break;
      default:
        out.write("error");
    }   
  }
}


