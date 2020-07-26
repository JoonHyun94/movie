package com.example.movie_back.dto;

public class ReserveVO {
    private int reserve_seq; // reserve 시퀀스(자동증가)
    private String id; // FK
    private String area;
    private String theater;
    private String week;
    private String day;
    private String grade;
    private String title;
    private String start_time;
    private String end_time;
    private String reserve_time;
    private String seat;
    private int ticket_number;

    public int getReserve_seq() {
        return reserve_seq;
    }
    public void setReserve_seq(int reserve_seq) {
        this.reserve_seq = reserve_seq;
    }
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }

    public String getTheater() {
        return theater;
    }
    public void setTheater(String theater) {
        this.week = theater;
    }

    public String getWeek() {
        return week;
    }
    public void setWeek(String week) {
        this.week = week;
    }

    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }

    public String getGrade() {
        return grade;
    }
    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart_time() {
        return start_time;
    }
    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }
    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getReserve_time() {
        return reserve_time;
    }
    public void setReserve_time(String reserve_time) {
        this.reserve_time = reserve_time;
    }

    public String getSeat() {
        return seat;
    }
    public void setSeat(String seat) {
        this.seat = seat;
    }

    public int getTicket_number() {
        return ticket_number;
    }
    public void setTicket_number(int ticket_number) {
        this.ticket_number = ticket_number;
    }
}