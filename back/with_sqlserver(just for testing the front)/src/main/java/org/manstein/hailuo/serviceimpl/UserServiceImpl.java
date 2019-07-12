package org.manstein.hailuo.serviceimpl;

import org.manstein.hailuo.dao.UserDao;
import org.manstein.hailuo.daoimpl.UserDaoImpl;
import org.manstein.hailuo.entity.User;
import org.manstein.hailuo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userDao")
public class UserServiceImpl implements UserService {
    @Autowired
    //ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ExampleContext.xml");
    //private UserDao userDao = (UserDao) applicationContext.getBean("userDao");
    private UserDao userDao = new UserDao() {
        UserDaoImpl u = new UserDaoImpl();
        @Override
        public User check(User user) {
            return u.check(user);
        }
        @Override
        public int getIDbyName(String username) {
            return u.getIDbyName(username);
        }
        @Override
        public boolean insertCheck(User user) {
            return u.insertCheck(user);
        }
        @Override
        public void save(User user) {
            u.save(user);
        }
    };
    public User check(User user){
        return userDao.check(user);
    }
    public User insert(User user) {
        if (userDao.insertCheck(user)) {
            userDao.save(user);
            user.setRight(1);
            return user;
        }
        user.setUsername("exist");
        return user;
    }
}