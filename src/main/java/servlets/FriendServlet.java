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
public class FriendServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    FriendHandler getFriends = new FriendHandler();
    PrintWriter out = response.getWriter();
    try {
      response.setContentType("application/json");
      String json = getFriends.friendList(request);
      out.write(json);
    } catch (SQLException ex) {
      Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    FriendHandler addFriends = new FriendHandler();
    PrintWriter out = response.getWriter();
    try {
      response.setContentType("application/json");
      String json = addFriends.addFriend(request);
      out.write(json);
    } catch (SQLException ex) {
      Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
    }    
  }
  @Override
  protected void doDelete(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    FriendHandler deleteFriends = new FriendHandler();
    PrintWriter out = response.getWriter();
    try {
      response.setContentType("application/json");
      String json = deleteFriends.deleteFriend(request);
      out.write(json);
    } catch (SQLException ex) {
      Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
    }    
  }
}
