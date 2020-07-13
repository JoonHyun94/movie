package com.example.movie_back.service.member.face;

import com.example.movie_back.dto.MemberVO;

public interface MemberService {

    public boolean login(MemberVO mem);

    public MemberVO getUser(MemberVO mem);

    public boolean dplctId(MemberVO dplctid);

    public void setMember(MemberVO mem);

}