package com.example.movie_back.service.member.impl;

import com.example.movie_back.dao.member.MemberDao;
import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.service.member.face.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberDao memberDao;
    
    @Override
    public void setMember(MemberVO mem){
        memberDao.insertMember(mem);
    }
}