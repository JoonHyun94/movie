package com.example.movie_back.service.member.impl;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.example.movie_back.dao.member.MemberDao;
import com.example.movie_back.dto.MemberVO;
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
	JavaMailSender javaMailSender;
	@Autowired
    SpringTemplateEngine templateEngine;
    
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
    public void sendMail(String email) throws MessagingException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage(); 
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8"); 
        try {
            messageHelper.setTo("slio_7@naver.com"); 
            messageHelper.setText("test메일입니다."); 
            messageHelper.setFrom("sjhs9596@gmail.com"); 
            messageHelper.setSubject("test"); // 메일제목은 생략이 가능하다 
            javaMailSender.send(message);
        } catch(Exception e) { 
            System.out.println(e); 
        }
    }
}