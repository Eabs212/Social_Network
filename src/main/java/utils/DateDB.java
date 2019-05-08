/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 *
 * @author Emilio
 */
public class DateDB {


    public static Date getBirthdayFromString(String birthday){
        java.sql.Date sqlBdayDate = null;
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date date = format.parse(birthday);
            sqlBdayDate = new java.sql.Date(date.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return sqlBdayDate;
    }



}
