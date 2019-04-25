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
    String resp = "";
    ResponseModel msgToUser = new ResponseModel();
    System.out.print("Response:" + resp);
    try {
      UserModel user = jackson.jsonToPlainObj(request, UserModel.class);
      java.util.Date birthday = DateDB.getBirthdayFromString(user.getBirthday());
      boolean isValid = !db.validate(prpReader.getValue("checkUser"), user.getUsername(),user.getEmail());
                if(isValid){
                db.update(prpReader.getValue("registerUser"),user.getUsername(),
                Encrypter.getMD5(user.getPassword()),user.getName(),user.getLastName(),user.getEmail(),birthday,db.currentTimestamp(),
                user.isSex());
                msgToUser.setStatus(200);
                msgToUser.setMessage("Registro exitoso");
                }
                else{
                msgToUser.setStatus(401);
                msgToUser.setMessage("Usuario o Email ya registrado");
                }
      db.closeCon();
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setMessage("DB Connection Error");
			msgToUser.setStatus(500);
    }
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }
}
