package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

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
    MovieListService movieListService;
    @Autowired
    MemberService memberService;

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
        String name;
        session = req.getSession();

        mem.setId(req.getParameter("id"));
        mem.setPw(req.getParameter("pw"));
        result = memberService.login(mem);

        if(result == true) {
            mem = memberService.getUser(mem);
            session.setAttribute("member", mem);
        } else {
            name = "null";
        }

        System.out.println(session.getAttribute("member"));

        return mem;
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
    public void sign(HttpServletRequest req, MemberVO mem, Model model) {
        System.out.println("-------------------------");
        System.out.println(req.getParameter("name"));
        System.out.println(req.getParameter("id"));
        System.out.println(req.getParameter("pw"));
        System.out.println(req.getParameter("number"));
        System.out.println(req.getParameter("email"));
        System.out.println(req.getParameter("gender"));
        System.out.println("-------------------------");

        mem.setName(req.getParameter("name"));
        mem.setId(req.getParameter("id"));
        mem.setPw(req.getParameter("pw"));
        mem.setPhone_Number(req.getParameter("number"));
        mem.setEmail(req.getParameter("email"));
        mem.setGender(req.getParameter("gender"));

        memberService.setMember(mem);
    }
}