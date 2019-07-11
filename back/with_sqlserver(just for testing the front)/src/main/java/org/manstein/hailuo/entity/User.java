package org.manstein.hailuo.entity;
import javax.persistence.*;

@Entity
@Table(name = "member")
public class User {
    private int ID;
    private String username;
    private String password;
    private int right;

    public User(){}

    public User(int ID,String username, String password, int right){
        this.ID=ID;
        this.username = username;
        this.password = password;
        this.right = right;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getID() {
        return this.ID;
    }
    public void setID(int ID) {
        this.ID = ID;
    }

    @Column(name = "username")
    public String getUsername() {
        return this.username;
    }
    public void setUsername(String userName) {
        this.username = userName;
    }

    @Column(name = "password")
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "rights")
    public int getRight() {
        return this.right;
    }
    public void setRight(int right) {
        this.right = right;
    }

}