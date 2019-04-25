/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.SearchHandler;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Emilio
 */
@WebServlet(name = "SearchServlet", urlPatterns = {"/search"})
public class SearchServlet extends HttpServlet {


  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {

  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    SearchHandler search = new SearchHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String op = request.getParameter("op");
            System.out.println(op);
            String json;
            switch(op){
              case "1":
            json = search.searchUsers(request);
            out.write(json);
            break;
              case "2":
            json = search.searchFriend(request);
            out.write(json);
            break;
              case "3":
            json = search.getUser(request);
            out.write(json);
            break;
              default:
                out.write("error");
            }

        } catch (SQLException ex) {
      Logger.getLogger(SearchServlet.class.getName()).log(Level.SEVERE, null, ex);
    }

  }
}
