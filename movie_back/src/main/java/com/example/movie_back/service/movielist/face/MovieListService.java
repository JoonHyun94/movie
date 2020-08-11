package com.example.movie_back.service.movielist.face;

import java.util.ArrayList;
import java.util.HashMap;

public interface MovieListService {

    public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH);

    public ArrayList<HashMap<String,String>> getMovieList(String url);
    
    public ArrayList<HashMap<String,String>> getTopMovieList();

    public HashMap<String,String> getMovieDetail(String moviesrc);
}