package com.example.movie_back.service.member.impl;

import java.io.IOException;
import java.util.ArrayList;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.example.movie_back.dao.member.MemberDao;
import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;
import com.example.movie_back.service.member.face.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberDao memberDao;
    @Autowired
	private JavaMailSender javaMailSender;
	@Autowired
    private SpringTemplateEngine templateEngine;
    
    private static final String FROM_ADDRESS = "sjhs9596@gmail.com";
    
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
    public boolean checkSecurityNumber(MemberVO checkSecurity) {
        boolean result = false;
        String sercurityNumber = memberDao.selectSecurityNumber(checkSecurity);

        System.out.println(sercurityNumber);
        if(sercurityNumber.equalsIgnoreCase("null")) {
            result = true;
        }
        
        return result;
    }

    @Override
    public void setMember(MemberVO mem) {
        memberDao.insertMember(mem);
    }

    @Override
    public MemberVO getFindUser(MemberVO mem) {
        MemberVO resultMem;
        resultMem = memberDao.selectFindUser(mem);

        if(resultMem == null) {
            mem.setId("null");
            mem.setPw("null");
        } else {
            mem.setId(resultMem.getId());
            mem.setPw(resultMem.getPw());
        }

        return mem;
    }

    @Override
    public void sendMail(String id, String pw, String email) throws MessagingException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        //메일 제목 설정
        helper.setSubject("ID/PW 찾기 문의 결과 입니다.");
        //수신자 설정
        helper.setTo(email);
        helper.setText(("회원님의 ID는" + id + "이며" + "password는" + pw + "입니다."), true);
        
        //메일 보내기
        javaMailSender.send(message);

    }
 
    @Override
    public ArrayList<ReserveVO> getReserveList(String id, ReserveVO reserve) {
        ArrayList<ReserveVO> result = new ArrayList<ReserveVO>();

        result = memberDao.selectReserveList(id);
                
        return result;
    }

    @Override
    public MemberVO getUserInfo(MemberVO mem) {
        return mem = memberDao.selectUserInfo(mem);
    }

    @Override
    public boolean checkMember(MemberVO mem) {
        boolean result = true;
        
        String id = memberDao.selectId(mem);
        String pw = memberDao.selectPw(mem);

        if(id.equalsIgnoreCase("null") || pw.equalsIgnoreCase("null")) {
            result = false;
        }

        return result;
    }

    @Override
    public void removeMember(MemberVO mem) {
        memberDao.deleteMember(mem);
    }

    @Override
    public void addMemberImg(String id, String imgsrc) {
        memberDao.addMemberImg(id, imgsrc);
    }
}