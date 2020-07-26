package com.example.movie_back.dao.reserve;

import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;

@Repository("reserveDao")
public interface ReserveDao {

    public String selectReserveInfo(Model model);

    public String selectReserve(Model model);

    public void insertReserveInfo(Model model);

    public String selectReserveTprr();
}