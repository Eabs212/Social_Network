/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropReader {
    private static PropReader propr = new PropReader();
    private Properties prop = new Properties();
    private InputStream input = null;

    private PropReader() {
        try {
            input = getClass().getClassLoader().getResourceAsStream("connection.properties");
            prop.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static PropReader getInstance() {
        return propr;
    }

    public String getValue(String key) {
        return prop.getProperty(key);
    }
}
