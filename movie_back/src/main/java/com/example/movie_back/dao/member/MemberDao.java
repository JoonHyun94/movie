package com.example.movie_back.dao.member;

import java.util.ArrayList;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;

import org.springframework.stereotype.Repository;

@Repository
public interface MemberDao {

    public String selectId(MemberVO selectId);

    public String selectPw(MemberVO selectPw);

    public MemberVO selectUser(MemberVO selectUser);

    public String selectSecurityNumber(MemberVO selectSecurityNumber);

    public MemberVO selectFindUser(MemberVO selectIdPw);

    public void insertMember(MemberVO mem);

    public ArrayList<ReserveVO> selectReserveList(String id);

    public MemberVO selectUserInfo(MemberVO selectUserInfo);

}