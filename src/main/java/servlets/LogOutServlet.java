
package servlets;

import Models.ResponseModel;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.SuperMapper;

@WebServlet(name = "LogOutServlet",urlPatterns = {"/logout"})
public class LogOutServlet extends HttpServlet {

      @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        SuperMapper objM = new SuperMapper();
        response.setContentType("application/json");
        request.getSession().invalidate();
        ResponseModel msgToUser = new ResponseModel();
        msgToUser.setStatus(200);
        msgToUser.setMessage("Session finished");        
        String json = objM.plainObjToJson(msgToUser);
        response.getWriter().print(json);
    } 
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
    }
}
