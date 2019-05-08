package handlers;

import Models.ResponseModel;
import Models.UserModel;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import utils.DBConnection;
import utils.DateDB;
import utils.PropReader;
import utils.SuperMapper;

public class UpdateHandler {

    private DBConnection db;
    private PropReader prpReader;
    private SuperMapper jackson;

    public String updateUser(HttpServletRequest request) throws SQLException, IOException {
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        jackson = new SuperMapper();
        ResponseModel resp = new ResponseModel();
        try {
            UserModel userSession = jackson.jsonToPlainObj(request, UserModel.class);
            java.util.Date birthday = DateDB.getBirthdayFromString(userSession.getBirthday());
            HttpSession session = request.getSession();
            session.setAttribute("user", userSession.getUsername());
            db.update(prpReader.getValue("updateUser"), userSession.getName(), userSession.getLastName(), userSession.getEmail(), birthday, userSession.isSex(), userSession.getUsername());
            resp.setStatus(200);
            resp.setMessage("Update Successful");
            resp.setData(userSession);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }
}
