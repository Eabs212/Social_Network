/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.LikeModel;
import Models.ResponseModel;
import Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
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
public class LikeHandler {

    private DBConnection db;
    private PropReader prpReader;
    private SuperMapper jackson;
    private ResultSet rs;

    public String likePost(HttpServletRequest request) throws IOException, SQLException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        LikeModel like = jackson.jsonToPlainObj(request, LikeModel.class);
        like.setUserId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        ResponseModel resp = new ResponseModel();
        try {
          boolean isliked = db.validate(prpReader.getValue("isLiked"), like.getUserId(), like.getPostId(), like.getTypeLikeId());
          System.out.println(isliked);
          if(!isliked){
          rs = db.execute(prpReader.getValue("insertLike"), like.getUserId(), like.getPostId(), like.getTypeLikeId());
            if (rs.next()) {
                like.setData(rs);
                System.out.println("ASDSA");
                resp.setStatus(200);
                resp.setMessage("Post Liked");
                resp.setData(like);
            }}else{
                resp.setStatus(201);
                resp.setMessage("Already Liked");
          }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(500);
            resp.setMessage("DB Connection Error");
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public String dislikePost(HttpServletRequest request) throws JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        Integer likeId = Integer.parseInt(request.getParameter("likeId"));
        Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        ResponseModel resp = new ResponseModel();
        try {
            db.update(prpReader.getValue("deleteLike"), userId, likeId);
            resp.setStatus(200);
            resp.setMessage("Post Disliked");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public String updateLike(HttpServletRequest request) throws JsonProcessingException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        Integer likeId = Integer.parseInt(request.getParameter("id"));
        Integer typeLikeId = Integer.parseInt(request.getParameter("type"));
        Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        ResponseModel resp = new ResponseModel();
        try {
            db.update(prpReader.getValue("updateLike"), typeLikeId, userId, likeId);
            resp.setStatus(200);
            resp.setMessage("Like Updated");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage("DB Connection Error");
            resp.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(resp);
    }

    public ArrayList<LikeModel> getLikes(int post_id) throws SQLException, JsonProcessingException, IOException {
        ArrayList<LikeModel> likes = new ArrayList<>();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        try {
            System.out.println(post_id);
            rs = db.execute(prpReader.getValue("getLikes"), post_id);
            while (rs.next()) {
                UserModel user = new UserModel();
                LikeModel like = new LikeModel();
                like.setData(rs);
                user.setId(like.getUserId());
                user.setUsername(rs.getString(4));
                user.setName(rs.getString(5));
                user.setLastName(rs.getString(6));
                like.setUser(user);
                likes.add(like);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        db.closeCon();
        return likes;
    }
}
