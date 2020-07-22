package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

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
    ReserveService reserveService;
    
    //Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/Program Files/selenium/chromedriver_win32/chromedriver.exe";
    public String url;

    ArrayList<HashMap<String,String>> reserveList = new ArrayList<HashMap<String,String>>();
    ArrayList<ArrayList<String>> theaterName = new ArrayList<ArrayList<String>>();

    @GetMapping("/reserve")
    public ArrayList<ArrayList<String>> getTheater() {
        url = reserveService.Selenium(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        theaterName = reserveService.getTheaterName(url);

        System.out.println(theaterName);

        return theaterName;
    }

    @PostMapping("/getMovie")
    public ArrayList<HashMap<String,String>> reservelist(HttpServletRequest req, Model model) {
        System.out.println(req.getParameter("areano"));
        System.out.println(req.getParameter("theaterno"));
        System.out.println(req.getParameter("date"));
        
        String areano = req.getParameter("areano");
        String theaterno = req.getParameter("theaterno");
        String date = req.getParameter("date");

        model.addAttribute("areano", areano);
        model.addAttribute("theaterno", theaterno);
        model.addAttribute("date", date);

        // url = reserveService.Selenium(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        
        reserveList = reserveService.getMovieList(model);

        return reserveList;
    }
} 