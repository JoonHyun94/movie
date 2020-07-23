package com.example.movie_back.service.reserve.face;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.ui.Model;

public interface ReserveService {

    public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH);

    public ArrayList<HashMap<String,String>> getMovieList(Model model);

    public ArrayList<ArrayList<String>> getTheaterName(String url);

    public ArrayList<HashMap<String,String>> getMovieTimeList(Model model);

}