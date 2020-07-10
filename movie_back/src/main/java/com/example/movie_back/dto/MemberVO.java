package com.example.movie_back.dto;

public class MemberVO {
    private String name;
    private String id;
    private String pw;
    private String phone_number;
    private String email;
    private String gender;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }
    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getPhone_Number() {
        return phone_number;
    }
    public void setPhone_Number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
}