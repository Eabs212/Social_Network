/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import handlers.CommentHandler;
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
public class CommentServlet extends HttpServlet {
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    CommentHandler comment = new CommentHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String json = comment.deleteComment(request);
    out.write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    CommentHandler comment = new CommentHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    String json = comment.addComment(request);
    out.write(json);
    }
}
