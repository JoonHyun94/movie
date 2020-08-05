package com.example.movie_back.service.reserve.face;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;

import org.springframework.ui.Model;

public interface ReserveService {

    public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH);

    public ArrayList<HashMap<String,String>> getMovieList(Model model);

    public ArrayList<ArrayList<String>> getTheaterName(String url);

    public ArrayList<HashMap<String,String>> getMovieTimeList(Model model);

    public boolean checkReserveInfo(Model model);

    public boolean checkReserve(Model model);

    public void setReserveInfo(Model model);

    public HashMap<String,String> getReserveInfo();

    public void addReserveInfo(Model model);

    public MemberVO getMemberList(String id);

    public void setReserve(Model model, ReserveVO reserveVO);

    public void deleteTprr(Model model);

    public void removeReserve(Model model);
}