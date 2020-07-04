package com.example.movie_back.controller;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.service.movielist.face.MovieListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// CrossWeb 설정 -> 허용 주소
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MainController {
	@Autowired
    MovieListService movieListService;
    
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
}