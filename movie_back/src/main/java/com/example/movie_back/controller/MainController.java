package com.example.movie_back.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.service.member.face.MemberService;
import com.example.movie_back.service.movielist.face.MovieListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// CrossWeb 설정 -> 허용 주소
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MainController {
	@Autowired
    private MovieListService movieListService;
    @Autowired
    private MemberService memberService;

    //Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/Program Files/selenium/chromedriver_win32/chromedriver.exe";
    public String url;
    
    ArrayList<HashMap<String,String>> movieList = new ArrayList<HashMap<String,String>>();
    
    @GetMapping("/list")
    public ArrayList<HashMap<String,String>> movielist() {

        url = movieListService.Selenium(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        movieList = movieListService.getMovieList(url);
    
        return movieList;
    }

    @GetMapping("/main")
    public ArrayList<HashMap<String,String>> topMovieList() {

        movieList = movieListService.getTopMovieList();

        return movieList;
    }

    @PostMapping("/login")
    public MemberVO login(HttpServletRequest req, HttpSession session, MemberVO mem) {
        boolean result;
        session = req.getSession();

        mem.setId(req.getParameter("id"));
        mem.setPw(req.getParameter("pw"));
        result = memberService.login(mem);

        if(result == true) {
            mem = memberService.getUser(mem);
            session.setAttribute("member", mem);
        } else {
            mem.setName("null");
        }

        System.out.println(session.getAttribute("member"));

        return mem;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        System.out.println("logout");
        session.invalidate();
    }

    @PostMapping("/dplct")
    public boolean dplct(HttpServletRequest req, HttpSession session, MemberVO mem) {
        boolean result;

        mem.setId(req.getParameter("id"));
        result = memberService.dplctId(mem);

        System.out.println(result);

        return result;
    }

    @PostMapping("/sign")
    public boolean sign(HttpServletRequest req, MemberVO mem, Model model) {
        String securityNumber = null;
        boolean result;

        System.out.println("-------------------------");
        System.out.println(req.getParameter("user"));
        System.out.println(req.getParameter("first_security"));
        System.out.println(req.getParameter("second_security"));
        System.out.println(req.getParameter("id"));
        System.out.println(req.getParameter("pw"));
        System.out.println(req.getParameter("number"));
        System.out.println(req.getParameter("email"));
        System.out.println(req.getParameter("gender"));

        securityNumber = req.getParameter("first_security") + req.getParameter("second_security");

        mem.setName(req.getParameter("user"));
        mem.setSecurity_Number(securityNumber);
        mem.setId(req.getParameter("id"));
        mem.setPw(req.getParameter("pw"));
        mem.setPhone_Number(req.getParameter("number"));
        mem.setEmail(req.getParameter("email"));
        mem.setGender(req.getParameter("gender"));

        result = memberService.checkSecurityNumber(mem);

        System.out.println(result);
        if(result == false) {
            return false;
        } else {
            memberService.setMember(mem);
            return true;
        }
    }

    @PostMapping("/find")
    public MemberVO findUser(HttpServletRequest req, MemberVO mem) throws MessagingException, IOException {
        String securityNumber = null;
        String email;
        String id;
        String pw;

        securityNumber = req.getParameter("first_security") + req.getParameter("second_security");

        mem.setName(req.getParameter("user"));
        mem.setSecurity_Number(securityNumber);

        mem = memberService.getFindUser(mem);

        if(mem.getId() == "null" && mem.getPw() == "null") {
            System.out.println("메일 전송 실패");

            return mem;
        } else {
            System.out.println(mem.getId());
            System.out.println(mem.getPw());
            id = mem.getId();
            pw = mem.getPw();
            email = req.getParameter("email");

            memberService.sendMail(id, pw, email);
            
            return mem;
        }
    }
}