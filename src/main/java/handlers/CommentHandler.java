/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.CommentModel;
import Models.ResponseModel;
import java.io.IOException;
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

  public String addComment(HttpServletRequest request) throws IOException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();
    CommentModel comment = jackson.jsonToPlainObj(request, CommentModel.class);
    comment.setUserId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";
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
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }

  public String deleteComment(HttpServletRequest request) throws IOException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();
    CommentModel comment = jackson.jsonToPlainObj(request, CommentModel.class);
    comment.setUserId(Integer.parseInt(request.getSession(false).getAttribute("user_id").toString()));
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";
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
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }
}
