package com.example.movie_back.service.member.face;

import com.example.movie_back.dto.MemberVO;

public interface MemberService {

    public boolean login(MemberVO mem);

    public String getName(MemberVO mem);

    public boolean dplctId(MemberVO dplctid);

    public void setMember(MemberVO mem);

}