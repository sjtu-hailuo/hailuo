package org.manstein.hailuo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class hailuoApplication {

    public static void main(String[] args) {
        try{
            ClassLoader.getSystemClassLoader().loadClass("org.manstein.hailuo.util.DBUtils");
        }catch(Exception e){
            e.printStackTrace();
        }
        SpringApplication.run(hailuoApplication.class, args);
    }
}
