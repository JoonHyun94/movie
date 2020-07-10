package com.example.movie_back.dao.member;

import com.example.movie_back.dto.MemberVO;

import org.springframework.stereotype.Repository;

@Repository
public interface MemberDao {
    public void insertMember(MemberVO mem);
}