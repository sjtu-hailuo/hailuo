package org.manstein.hailuo.service;

import org.manstein.hailuo.entity.User;

public interface UserService {
    public User check(User user);
    public User insert(User user);
}