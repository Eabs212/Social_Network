/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.PostModel;
import Models.ResponseModel;
import Models.UserModel;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import static java.util.Map.Entry.comparingByValue;
import javax.servlet.http.HttpServletRequest;
import utils.DBConnection;
import utils.PropReader;
import utils.SuperMapper;

/**
 *
 * @author Emilio
 */
public class AdminHandler {
    private DBConnection db;
    private PropReader prpReader;
    private SuperMapper jackson;
    private ResultSet rs;


    public ResponseModel<HashMap<String, ArrayList<PostModel>>> postsByType() {
        db = new DBConnection();
        prpReader = PropReader.getInstance();
        ResponseModel<HashMap<String, ArrayList<PostModel>>> resp = new ResponseModel<>();
        ArrayList<PostModel> audioPosts = new ArrayList<>();
        ArrayList<PostModel> textPosts = new ArrayList<>();
        ArrayList<PostModel> videoPosts = new ArrayList<>();
        ArrayList<PostModel> imagePosts = new ArrayList<>();
        HashMap<String, ArrayList<PostModel>> typeP = new HashMap<>();

        try {
            rs = db.execute(prpReader.getValue("getAllPosts"));
            while(rs.next()) {
                PostModel post = new PostModel();
                UserModel user = new UserModel();
                post.setData(rs);
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                user.setId(rs.getInt(8));
                post.setLikes(null);
                post.setComments(null);
                post.setUser(user);
                if(post.getTypePost() == 1) { textPosts.add(post); }
                if(post.getTypePost() == 2) { imagePosts.add(post); }
                if(post.getTypePost() == 3) { videoPosts.add(post); }
                if(post.getTypePost() == 4) { audioPosts.add(post); }
            }
            resp.setStatus(200);
            typeP.put("textPosts", textPosts);
            typeP.put("audioPosts", audioPosts);
            typeP.put("videoPosts", videoPosts);
            typeP.put("imagePosts", imagePosts);
            resp.setMessage("Stats returned.");
            resp.setData(typeP);

        } catch(SQLException e) {
            resp.setStatus(500);
            resp.setMessage("DB Connection Error");
        }
        db.closeCon();
        return resp;
    }

    public ResponseModel<HashMap<String, ArrayList<UserModel>>> usersByGenre() {
        db = new DBConnection();
        prpReader = PropReader.getInstance();
        ResponseModel<HashMap<String, ArrayList<UserModel>>> response = new ResponseModel<>();
        ArrayList<UserModel> male = new ArrayList<>();
        ArrayList<UserModel> female = new ArrayList<>();
        HashMap<String, ArrayList<UserModel>> userG = new HashMap<>();
        try {
            rs = db.execute(prpReader.getValue("getAllUsers"));
            while(rs.next()) {
                UserModel user = new UserModel();
                user.setData(rs);
                if(user.isSex()) { male.add(user); }
                else { female.add(user); }
            }
            response.setStatus(200);
            response.setMessage("Stats returned.");
            userG.put("male", male);
            userG.put("female", female);
            response.setData(userG);
        } catch(SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }
        db.closeCon();
        return response;
    }

    public ResponseModel<LinkedHashMap<String, ArrayList<PostModel>>> usersByPosts() {
        db = new DBConnection();
        prpReader = PropReader.getInstance();      
        ResponseModel<LinkedHashMap<String, ArrayList<PostModel>>> response = new ResponseModel<>();
        HashMap<String, ArrayList<PostModel>> map = new HashMap<>();
        HashMap<String, Integer> quantity = new HashMap<>();
        LinkedHashMap<String, ArrayList<PostModel>> data = new LinkedHashMap<>();

        return response;
    }

    public static ResponseModel<LinkedHashMap<String, ArrayList<UserModel>>> usersByFriends() {
        ResponseModel<LinkedHashMap<String, ArrayList<UserModel>>> response = new ResponseModel<>();
        HashMap<String, ArrayList<UserModel>> map = new HashMap<>();
        HashMap<String, Integer> quantity = new HashMap<>();
        LinkedHashMap<String, ArrayList<UserModel>> data = new LinkedHashMap<>();


        return response;
    }

    public  ResponseModel<LinkedHashMap<Integer, ArrayList<UserModel>>> usersByAge() {
        ResponseModel<LinkedHashMap<Integer, ArrayList<UserModel>>> response = new ResponseModel<>();
        LinkedHashMap<Integer, ArrayList<UserModel>> data = new LinkedHashMap<>();

        return response;
    }

    public ResponseModel<ArrayList<PostModel>> postsByLikes() {
        ResponseModel<ArrayList<PostModel>> response = new ResponseModel<>();
        ArrayList<PostModel> data = new ArrayList<>();
        HashMap<Integer, Integer> unsorted = new HashMap<>();
        HashMap<Integer, PostModel> posts = new HashMap<>();


        return response;
    }

    public static ResponseModel<ArrayList<PostModel>> postsByComments() {
      return null;

    }



    public String changeUserState(HttpServletRequest request) throws IOException{
        db = new DBConnection();
        prpReader = PropReader.getInstance();
        jackson = new SuperMapper();
        UserModel user = jackson.jsonToPlainObj(request, UserModel.class);
        ResponseModel resp = new ResponseModel();


    try {
      db.update(prpReader.getValue("changeUserState"), user.getId(), user.isEnabled());
      resp.setStatus(200);
      resp.setMessage("User Updated");
    } catch (Exception e) {
      e.printStackTrace();
      resp.setMessage("DB Connection Error");
      resp.setStatus(500);
    }
    db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public String searchUser(HttpServletRequest request) {
        return null;
    }

    public String searchPosts(HttpServletRequest request) {
        return null;
    }

    public String searchComments(HttpServletRequest request) {
        return null;
    }

    public String deletePost(HttpServletRequest request) {
      return null;
 //copiar lo mismo de postHandler
    }

    public String deleteComment(HttpServletRequest request) {
      return null;
 //copiar lo mismo de commentHandler
    }


}
