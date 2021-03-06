package com.example.movie_back.service.member.face;

import java.io.IOException;
import java.util.ArrayList;

import javax.mail.MessagingException;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;

public interface MemberService {

    public boolean login(MemberVO mem);

    public MemberVO getUser(MemberVO mem);

    public boolean dplctId(MemberVO dplctid);

    public boolean checkSecurityNumber(MemberVO mem);

    public void setMember(MemberVO mem);

    public MemberVO getFindUser(MemberVO mem);

    public void sendMail(String id, String pw, String email) throws MessagingException, IOException;

    public ArrayList<ReserveVO> getReserveList(String id, ReserveVO reserve);

    public MemberVO getUserInfo(MemberVO mem);

    public boolean checkMember(MemberVO mem);

    public void removeMember(MemberVO mem);

    public void addMemberImg(MemberVO mem, String imgsrc);

}