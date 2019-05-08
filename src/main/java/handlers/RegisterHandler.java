package handlers;

import Models.ResponseModel;
import Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import utils.DBConnection;
import utils.DateDB;
import utils.Encrypter;
import utils.PropReader;
import utils.SuperMapper;

public class RegisterHandler {

    private DBConnection db;
    private PropReader prpReader;
    private SuperMapper jackson;

    public String insertUser(HttpServletRequest request) throws SQLException, JsonProcessingException {
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        jackson = new SuperMapper();
        ResponseModel resp = new ResponseModel();
        try {
            UserModel user = jackson.jsonToPlainObj(request, UserModel.class);
            java.util.Date birthday = DateDB.getBirthdayFromString(user.getBirthday());
            boolean isValid = !db.validate(prpReader.getValue("checkUser"), user.getUsername(), user.getEmail());
            if (isValid) {
                db.update(prpReader.getValue("registerUser"), user.getUsername(),
                        Encrypter.getMD5(user.getPassword()), user.getName(), user.getLastName(), user.getEmail(), birthday, db.currentTimestamp(),
                        user.isSex());
                resp.setStatus(200);
                resp.setMessage("Registro exitoso");
            } else {
                resp.setStatus(401);
                resp.setMessage("Usuario o Email ya registrado");
            }
            db.closeCon();
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        return jackson.plainObjToJson(resp);
    }
}
