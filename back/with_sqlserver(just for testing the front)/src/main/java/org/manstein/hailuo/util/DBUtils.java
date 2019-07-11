package org.manstein.hailuo.util;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.manstein.hailuo.entity.User;

public class DBUtils {
    private static SessionFactory sessionFactory;

    static {
        try {
            Configuration configuration = new Configuration();
            configuration.configure();
            configuration.addAnnotatedClass(User.class);
            sessionFactory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }


    public static Session getSession() throws HibernateException {
        return sessionFactory.openSession();
    }


    public static void rollback(Transaction tx) {
        try {
            if(tx != null) {
                tx.rollback();
            }
        } catch (HibernateException e) {
            System.out.println("rollback faild." + e);
        }
    }

    /*
     * 关闭session
     */
    public static void closeSession() throws HibernateException {
        sessionFactory.close();
    }
}

