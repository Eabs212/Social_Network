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

    public String addFriend(int userId, int friendId) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel msgToUser = new ResponseModel();
        //int user1 = Integer.parseInt(request.getParameter("user1"));
        //int user2 = Integer.parseInt(request.getParameter("user2"));
        try {
            boolean validate = db.validate(prpReader.getValue("isFriend"), userId, friendId);
            System.out.println(validate);
            if (!validate) {
                db.update(prpReader.getValue("addFriend"), userId, friendId, userId, friendId);
                msgToUser.setData(true);
                msgToUser.setStatus(200);
                msgToUser.setMessage("New Friend " + friendId);
            } else {
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
        return jackson.plainObjToJson(msgToUser);
    }

    public String isFriend(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        int user1 = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        int user2 = Integer.parseInt(request.getParameter("user"));
        try {
            boolean validate = db.validate(prpReader.getValue("isFriend"), user1, user2);
            System.out.println(validate);
            if (validate) {
                resp.setData(true);
                resp.setStatus(200);
                resp.setMessage("Already Friend");
            } else {
                resp.setData(false);
                resp.setStatus(200);
                resp.setMessage("user");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public String deleteFriend(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        int user1 = Integer.parseInt(request.getParameter("user1"));
        int user2 = Integer.parseInt(request.getParameter("user2"));
        System.out.println(user1 + "-" + user2);
        try {
            db.update(prpReader.getValue("deleteFriend"), user1, user2, user1, user2);
            resp.setData(true);
            resp.setStatus(200);
            resp.setMessage("Friend dismiss");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public String friendList(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        ArrayList<UserModel> friends = new ArrayList<>();
        String username = request.getSession(false).getAttribute("user").toString();
        System.out.println(username);
        try {
            rs = db.execute(prpReader.getValue("friendList"), username);
            while (rs.next()) {
                UserModel user = new UserModel();
                user.setData(rs);
                friends.add(user);
            }
            resp.setData(friends);
            resp.setMessage("List Returned");
            resp.setStatus(200);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }
        public  String checkFriendRequest(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();            
        ResponseModel resp = new ResponseModel();
        Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        Integer friendId = Integer.parseInt(request.getParameter("user"));
        try {
            boolean validate = db.validate(prpReader.getValue("checkFriendReq"), userId, friendId);
            System.out.println(validate);
            if (validate) {
                resp.setData(true);
                resp.setStatus(200);
            } else {
                resp.setData(false);
                resp.setStatus(401);
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }
}

