/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.ResponseModel;
import Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import utils.DBConnection;
import utils.PropReader;
import utils.SuperMapper;

/**
 *
 * @author Emilio
 */
public class FriendHandler {
  private DBConnection db;
  private PropReader prpReader;
  private SuperMapper jackson;
  private ResultSet rs;
  
    public String addFriend(HttpServletRequest request) throws SQLException, JsonProcessingException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();
    ResponseModel msgToUser = new ResponseModel();
    String resp="";
    int user1 = Integer.parseInt(request.getParameter("user1"));
    int user2 = Integer.parseInt(request.getParameter("user2"));
    try {
      boolean validate = db.validate(prpReader.getValue("isFriend"), user1, user2);
      System.out.println(validate);
      if(!validate){
      db.update(prpReader.getValue("addFriend"), user1, user2, user1, user2);
			msgToUser.setData(true);
			msgToUser.setStatus(200);
			msgToUser.setMessage("New Friend "+user2);
      }else{
			msgToUser.setData(false);
			msgToUser.setStatus(401);
			msgToUser.setMessage("Already Friend");        
      }
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setMessage("DB Connection Error");
			msgToUser.setStatus(500);
    }    
    db.closeCon();
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }
    
      public String deleteFriend(HttpServletRequest request) throws SQLException, JsonProcessingException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();
    ResponseModel msgToUser = new ResponseModel();
    String resp="";
    int user1 = Integer.parseInt(request.getParameter("user1"));
    int user2 = Integer.parseInt(request.getParameter("user2"));
        System.out.println(user1+"-"+user2);
    try {
      db.update(prpReader.getValue("deleteFriend"), user1, user2, user1, user2);
			msgToUser.setData(true);
			msgToUser.setStatus(200);
			msgToUser.setMessage("Friend dismiss");
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setMessage("DB Connection Error");
			msgToUser.setStatus(500);
    }
    resp = jackson.plainObjToJson(msgToUser);
    db.closeCon();
    return resp;
  }
      
  public String friendList(HttpServletRequest request) throws SQLException, JsonProcessingException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();
    ResponseModel msgToUser = new ResponseModel();
    ArrayList<UserModel> friends = new ArrayList<>();
    String resp="";
    String username = request.getSession(false).getAttribute("user").toString();
    //String username = request.getParameter("user");
    System.out.println(username);
    try {
      rs = db.execute(prpReader.getValue("friendList"), username);
      while (rs.next()) {
        UserModel user = new UserModel();
        user.setData(rs);
        friends.add(user);
      } 
      msgToUser.setData(friends);
      msgToUser.setMessage("List Returned");
      msgToUser.setStatus(200);
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setMessage("DB Error");
			msgToUser.setStatus(500);
    }
    db.closeCon();
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }      
}
