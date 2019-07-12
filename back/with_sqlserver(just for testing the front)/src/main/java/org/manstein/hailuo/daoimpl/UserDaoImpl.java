package org.manstein.hailuo.daoimpl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.manstein.hailuo.dao.UserDao;
import org.manstein.hailuo.entity.User;
import org.manstein.hailuo.util.DBUtils;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    private SessionFactory sessionFactory;

    public User check(User user) {
        boolean has=false;
        Session session = DBUtils.getSession();
        Transaction tx = session.beginTransaction();
        System.out.println(user.getUsername()+user.getPassword());
        List list  = session.createQuery("from org.manstein.hailuo.entity.User").list();
        if (list != null) {
            Iterator it = list.iterator();
            while (it.hasNext()) {
                User use = (User) it.next();
                if (use.getUsername().equals(user.getUsername()) ) {
                        user = use;
                        has = true;
                        break;
                }
            }
        }
        tx.commit();
        session.clear();
        if (has) return user;
        user.setRight(-1);
        return user;
    }

    public int getIDbyName(String username) {
        User user = new User();
        boolean has=false;
        Session session = DBUtils.getSession();
        Transaction tx = session.beginTransaction();
        List list  = session.createQuery("from org.manstein.hailuo.entity.User").list();
        if (list != null) {
            Iterator it = list.iterator();
            while (it.hasNext()) {
                User use = (User) it.next();
                if (use.getUsername().equals(username) ) {
                    user=use;
                    has = true;
                }
            }
        }
        tx.commit();
        session.clear();
        if (has)
            return user.getID();
        else
            return 0;
    }

    public boolean insertCheck(User user){
        boolean suc=true;
        Session session = DBUtils.getSession();
        Transaction tx = session.beginTransaction();

        List list = null;
        list = session.createQuery("from org.manstein.hailuo.entity.User").list();
        if (list != null) {
            Iterator it = list.iterator();
            while (it.hasNext()) {
                User use = (User) it.next();
                if (use.getUsername().equals(user.getUsername())) {
                    suc=false;
                    break;
                }
            }
        }
        tx.commit();
        session.clear();
        return suc;
    }

    public void save(User user){
        Session session = DBUtils.getSession();
        Transaction tx = session.beginTransaction();

        user.setRight(1);
        session.save(user);

        tx.commit();
        session.clear();
    }
}