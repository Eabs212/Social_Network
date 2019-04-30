/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.NotificationModel;
import Models.UserModel;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import utils.DBConnection;
import utils.PropReader;

/**
 *
 * @author Hijos
 */
public class NotificationHandler {
	private PropReader prpReader;
        private DBConnection db;
        private ResultSet rs;        
	public ArrayList<NotificationModel> getNotifications(int userId, int notCount) {
		ArrayList<NotificationModel> notifications = new ArrayList<>();
                prpReader = PropReader.getInstance();
                db = new DBConnection();
		try {
                        rs = db.execute(prpReader.getValue("getNotifications"), userId, notCount);
			while(rs.next()) {
				NotificationModel not = new NotificationModel();
				UserModel user = new UserModel();
                                not.setData(rs);
				if(rs.wasNull()) { not.setNotificationAccepted(null); }
				not.setTypeNotificationId(rs.getInt(6));
				user.setUsername(rs.getString(7));
				user.setName(rs.getString(8));
				user.setLastName(rs.getString(9));
				not.setUser(user);
				notifications.add(not);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return notifications;
	}

	public NotificationModel addNotification(NotificationModel notification) {
                prpReader = PropReader.getInstance();
                db = new DBConnection();
		try {
                        rs = db.execute(prpReader.getValue("insertNotification"), notification.getNotificationSender(), notification.getNotificationReceiver(), notification.getTypeNotificationId(), notification.getNotificationAccepted());
			rs.next();
			notification.setNotificationId(rs.getInt(1));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return notification;
	}

	public void setAccepted(Boolean accepted, int receiverId, int senderId) {
                prpReader = PropReader.getInstance();
                db = new DBConnection();
                db.update(prpReader.getValue("setAcceptedNotification"), accepted, senderId, receiverId);
	}
}