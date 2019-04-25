
package filters;

import Models.ResponseModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "Session Filter", urlPatterns = {"/session"})
public class SessionFilter implements Filter {
    
    public SessionFilter() {
    }    
   
    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain)throws IOException, ServletException {
      HttpServletRequest req = (HttpServletRequest) request;
      HttpServletResponse resp = (HttpServletResponse) response;
      String json;
      PrintWriter out = resp.getWriter();
      ObjectMapper objM = new ObjectMapper();
      HttpSession session = req.getSession(false);
      if(session==null){
          chain.doFilter(req, resp);
      }
      else{
          ResponseModel msgToUser = new ResponseModel();
          msgToUser.setMessage("Already logged in");
          msgToUser.setStatus(403);
          json = objM.writeValueAsString(msgToUser);
          out.print(json);
      }
    }

    public void init(FilterConfig fc) throws ServletException {
    }

    public void destroy() {
    }
}