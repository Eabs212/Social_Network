/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.PostModel;
import Models.ResponseModel;
import Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import utils.DBConnection;
import utils.PropReader;
import utils.SuperMapper;

/**
 *
 * @author Emilio
 */
@MultipartConfig
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
        ResponseModel<ArrayList<PostModel>> msgToUser = new ResponseModel();
        Integer id = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        Integer postsCount = Integer.parseInt(request.getParameter("posts"));
        String username = request.getSession(false).getAttribute("user").toString();
        CommentHandler comments = new CommentHandler();
        LikeHandler likes = new LikeHandler();
        try {
            rs = db.execute(prpReader.getValue("getPosts"), id, id, postsCount);
            while (rs.next()) {
                PostModel post = new PostModel();
                UserModel user = new UserModel();
                post.setData(rs);
                //post.setFileCount(getFileCount(username, post.getIdPost()));
                user.setUsername(rs.getString(6));
                user.setName(rs.getString(7));
                user.setLastName(rs.getString(8));
                user.setAvatar(rs.getString(9));
                user.setId(rs.getInt(10));
                post.setLikes(likes.getLikes(post.getIdPost()));
                post.setComments(comments.getComments(post.getIdPost()));
                post.setUser(user);
                posts.add(post);
            }
            msgToUser.setData(posts);
            msgToUser.setMessage("Posts Returned");
            msgToUser.setStatus(200);
        } catch (SQLException e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(msgToUser);
    }

    /*public String addPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        PostModel post = jackson.jsonToPlainObj(request, PostModel.class);
        UserModel user = new UserModel();
        user.setId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        //user.setId(Integer.parseInt(request.getParameter("user_id").toString()));
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
    }*/
    public String getUserPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        ArrayList<PostModel> posts = new ArrayList<>();
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        CommentHandler comments = new CommentHandler();
        LikeHandler likes = new LikeHandler();
        Integer userId = Integer.parseInt(request.getParameter("user"));
        ResponseModel<ArrayList<PostModel>> msgToUser = new ResponseModel();

        try {
            rs = db.execute(prpReader.getValue("getUserPosts"), userId);

            while (rs.next()) {
                PostModel post = new PostModel();
                post.setData(rs);
                post.setLikes(likes.getLikes(post.getIdPost()));
                post.setComments(comments.getComments(post.getIdPost()));
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
        return jackson.plainObjToJson(msgToUser);
    }
//REVISAR BIEN LA RUTA

    public String addPosts(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException, ServletException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        PostModel post = jackson.jsonToPlainObj(request, PostModel.class);
        UserModel user = new UserModel();
        user.setId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        String user_username = request.getSession(false).getAttribute("user").toString();
        //user.setId(Integer.parseInt(request.getParameter("user_id").toString()));
        post.setUser(user);
        ResponseModel msgToUser = new ResponseModel();
        if (user_username.trim() != null) {
            Integer option = post.getTypePost();
            switch (option) {
                case 1:
                    try {
                        System.out.println("text only.");
                        db.update(prpReader.getValue("addPost"), post.getUser().getId(), post.getTypePost(), post.getPostText(), null);
                        msgToUser.setStatus(200);
                        msgToUser.setMessage("Added post successfully.");
                        msgToUser.setData(1);
                    } catch (Exception e) {
                        e.printStackTrace();
                        msgToUser.setMessage("Error while posting.");
                        msgToUser.setStatus(500);
                        msgToUser.setData(false);
                    }
                    break;
                case 2:
                    try {
                        System.out.println("Create post with image.");
                        Part file = request.getPart("upImageFile");
                        InputStream filecontent = file.getInputStream();
                        OutputStream output = null;
                        String dirBase = (System.getenv("SystemDrive") + user_username + "\\" + this.getFileName(file));
                        String dirWeb = (System.getenv("SystemDrive") + user_username + "/" + this.getFileName(file));
                        db.update(prpReader.getValue("addPost"), post.getUser().getId(), post.getTypePost(), post.getPostText(), null);
                        output = new FileOutputStream(dirBase);
                        int read = 0;
                        byte[] bytes = new byte[1024];
                        while ((read = filecontent.read(bytes)) != -1) {
                            output.write(bytes, 0, read);
                        }
                        msgToUser.setStatus(200);
                        msgToUser.setMessage("Added post successfully.");
                        msgToUser.setData(2);
                    } catch (Exception e) {
                        e.printStackTrace();
                        msgToUser.setMessage("Error while posting.");
                        msgToUser.setStatus(500);
                        msgToUser.setData(false);
                    }
                    break;
                case 3:
                    try {
                        System.out.println("Create post with video");
                        Part file = request.getPart("upVideoFile");
                        InputStream filecontent = file.getInputStream();
                        OutputStream output = null;
                        String dirBase = (System.getenv("SystemDrive") + user_username + "\\" + this.getFileName(file));
                        String dirWeb = (System.getenv("SystemDrive") + user_username + "/" + this.getFileName(file));
                        db.update(prpReader.getValue("addPost"), post.getUser().getId(), post.getTypePost(), post.getPostText(), dirWeb);
                        output = new FileOutputStream(dirBase);
                        int read = 0;
                        byte[] bytes = new byte[2048];
                        while ((read = filecontent.read(bytes)) != -1) {
                            output.write(bytes, 0, read);
                        }
                        msgToUser.setStatus(200);
                        msgToUser.setMessage("Added post successfully.");
                        msgToUser.setData(3);
                    } catch (Exception e) {
                        e.printStackTrace();
                        msgToUser.setMessage("Error while posting.");
                        msgToUser.setStatus(500);
                        msgToUser.setData(false);
                    }
                    break;
                default:
                    System.out.println("Error Case");
                    msgToUser.setStatus(500);
                    msgToUser.setMessage("Forbiden. Reload The Page.");
                    System.out.println(jackson.plainObjToJson(msgToUser));
                    break;
            }

        }
        db.closeCon();
        return jackson.plainObjToJson(msgToUser);

    }

    public String deletePost(HttpServletRequest request) throws SQLException, JsonProcessingException, IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        //Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
        Integer userId = Integer.parseInt(request.getParameter("user_id"));

        Integer postId = Integer.parseInt(request.getParameter("id"));
        ResponseModel msgToUser = new ResponseModel();
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
        return jackson.plainObjToJson(msgToUser);
    }

    private String getFileName(Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }

}
