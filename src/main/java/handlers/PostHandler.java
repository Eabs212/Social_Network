/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.CommentModel;
import Models.LikeModel;
import Models.PostModel;
import Models.ResponseModel;
import Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.File;
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
public class PostHandler {
  private DBConnection db;
  private PropReader prpReader;
  private SuperMapper jackson;
  private ResultSet rs;
  

    public String getPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        ArrayList<PostModel> posts = new ArrayList<>();
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        ResponseModel msgToUser = new ResponseModel();
        String resp="";
        Integer id = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        Integer postsCount = Integer.parseInt(request.getParameter("posts"));
        String username = request.getSession(false).getAttribute("user").toString();
        try {
          rs = db.execute(prpReader.getValue("getPosts"), id, id, postsCount);
            while (rs.next()) {
                PostModel post = new PostModel();
                UserModel user = new UserModel();
                post.setData(rs);
                post.setFileCount(getFileCount(username, post.getIdPost()));
                user.setUsername(rs.getString(6));
                user.setName(rs.getString(7));
                user.setLastName(rs.getString(8));
                user.setAvatar(rs.getString(9));
                user.setId(rs.getInt(10));
                post.setLikes(getLikes(post.getIdPost()));
                post.setComments(getComments(post.getIdPost()));
                post.setUser(user);
                posts.add(post);
            }
            msgToUser.setData(posts);
            msgToUser.setMessage("Posts Returned");
            msgToUser.setStatus(200);
        } catch(SQLException e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
        }
        db.closeCon();
        resp = jackson.plainObjToJson(msgToUser);
        return resp;
    }

    public String addPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        PostModel post = jackson.jsonToPlainObj(request, PostModel.class);
        UserModel user = new UserModel();
        user.setId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        post.setUser(user);        
        ResponseModel msgToUser = new ResponseModel();
        String resp="";
          try {
          db.update(prpReader.getValue("addPost"), post.getUser().getId(), post.getTypePost(), post.getPostText());
            msgToUser.setStatus(200);
            msgToUser.setMessage("Added post successfully.");
            msgToUser.setData(1);
          } catch (Exception e) {
            e.printStackTrace();
            msgToUser.setMessage("Error while posting.");
            msgToUser.setStatus(500);
            msgToUser.setData(-1);
          }        
        db.closeCon();
        resp = jackson.plainObjToJson(msgToUser);
        return resp;
    }
    public String getUserPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        ArrayList<PostModel> posts = new ArrayList<>();
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        Integer userId = Integer.parseInt(request.getParameter("user"));
        ResponseModel msgToUser = new ResponseModel();
        String resp="";

        try {
          rs = db.execute(prpReader.getValue("getUserPosts"), userId);

            while (rs.next()) {
                PostModel post = new PostModel();
                post.setData(rs);
                post.setLikes(getLikes(post.getIdPost()));
                post.setComments(getComments(post.getIdPost()));
                posts.add(post);
            }
            msgToUser.setData(posts);
            msgToUser.setMessage("User Posts Returned");
            msgToUser.setStatus(200);

        } catch (SQLException e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
        }
        db.closeCon();
        resp = jackson.plainObjToJson(msgToUser);
        return resp;        
    }
    public String deletePost(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        Integer postId = Integer.parseInt(request.getParameter("id"));
        ResponseModel msgToUser = new ResponseModel();
        String resp="";
          try {
            db.update(prpReader.getValue("deletePost"), postId, postId, userId, postId);
            msgToUser.setStatus(200);
            msgToUser.setMessage("Post deleted successfully");
          } catch (Exception e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
          }
        db.closeCon();
        resp = jackson.plainObjToJson(msgToUser);
        return resp;  
    }

    private int getFileCount(String username, int id) {
        String baseDir = System.getenv("SystemDrive") + "/web2p1/assets/users/" + username + "/" + id + "/";
        int count;
        try {
            File file = new File(baseDir);
            count = file.listFiles().length;
        }
        catch(NullPointerException e) { 
          count = 0; 
        }
        return count;
    }
    public ArrayList<LikeModel> getLikes(int post_id) throws SQLException, JsonProcessingException, IOException {
        ArrayList<LikeModel> likes = new ArrayList<>();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        try {
          System.out.println(post_id);          
          rs = db.execute(prpReader.getValue("getLikes"), post_id);
            while(rs.next()) {
                UserModel user = new UserModel();
                LikeModel like = new LikeModel();
                like.setData(rs);
                          System.out.println(rs.toString()+" 1");          
                          System.out.println("putras");          

                user.setId(like.getUserId());
                user.setUsername(rs.getString(4));
                user.setName(rs.getString(5));
                user.setLastName(rs.getString(6));
                like.setUser(user);
                likes.add(like);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return likes;
    }
    public ArrayList<CommentModel> getComments(int post_id) throws SQLException, JsonProcessingException, IOException {
        ArrayList<CommentModel> comments = new ArrayList<>();        
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        try {
          System.out.println(post_id);
            rs = db.execute(prpReader.getValue("getComments"), post_id);
            while(rs.next()) {
                CommentModel comment = new CommentModel();
                UserModel user = new UserModel();
                comment.setData(rs);
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                comment.setUser(user);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        db.closeCon();
        return comments; 
    }
}