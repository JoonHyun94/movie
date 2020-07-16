package com.example.movie_back.service.member.face;

import java.io.IOException;

import javax.mail.MessagingException;

import com.example.movie_back.dto.MemberVO;

public interface MemberService {

    public boolean login(MemberVO mem);

    public MemberVO getUser(MemberVO mem);

    public boolean dplctId(MemberVO dplctid);

    public boolean checkSecurityNumber(MemberVO mem);

    public void setMember(MemberVO mem);

    public MemberVO getFindUser(MemberVO mem);

    public void sendMail(String id, String pw, String email) throws MessagingException, IOException;

}