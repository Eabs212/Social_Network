
package utils;
import java.text.MessageFormat;
import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

public class MailSender extends Thread{
    private PropReader pReader = PropReader.getInstance();

      public void sendFriendRequest(HttpServletRequest  request, String email, String name) {
        
     //Get the session object
      Properties properties = System.getProperties();
      properties.put("mail.smtp.host", "smtp.gmail.com");
      properties.setProperty("mail.smtp.starttls.enable", "true");
      properties.setProperty("mail.smtp.port", "587");
      properties.setProperty("mail.smtp.user", "mangaku.subscribe@gmail.com");
      properties.setProperty("mail.smtp.auth", "true");
      Session session = Session.getDefaultInstance(properties);
      String host = "localhost:"+request.getServerPort();
      String bodyText = MessageFormat.format(pReader.getValue("friendReqHTML"),host, name);
     //compose the message
      try{             
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(pReader.getValue("emailUser"));
            msg.setRecipients(Message.RecipientType.TO, email);
            msg.setSubject("You have a Friend Request on Pandagram");
            msg.setSentDate(new Date());
            msg.setText(bodyText,"UTF-8", "html");
            Transport.send(msg, pReader.getValue("emailUser"), pReader.getValue("emailPassword"));

         // Send message
        Transport t = session.getTransport("smtp");
        t.connect(pReader.getValue("mailUser"), pReader.getValue("mailPassword"));
        t.sendMessage(msg, msg.getAllRecipients());
        t.close();
         System.out.println("message sent successfully....");

      }catch (MessagingException mex) {
        mex.printStackTrace();
      }
    }
}
