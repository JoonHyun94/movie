package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.service.reserve.face.ReserveService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ArrayList<HashMap<String,String>> reservelist() {
        url = reserveService.Selenium(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        
        reserveList = reserveService.getReserveList(url);

        return reserveList;
    }

    @PostMapping("/getTheater")
    public ArrayList<ArrayList<String>> getTheater() {
        theaterName = reserveService.getTheaterName();

        System.out.println(theaterName);

        return theaterName;
    }
} 