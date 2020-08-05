package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;
import com.example.movie_back.service.reserve.face.ReserveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// CrossWeb 설정 -> 허용 주소
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReserveController {
    @Autowired
    private ReserveService reserveService;

    //Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/Program Files/selenium/chromedriver_win32/chromedriver.exe";
    public String url;

    ArrayList<ArrayList<String>> theaterName = new ArrayList<ArrayList<String>>();
    ArrayList<HashMap<String,String>> movieList = new ArrayList<HashMap<String,String>>();
    ArrayList<HashMap<String,String>> movieTimeList = new ArrayList<HashMap<String,String>>();
    HashMap<String,String> checkReserve = new HashMap<String,String>();
    HashMap<String,String> getReserveInfo = new HashMap<String,String>();

    @GetMapping("/reserve")
    public ArrayList<ArrayList<String>> getTheater() {
        url = reserveService.Selenium(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        theaterName = reserveService.getTheaterName(url);

        System.out.println(theaterName);

        return theaterName;
    }

    @PostMapping("/getMovie")
    public ArrayList<HashMap<String,String>> getMovie(HttpServletRequest req, Model model) {
        System.out.println(req.getParameter("areano"));
        System.out.println(req.getParameter("theaterno"));
        System.out.println(req.getParameter("date"));
        
        String areano = req.getParameter("areano");
        String theaterno = req.getParameter("theaterno");
        String date = req.getParameter("date");

        model.addAttribute("areano", areano);
        model.addAttribute("theaterno", theaterno);
        model.addAttribute("date", date);
        
        movieList = reserveService.getMovieList(model);

        System.out.println(movieList);

        return movieList;
    }

    @PostMapping("/getMovieTime")
    public ArrayList<HashMap<String,String>> getMovieTime(HttpServletRequest req, Model model) {
        System.out.println(req.getParameter("areano"));
        System.out.println(req.getParameter("theaterno"));
        System.out.println(req.getParameter("date"));
        System.out.println(req.getParameter("title"));

        String areano = req.getParameter("areano");
        String theaterno = req.getParameter("theaterno");
        String date = req.getParameter("date");
        String title = req.getParameter("title");

        model.addAttribute("areano", areano);
        model.addAttribute("theaterno", theaterno);
        model.addAttribute("date", date);
        model.addAttribute("title", title);

        movieTimeList = reserveService.getMovieTimeList(model);
    
        System.out.println(movieTimeList);
    
        return movieTimeList;
    }

    @PostMapping("/reservePop")
    public HashMap<String,String> reservePop(HttpServletRequest req, Model model) {
        boolean tprr_check = true; // 진행중인 예약 목록 확인
        boolean reserve_check = true; // 예약 목록 확인

        model.addAttribute("id", req.getParameter("id"));
        model.addAttribute("area", req.getParameter("area"));
        model.addAttribute("theater", req.getParameter("theater"));
        model.addAttribute("floor", req.getParameter("floor"));
        model.addAttribute("week", req.getParameter("week"));
        model.addAttribute("day", req.getParameter("day"));
        model.addAttribute("grade", req.getParameter("grade"));
        model.addAttribute("title", req.getParameter("title"));
        model.addAttribute("time", req.getParameter("time"));
        model.addAttribute("runtime", req.getParameter("runtime"));
        model.addAttribute("seat", req.getParameter("seat"));

        tprr_check = reserveService.checkReserveInfo(model);
        reserve_check = reserveService.checkReserve(model);
        System.out.println("tprr_check : " + tprr_check);
        System.out.println("reserve_check : " + reserve_check);

        if(tprr_check == false && reserve_check == false) {
            reserveService.setReserveInfo(model);
            checkReserve.put("tprr", "false");
            checkReserve.put("reserve", "false");
        } else if(tprr_check == true && reserve_check == false) {
            checkReserve.put("tprr", "true");
            checkReserve.put("reserve", "false");
        } else if(tprr_check == false && reserve_check == true) {
            checkReserve.put("tprr", "false");
            checkReserve.put("reserve", "true");
        } else if(tprr_check == true && reserve_check == true) {
            checkReserve.put("tprr", "true");
            checkReserve.put("reserve", "true");
        }

        return checkReserve;
    }

    @GetMapping("/reservePop")
    public HashMap<String,String> reservePop() {

        getReserveInfo = reserveService.getReserveInfo();
        return getReserveInfo;
    }

    @PostMapping("/payment")
    public void payment(HttpServletRequest req, Model model) {
        int ticket_number = Integer.parseInt(req.getParameter("ticketnumber"));
        int ticekt_price = Integer.parseInt(req.getParameter("price"));
        // tprrReserve 확인
        model.addAttribute("id", req.getParameter("id"));
        model.addAttribute("area", req.getParameter("area"));
        model.addAttribute("theater", req.getParameter("theater"));
        model.addAttribute("floor", req.getParameter("floor"));
        model.addAttribute("week", req.getParameter("week"));
        model.addAttribute("day", req.getParameter("day"));
        model.addAttribute("title", req.getParameter("title"));
        model.addAttribute("time", req.getParameter("time"));
        // tprrReserve 추가
        model.addAttribute("endtime", req.getParameter("endtime"));
        model.addAttribute("selectseat", req.getParameter("selectseat"));
        model.addAttribute("ticketnumber", ticket_number);
        model.addAttribute("price", ticekt_price);

        reserveService.addReserveInfo(model);
        System.out.println(model);
    }

    @PostMapping("/getReserveMember")
    public MemberVO getMem(HttpServletRequest req, MemberVO mem) {
        String id = req.getParameter("id").toString();

        mem = reserveService.getMemberList(id);

        return mem;
    }
    
    @PostMapping("/setReserve")
    public void setReserve(HttpServletRequest req, Model model, ReserveVO reserveVO) {
        model.addAttribute("id", req.getParameter("id"));
        model.addAttribute("area", req.getParameter("area"));
        model.addAttribute("theater", req.getParameter("theater"));
        model.addAttribute("floor", req.getParameter("floor"));
        model.addAttribute("week", req.getParameter("week"));
        model.addAttribute("day", req.getParameter("day"));
        model.addAttribute("title", req.getParameter("title"));
        model.addAttribute("time", req.getParameter("time"));
        
        reserveService.setReserve(model, reserveVO);
    }

    @PostMapping("/deleteTprr")
    public void deleteTprr(HttpServletRequest req, Model model) {
        model.addAttribute("id", req.getParameter("id"));
        model.addAttribute("area", req.getParameter("area"));
        model.addAttribute("theater", req.getParameter("theater"));
        model.addAttribute("floor", req.getParameter("floor"));
        model.addAttribute("week", req.getParameter("week"));
        model.addAttribute("day", req.getParameter("day"));
        model.addAttribute("title", req.getParameter("title"));
        model.addAttribute("time", req.getParameter("time"));

        reserveService.deleteTprr(model);
    }

    @PostMapping("/removeReserve")
    public void removeReserve(HttpServletRequest req, Model model) {
        model.addAttribute("id", req.getParameter("id"));
        model.addAttribute("area", req.getParameter("area"));
        model.addAttribute("theater", req.getParameter("theater"));
        model.addAttribute("day", req.getParameter("day"));
        model.addAttribute("ticket_number", req.getParameter("ticket_number"));
        model.addAttribute("ticket_price", req.getParameter("ticket_price"));
        model.addAttribute("title", req.getParameter("title"));
        model.addAttribute("reserve_time", req.getParameter("reserve_time"));
        model.addAttribute("time", req.getParameter("start_time"));

        reserveService.removeReserve(model);
    }
} 