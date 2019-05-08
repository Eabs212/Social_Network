/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Emilio
 */
public class LikeModel {
  private Integer likeId, userId, postId, typeLikeId;
	private UserModel user;
  
  public void setData(ResultSet rs) throws SQLException{
                this.setLikeId(rs.getInt(1));
                this.setUserId(rs.getInt(2));
                this.setTypeLikeId(rs.getInt(3));    

    }

  public Integer getLikeId() {
    return likeId;
  }

  public void setLikeId(Integer likeId) {
    this.likeId = likeId;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getPostId() {
    return postId;
  }

  public void setPostId(Integer postId) {
    this.postId = postId;
  }

  public Integer getTypeLikeId() {
    return typeLikeId;
  }

  public void setTypeLikeId(Integer typeLikeId) {
    this.typeLikeId = typeLikeId;
  }

  public UserModel getUser() {
    return user;
  }

  public void setUser(UserModel user) {
    this.user = user;
  }
  
}
