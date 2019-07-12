package org.manstein.hailuo.dao;

        import org.manstein.hailuo.entity.User;

public interface UserDao {
    public User check(User user);
    public int getIDbyName(String username);
    public boolean insertCheck(User user);
    public void save (User user);
}