package com.example.movie_back.service.reserve.face;

import java.util.ArrayList;
import java.util.HashMap;

public interface ReserveService {

    public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH);

    public ArrayList<HashMap<String,String>> getReserveList(String url);

    public ArrayList<ArrayList<String>> getTheaterName();

}