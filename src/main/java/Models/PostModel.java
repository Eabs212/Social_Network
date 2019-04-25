/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

/**
 *
 * @author Emilio
 */
public class PostModel {
  private Integer idPost, typePost, fileCount;
	private String postText, url;
	private Timestamp creationTime;
	private UserModel user;
	private ArrayList<CommentModel> comments = new ArrayList<>();
	private ArrayList<LikeModel> likes = new ArrayList<>();
  
      public void setData(ResultSet rs) throws SQLException{
                this.setIdPost(rs.getInt(1));
                this.setTypePost(rs.getInt(2));
                this.setPostText(rs.getString(3));
                this.setUrl(rs.getString(4));
                this.setCreationTime(rs.getTimestamp(5));
    }

  public Integer getIdPost() {
    return idPost;
  }

  public void setIdPost(Integer idPost) {
    this.idPost = idPost;
  }

  public Integer getTypePost() {
    return typePost;
  }

  public void setTypePost(Integer typePost) {
    this.typePost = typePost;
  }

  public Integer getFileCount() {
    return fileCount;
  }

  public void setFileCount(Integer fileCount) {
    this.fileCount = fileCount;
  }

  public String getPostText() {
    return postText;
  }

  public void setPostText(String postText) {
    this.postText = postText;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Timestamp getCreationTime() {
    return creationTime;
  }

  public void setCreationTime(Timestamp creationTime) {
    this.creationTime = creationTime;
  }

  public UserModel getUser() {
    return user;
  }

  public void setUser(UserModel user) {
    this.user = user;
  }

  public ArrayList<CommentModel> getComments() {
    return comments;
  }

  public void setComments(ArrayList<CommentModel> comments) {
    this.comments = comments;
  }

  public ArrayList<LikeModel> getLikes() {
    return likes;
  }

  public void setLikes(ArrayList<LikeModel> likes) {
    this.likes = likes;
  }

  
}
