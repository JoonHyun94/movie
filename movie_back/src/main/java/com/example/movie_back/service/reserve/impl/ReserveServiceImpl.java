package com.example.movie_back.service.reserve.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.dao.reserve.ReserveDao;
import com.example.movie_back.dto.MemberVO;
import com.example.movie_back.dto.ReserveVO;
import com.example.movie_back.service.reserve.face.ReserveService;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class ReserveServiceImpl implements ReserveService{
    @Autowired
    private ReserveDao reserveDao;

    //WebDriver
    private WebDriver driver;
	private WebElement webElement;

	//크롤링 할 URL
	private String base_url;

	//Document 페이지 소스 저장
    Document docSource;
    
    @Override
    public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH) {
		System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
		
		ChromeOptions options = new ChromeOptions();
		options.addArguments("headless");
        options.setCapability("ignoreProtectedModeSettings", true);
        driver = new ChromeDriver(options);

        // base_url = "http://www.cgv.co.kr/movies/";
        base_url = "http://ticket.cgv.co.kr/Reservation/Reservation.aspx?MOVIE_CD=&MOVIE_CD_GROUP=&PLAY_YMD=&THEATER_CD=&PLAY_NUM=&PLAY_START_TM=&AREA_CD=&SCREEN_CD=&THIRD_ITEM=";

		return base_url;
    }
    
    @Override
    public ArrayList<ArrayList<String>> getTheaterName(String url) {
        ArrayList<String> theaterMap = new ArrayList<String>();
        ArrayList<ArrayList<String>> list = new ArrayList<ArrayList<String>>();
        Document doc = null;        //Document에는 페이지의 전체 소스가 저장된다
        
		try {
            driver.get(url);
            
            Thread.sleep(1000);
		} catch (Exception e) {
            e.printStackTrace();
		}
		
        doc = Jsoup.parse(driver.getPageSource());

        Elements elname = doc.select(".theater-select .theater-list .theater-area-list > ul > li > a .name");    
        Elements elcount = doc.select(".theater-select .theater-list .theater-area-list > ul > li > a .count");    
        Elements eltheater = doc.select("#ticket .section-theater .col-body .theater-select .theater-list .area_theater_list ul li a");    
        Elements elno = doc.select("#ticket .section-theater .col-body .theater-select .theater-list .area_theater_list ul li");

        // System.out.println(elname);
        // System.out.println(eltheater);
        System.out.println(elno.attr("theater_cd"));

        String name;
        String count;
        String theater;
        String areano;
        String theaterno;

        int cnt = 0;
        String[] stringCount = new String[elcount.size()];
        int[] arrayCount = new int[elcount.size()];

        for(int i = 0; i <elcount.size()-2; i++) {
            count = elcount.get(i).text();

            count = count.replaceAll("\\(", "");
            count = count.replaceAll("\\)", "");
            
            stringCount[i] = count;

            arrayCount[i] = Integer.parseInt(stringCount[i]);
        }

		for(int i = 0; i < elname.size()-2; i++) {
            theaterMap = new ArrayList<String>();
            name = elname.get(i).text();
            areano = "0" + (i + 1);

            theaterMap.add("00" + name);
            theaterMap.add(areano);

            for(int j = 1; j < arrayCount[i] + 1; j++) {
                theater = eltheater.get(cnt).text();
                theaterno = elno.get(cnt).attr("theater_cd");

                theaterMap.add(theater + "=" + theaterno);
    
                cnt++;
            }

            list.add(theaterMap);

        }

        System.out.println(list);
        
        return list;
    }

    @Override
    public ArrayList<HashMap<String,String>> getMovieList(Model model) {
        HashMap<String,String> movieMap = new HashMap<String,String>();
        ArrayList<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
        String url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=" + model.getAttribute("areano") + "&theatercode=" + model.getAttribute("theaterno") + "&date=" + model.getAttribute("date"); //크롤링할 url지정
		Document doc = null;        //Document에는 페이지의 전체 소스가 저장된다

		try {
			doc = Jsoup.connect(url).get();
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        Elements ellength = doc.select(".sect-showtimes > ul > li"); // 해당 일자, 해당 극장의 총 영화 갯수
        
        String title;
        String grade;
        String kind = null;
        String runtime = null;
        
        for(int i = 0; i < ellength.size(); i++) {
            movieMap = new HashMap<String,String>();

            Elements eltitle = ellength.get(i).select(".info-movie strong");
            Elements elgrade = ellength.get(i).select(".ico-grade");
            Elements elkind = ellength.get(i).select("i");

            for(int j = 0; j < elkind.size(); j++) {
                runtime = elkind.get(1).text();

                if(j < elkind.size() -1) {
                    kind = kind + elkind.get(j).text() + " | ";
                } else {
                    kind = kind + elkind.get(j).text();
                }

                kind = kind.replaceAll("\\u00A0", ""); // &nbsp; 제거
                kind = kind.replaceAll("null", "");
                runtime = runtime.replaceAll("\\u00A0", "");
                runtime = runtime.replaceAll("null", "");
            }

            title = eltitle.text();
            grade = elgrade.text().substring(0, 2);

            System.out.println(title);
            System.out.println(grade);
            System.out.println(kind);

            movieMap.put("title", title);
            movieMap.put("grade", grade);
            movieMap.put("kind", kind);
            movieMap.put("runtime", runtime);

            kind = null;

            list.add(movieMap);
        }

        return list;
    }

    @Override
    public ArrayList<HashMap<String,String>> getMovieTimeList(Model model) {
        HashMap<String,String> movieTimeMap = new HashMap<String,String>();
        ArrayList<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
        String url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=" + model.getAttribute("areano") + "&theatercode=" + model.getAttribute("theaterno") + "&date=" + model.getAttribute("date"); //크롤링할 url지정
		Document doc = null;        //Document에는 페이지의 전체 소스가 저장된다

		try {
			doc = Jsoup.connect(url).get();
		} catch (IOException e) {
			e.printStackTrace();
        }
        
        Elements eltimelength = null; // 해당 일자, 해당 극장의 총 영화 갯수
        Elements elfloorlength = null;
        Elements eltitle = doc.select(".sect-showtimes .col-times > .info-movie strong");

        String title;
        String floor = null;
        String time = null;
        
        for(int i = 0; i < eltitle.size(); i++) {
            title = eltitle.get(i).text();
            if(title.equals(model.getAttribute("title"))) {
                eltimelength = eltitle.get(i).parent().parent().parent().select(".info-timetable ul");
                elfloorlength = eltitle.get(i).parent().parent().parent().select(".info-hall ul");
            }
        }

        for(int i = 0; i < eltimelength.size(); i++) {
            movieTimeMap = new HashMap<String,String>();
            for(int j = 0; j < elfloorlength.get(i).children().select("li").size(); j++) {
                if(j < elfloorlength.get(i).children().select("li").size() - 1) {
                    floor = floor + elfloorlength.get(i).children().get(j).select("li").text() + " | ";
                } else {
                    floor = floor + elfloorlength.get(i).children().get(j).select("li").text();
                }
            }

            floor = floor.replaceAll("null", "");

            movieTimeMap.put("floor", floor);

            for(int j = 0; j < eltimelength.get(i).children().size(); j++) {
                time = time + eltimelength.get(i).children().get(j).select("li > a").attr("data-playstarttime");

                time = time.replaceAll("null", "");

                movieTimeMap.put("time", time);
            }

            System.out.println("--------------------------------------");

            floor = null;
            time = null;

            list.add(movieTimeMap);
        }

        return list;
    }

    @Override
    public boolean checkReserveInfo(Model model) {
        boolean result = true;
        String check;

        check = reserveDao.selectReserveInfo(model);
        System.out.println(check);

        if(check.equalsIgnoreCase("null")) {
            result = false;
            System.out.println("false");
            return result;

        } else {
            result = true;
            System.out.println("true");
            return result;
        }
    }

    @Override
    public boolean checkReserve(Model model) {
        boolean result = true;
        String check;

        check = reserveDao.selectReserve(model);
        System.out.println(check);

        if(check.equalsIgnoreCase("null")) {
            result = false;
            System.out.println("false");
            return result;

        } else {
            result = true;
            System.out.println("true");
            return result;
        }
    }

    @Override
    public void setReserveInfo(Model model) {
        reserveDao.insertReserveInfo(model);
    }

    @Override
    public HashMap<String,String> getReserveInfo() {
        HashMap<String,String> result = new HashMap<String,String>();

        String ss = reserveDao.selectReserveTprr();
        return result;
    }

    @Override
    public void addReserveInfo(Model model) {
        boolean result;
        String check;

        check = reserveDao.selectReserveInfo(model);
        System.out.println("Tprr 여부: " + check);
        if(check.equalsIgnoreCase("null")) {
            result = false;
            System.out.println("false");
        } else {
            result = true;
            System.out.println("true");
        }

        if(result == true) {
            reserveDao.addReserveInfo(model);
        }
    }

    @Override
    public MemberVO getMemberList(String id) {
        return reserveDao.selectUser(id);
    }

    @Override
    public void setReserve(Model model, ReserveVO reserveVO) {
        reserveVO = reserveDao.getTprrInfo(model);

        reserveDao.insertReserve(reserveVO);
    }

    @Override
    public void deleteTprr(Model model) {
        reserveDao.deleteTprr(model);
    }

    @Override
    public void removeReserve(Model model) {
        boolean delete = false;
        if(delete == false) {
            reserveDao.deleteTprr(model);
            delete = true;
        }
        if(delete == true) {
            reserveDao.deleteReserve(model);
        }
    }
}