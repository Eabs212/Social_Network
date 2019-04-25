/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.LikeModel;
import Models.ResponseModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
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
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";    
		try {
      rs = db.execute(prpReader.getValue("insertLike"), like.getUserId(), like.getPostId(), like.getTypeLikeId());
			like.setData(rs);
			msgToUser.setStatus(200);
			msgToUser.setMessage("Post Liked");
			msgToUser.setData(like);

		} catch (SQLException e) {
			e.printStackTrace();
			msgToUser.setStatus(500);
			msgToUser.setMessage("DB Connection Error");
		}
    db.closeCon();
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
	}

	public String dislikePost(HttpServletRequest request) throws JsonProcessingException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();    
		Integer likeId = Integer.parseInt(request.getParameter("likeId"));
		Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";       
        try {
      db.update(prpReader.getValue("deleteLike"), userId, likeId);
      msgToUser.setStatus(200);
      msgToUser.setMessage("Post Disliked");
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setMessage("DB Connection Error");
      msgToUser.setStatus(500);
    }
    db.closeCon();
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
	}

	public String updateLike(HttpServletRequest request) throws JsonProcessingException {
    jackson = new SuperMapper();
    prpReader = PropReader.getInstance();
    db = new DBConnection();     
    Integer likeId = Integer.parseInt(request.getParameter("id"));
		Integer typeLikeId = Integer.parseInt(request.getParameter("type"));
		Integer userId = Integer.parseInt(request.getSession(false).getAttribute("user_id").toString());
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";     
        try {
      db.update(prpReader.getValue("updateLike"), typeLikeId, userId, likeId);
      msgToUser.setStatus(200);
      msgToUser.setMessage("Like Updated");
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
