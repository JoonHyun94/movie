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
    public boolean login(MemberVO mem){
        boolean result = true;

        String id = memberDao.selectId(mem);
        String pw = memberDao.selectPw(mem);

        System.out.println("id : " + id);
        System.out.println("pw : " + pw);
        if(id.equalsIgnoreCase("null") || pw.equalsIgnoreCase("null")){
            result = false;
        }

        return result;
    }

    @Override
    public MemberVO getUser(MemberVO mem){
        return memberDao.selectUser(mem);
    }

    @Override
    public boolean dplctId(MemberVO dplctid){
        boolean result = false;
        String id = memberDao.selectId(dplctid);

        if(id.equalsIgnoreCase("null")){
            result = true;
        }

        return result;
    }

    @Override
    public void setMember(MemberVO mem){
        memberDao.insertMember(mem);
    }
}