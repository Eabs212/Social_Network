
package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import handlers.LoginHandler;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {

  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    LoginHandler loginUser = new LoginHandler();
    PrintWriter out = response.getWriter();
        try{
            response.setContentType("application/json");
            String json = loginUser.loginUser(request);
            out.write(json);
        } catch (SQLException ex) {
      Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
    }

  }

}
