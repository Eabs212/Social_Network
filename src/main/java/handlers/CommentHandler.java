/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.CommentModel;
import Models.ResponseModel;
import Models.UserModel;
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
public class CommentHandler {

    private DBConnection db;
    private PropReader prpReader;
    private SuperMapper jackson;
    private ResultSet rs;

    public String addComment(HttpServletRequest request) throws IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        CommentModel comment = jackson.jsonToPlainObj(request, CommentModel.class);
        comment.setUserId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        ResponseModel msgToUser = new ResponseModel();
        try {
            db.update(prpReader.getValue("insertComment"), comment.getCommentText(), comment.getCommentUrl(), comment.getPostId(), comment.getUserId());
            msgToUser.setStatus(200);
            msgToUser.setMessage("Comment Done");
        } catch (Exception e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(msgToUser);
    }

    public ArrayList<CommentModel> getComments(int post_id) {
        ArrayList<CommentModel> comments = new ArrayList<>();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        try {
            System.out.println(post_id);
            rs = db.execute(prpReader.getValue("getComments"), post_id);
            while (rs.next()) {
                CommentModel comment = new CommentModel();
                UserModel user = new UserModel();
                comment.setData(rs);
                comment.setUserId(rs.getInt(4));
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                comment.setUser(user);

                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            db.closeCon();
        }

        return comments;
    }

    public String deleteComment(HttpServletRequest request) throws IOException {
        jackson = new SuperMapper();
        prpReader = PropReader.getInstance();
        db = new DBConnection();
        CommentModel comment = jackson.jsonToPlainObj(request, CommentModel.class);
        comment.setUserId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
        ResponseModel msgToUser = new ResponseModel();
        try {
            db.update(prpReader.getValue("deleteComment"), comment.getUserId(), comment.getCommentId());
            msgToUser.setStatus(200);
            msgToUser.setMessage("Comment Deleted");
        } catch (Exception e) {
            e.printStackTrace();
            msgToUser.setMessage("DB Connection Error");
            msgToUser.setStatus(500);
        }
        db.closeCon();
        return jackson.plainObjToJson(msgToUser);
    }
}
