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
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Emilio
 */
public class AdminSearchServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    AdminHandler search = new AdminHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String op = request.getParameter("op");
    System.out.println(op);
    String json;
    switch (op) {
      case "1":
        json = search.searchUser(request);
        out.write(json);
        break;
      case "2":
        json = search.searchPosts(request);
        out.write(json);
        break;
      case "3":
        json = search.searchComments(request);
        out.write(json);
        break;
      default:
        out.write("error");
    }

  }
}
