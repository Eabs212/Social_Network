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
public class SearchHandler {

    private DBConnection db;
    private PropReader prpReader;
    private ResultSet rs;
    private SuperMapper jackson;

    public String searchUsers(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        ArrayList<UserModel> users = new ArrayList<>();
        String search = "%" + request.getParameter("user") + "%";
        System.out.println(search);
        try {
            rs = db.execute(prpReader.getValue("searchUsers"), search, search, search);
            while (rs.next()) {
                UserModel user = new UserModel();
                user.setData(rs);
                users.add(user);
            }
            resp.setData(users);
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

    public String searchFriend(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        ArrayList<UserModel> users = new ArrayList<>();
        String username = request.getSession(false).getAttribute("user").toString();
        String search = "%" + request.getParameter("param") + "%";
        try {
            rs = db.execute(prpReader.getValue("searchFriends"), username, search, search, search);
            while (rs.next()) {
                UserModel user = new UserModel();
                user.setData(rs);
                users.add(user);
            }
            resp.setData(users);
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

    public String getUser(HttpServletRequest request) throws SQLException, JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel resp = new ResponseModel();
        UserModel user = new UserModel();
        String username = request.getParameter("user");
        try {
            rs = db.execute(prpReader.getValue("getUser"), username);
            while (rs.next()) {
                user.setData(rs);
            }
            resp.setData(user);
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
}
