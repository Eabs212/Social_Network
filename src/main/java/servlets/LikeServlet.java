/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.LikeHandler;
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
public class LikeServlet extends HttpServlet {
  	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    LikeHandler like = new LikeHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String json = like.updateLike(request);
    out.write(json);
	}

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    LikeHandler like = new LikeHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String json = like.dislikePost(request);
    out.write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    LikeHandler like = new LikeHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String json = like.likePost(request);
            out.write(json);
        } catch (SQLException ex) {
      Logger.getLogger(LikeServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
    }
}
