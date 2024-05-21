package gm.app.service;


import gm.app.models.User;

import java.util.List;

public interface IUserService {
    public List<User> getUsers();

    public List<User> getActiveUsers();

    public User getUser(Integer id);

    public User createUser(User user);

    public User updateUser(User user);

    public void deleteUser(Integer id);

    public void deactiveUser(Integer id);
}

