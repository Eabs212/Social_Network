
package servlets;

import handlers.UpdateHandler;
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

@WebServlet(name = "UpdateServlet", urlPatterns = {"/update"})
public class UpdateServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {

  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    UpdateHandler updateUser = new UpdateHandler();
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
      try {
          out.print(updateUser.updateUser(request));
      } catch (SQLException ex) {
          Logger.getLogger(UpdateServlet.class.getName()).log(Level.SEVERE, null, ex);
      }
  }
}

