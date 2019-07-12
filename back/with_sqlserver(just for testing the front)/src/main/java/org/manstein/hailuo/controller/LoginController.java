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

@RestController("userService")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ExampleContext.xml");
    private UserService userService = (UserService) applicationContext.getBean("userService");

    @PostMapping
    public User Login(@RequestBody User user) {
        System.out.println(userService.check(user));
        //System.out.println(userService.check(user).getPassword());
        //System.out.println(userService.check(user).getRight());

        return userService.check(user);
    }
}