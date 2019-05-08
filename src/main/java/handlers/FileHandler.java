/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handlers;

import Models.ResponseModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import utils.SuperMapper;

/**
 *
 * @author Emilio
 */
public class FileHandler {

  private SuperMapper jackson;

  public String fileUp(HttpServletRequest request) throws JsonProcessingException, IOException, ServletException {
    jackson = new SuperMapper();
    Collection<Part> files = request.getParts();
    int typePost = Integer.parseInt(request.getParameter("type"));
    String id = request.getParameter("id");
    String extension = typePost == 2 ? ".png" : typePost == 3 ? ".mkv" : ".flac";
    InputStream fileContent = null;
    OutputStream out = null;
    File fileObj = null;
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";
    try {
      String baseDir = System.getenv("SystemDrive") + "/web2file/assets/users/" + request.getSession(false).getAttribute("user")
              + "/" + id + "/";
      int i = 0;
      System.out.println(baseDir);
      for (Part file : files) {
        i++;
        fileContent = file.getInputStream();
        fileObj = new File(baseDir + i + extension);
        fileObj.getParentFile().mkdirs();
        out = new FileOutputStream(fileObj);
        int read = 0;
        byte[] bytes = new byte[1024];
        while ((read = fileContent.read(bytes)) != -1) {
          out.write(bytes, 0, read);
        }
        fileContent.close();
        out.close();
        msgToUser.setStatus(200);
        msgToUser.setMessage("Uploaded files successfully.");
      }
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setStatus(500);
      msgToUser.setMessage("Error uploading files");
    }
    resp = jackson.plainObjToJson(msgToUser);
    return resp;

  }

  public String fileUpdate(HttpServletRequest request) throws JsonProcessingException, IOException, ServletException {

    jackson = new SuperMapper();
    ResponseModel msgToUser = new ResponseModel();
    String resp = "";
    Part file = request.getPart("file");
    System.out.println(file);
    InputStream fileContent = null;
    OutputStream out = null;
    File fileObj = null;
    try {
      String baseDir = System.getenv("SystemDrive") + "/web2files/assets/avatars/";
      fileContent = file.getInputStream();
      fileObj = new File(baseDir + request.getSession(false).getAttribute("username") + ".png");
      fileObj.getParentFile().mkdirs();
      out = new FileOutputStream(fileObj);
      int read = 0;
      byte[] bytes = new byte[1024];
      while ((read = fileContent.read(bytes)) != -1) {
        out.write(bytes, 0, read);
      }
      fileContent.close();
      out.close();
      msgToUser.setStatus(200);
      msgToUser.setMessage("Uploaded file successfully.");
    } catch (Exception e) {
      e.printStackTrace();
      msgToUser.setStatus(500);
      msgToUser.setMessage("Error uploading file.");
    }
    resp = jackson.plainObjToJson(msgToUser);
    return resp;
  }

  public void fileDown(HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException, IOException, ServletException {
        String fileType = request.getParameter("type");
        String contentType = "";
        switch (fileType){
            case "Image": contentType = "image/*";
            break;
            case "Audio": contentType = "audio/*";
            break;
            case "Video": contentType = "video/*";
            break;
        }

        response.setContentType(contentType);

        String dir = request.getParameter("dir");
        File my_file = new File(dir);

        OutputStream out = response.getOutputStream();
        FileInputStream in = new FileInputStream(my_file);
        byte[] buffer = new byte[4096];
        int length;
        while ((length = in.read(buffer)) > 0){
            out.write(buffer, 0, length);
        }
        in.close();
        out.flush();
}
}
