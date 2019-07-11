package org.manstein.hailuo.controller;

import org.manstein.hailuo.entity.User;
import org.manstein.hailuo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("userService1")
@RequestMapping("/user")
public class RegisterController {
    @Autowired
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ExampleContext.xml");
    private UserService userService = (UserService) applicationContext.getBean("userService1");
    //private UserService userService;


    @PostMapping(value = "/register")
    public User register(@RequestBody User user){
        System.out.println(user.getUsername()+"_"+user.getPassword());
        return userService.insert(user);}

}
