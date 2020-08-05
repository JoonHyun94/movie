package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.example.movie_back.dto.ReserveVO;
import com.example.movie_back.service.member.face.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// CrossWeb 설정 -> 허용 주소
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MypageController {
    @Autowired
    private MemberService MemberService;

    ArrayList<ReserveVO> reserveList = new ArrayList<ReserveVO>();

    @PostMapping("/mypage")
    public ArrayList<ReserveVO> mypage(HttpServletRequest req, ReserveVO reserve) {
        String id = req.getParameter("id");

        reserveList = MemberService.getReserveList(id, reserve);

        System.out.println(reserveList);

        return reserveList;
    }
} 