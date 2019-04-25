/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.PostHandler;
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
public class PostServlet extends HttpServlet {

  	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PostHandler post = new PostHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String json = post.getUserPosts(request);
            out.write(json);
        } catch (SQLException ex) {
      Logger.getLogger(PostServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
	}

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PostHandler post = new PostHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String json = post.deletePost(request);
            out.write(json);
        } catch (SQLException ex) {
      Logger.getLogger(PostServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PostHandler post = new PostHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String json = post.addPosts(request);
            out.write(json);
        } catch (SQLException ex) {
      Logger.getLogger(PostServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
    }
}
