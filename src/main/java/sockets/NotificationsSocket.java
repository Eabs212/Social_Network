/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;
import Models.NotificationModel;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import configurators.HttpSessionConfig;
import handlers.FriendHandler;
import handlers.NotificationHandler;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import utils.SuperMapper;
/**
 *
 * @author Hijos
 */
@ServerEndpoint(value = "/notifications", configurator = HttpSessionConfig.class)
public class NotificationsSocket {
    SuperMapper jackson;

    private Integer id;
    private ArrayList<NotificationModel> notifications;
    private static HashMap<Integer, Session> wsSessions = new HashMap<>();
    private HttpSession httpSession;

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        jackson = new SuperMapper();
        NotificationHandler notification = new NotificationHandler();
        this.httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        this.id = Integer.parseInt(httpSession.getAttribute("user_id").toString());
        wsSessions.put(id, session);
        this.notifications = notification.getNotifications(id, 20);
        session.getBasicRemote().sendText("Notifications;" + jackson.plainObjToJson(notifications));
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException, SQLException {
        ObjectMapper mapper = new ObjectMapper();
        NotificationHandler notification = new NotificationHandler();        
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        System.out.println(message);
        NotificationModel not = mapper.readValue(message, NotificationModel.class);
        not = notification.addNotification(not);
        if(not.getNotificationAccepted() != null) {
            notification.setAccepted(not.getNotificationAccepted(), not.getNotificationSender(), not.getNotificationReceiver());
        }
        if(not.getTypeNotificationId() == 4) {
            FriendHandler friend = new FriendHandler();
            friend.addFriend(not.getNotificationReceiver(), not.getNotificationSender());
            session.getBasicRemote().sendText("Friend Added");
            if(wsSessions.get(not.getNotificationReceiver()) != null) {
                wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText("Friend Added");
                wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText(mapper.writeValueAsString(not));
            }
        }
        else if((not.getTypeNotificationId() == 5 || not.getTypeNotificationId() == 1 || not.getTypeNotificationId() == 2
        || not.getTypeNotificationId() == 3) && wsSessions.containsKey(not.getNotificationReceiver())) {
            wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText(mapper.writeValueAsString(not));
        }
        this.notifications = notification.getNotifications(id, 20);
        session.getBasicRemote().sendText("Notifications;" + mapper.writeValueAsString(notifications));
    }

    @OnClose
    public void onClose(Session session) {
        wsSessions.remove(this.id);
    }

    @OnError
    public void onError(Session session, Throwable throwable) { throwable.printStackTrace(); }
}
