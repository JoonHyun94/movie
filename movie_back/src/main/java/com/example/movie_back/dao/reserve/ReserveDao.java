package com.example.movie_back.dao.reserve;

import java.util.HashMap;

import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;

import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;

@Repository("reserveDao")
public interface ReserveDao {

    public String selectReserveInfo(Model model);

    public String selectReserve(Model model);

    public void insertReserveInfo(Model model);

    public String selectReserveTprr();

    public void addReserveInfo(Model model);

    public MemberVO selectUser(String id);

    public ReserveVO getTprrInfo(Model model);

    public void insertReserve(ReserveVO reserveVO);

    public void deleteTprr(Model model);

    public void deleteReserve(Model model);
}