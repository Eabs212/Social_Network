/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

/**
 *
 * @author Hijos
 */
public class NotificationModel {
    	private Integer notificationId, notificationSender, notificationReceiver, typeNotificationId;
	private Timestamp notificationDate;
	private Boolean notificationAccepted;
	private UserModel user;
	private PostModel post;
	private CommentModel comment;
	private LikeModel like;
        
      public void setData(ResultSet rs) throws SQLException{
                        this.setNotificationId(rs.getInt(1));
                        this.setNotificationSender(rs.getInt(2));
                        this.setNotificationReceiver(rs.getInt(3));
                        this.setNotificationDate(rs.getTimestamp(4));
                        this.setNotificationAccepted(rs.getBoolean(5));        
      }
      
    public Integer getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }

    public Integer getNotificationSender() {
        return notificationSender;
    }

    public void setNotificationSender(Integer notificationSender) {
        this.notificationSender = notificationSender;
    }

    public Integer getNotificationReceiver() {
        return notificationReceiver;
    }

    public void setNotificationReceiver(Integer notificationReceiver) {
        this.notificationReceiver = notificationReceiver;
    }

    public Integer getTypeNotificationId() {
        return typeNotificationId;
    }

    public void setTypeNotificationId(Integer typeNotificationId) {
        this.typeNotificationId = typeNotificationId;
    }

    public Timestamp getNotificationDate() {
        return notificationDate;
    }

    public void setNotificationDate(Timestamp notificationDate) {
        this.notificationDate = notificationDate;
    }

    public Boolean getNotificationAccepted() {
        return notificationAccepted;
    }

    public void setNotificationAccepted(Boolean notificationAccepted) {
        this.notificationAccepted = notificationAccepted;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public PostModel getPost() {
        return post;
    }

    public void setPost(PostModel post) {
        this.post = post;
    }

    public CommentModel getComment() {
        return comment;
    }

    public void setComment(CommentModel comment) {
        this.comment = comment;
    }

    public LikeModel getLike() {
        return like;
    }

    public void setLike(LikeModel like) {
        this.like = like;
    }

}
