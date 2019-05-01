/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.FriendHandler;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Emilio
 */
public class IsFriendServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    FriendHandler isFriend = new FriendHandler();
    PrintWriter out = response.getWriter();
    try {
      response.setContentType("application/json");
      String json = isFriend.isFriend(request);
      out.write(json);
    } catch (SQLException ex) {
      Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
  }


}
