package com.example.movie_back.dao.member;

import com.example.movie_back.dto.MemberVO;

import org.springframework.stereotype.Repository;

@Repository
public interface MemberDao {

    public String selectId(MemberVO selectId);

    public String selectPw(MemberVO selectPw);

    public MemberVO selectUser(MemberVO selectUser);

    public String selectSecurityNumber(MemberVO selectSecurityNumber);

    public void insertMember(MemberVO mem);
}