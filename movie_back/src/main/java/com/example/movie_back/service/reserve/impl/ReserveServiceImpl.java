package com.example.movie_back.service.reserve.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.service.reserve.face.ReserveService;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class ReserveServiceImpl implements ReserveService{
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

        // System.out.println(ellength.get(0).select(".info-hall li:first-child"));
        // System.out.println(eltitle);
        // System.out.println(elgrade);
        // System.out.println(elfloor);
        
        String title;
        String grade;
        String kind;
        String floor;
        String time;
        
        for(int i = 0; i < ellength.size(); i++) {
            movieMap = new HashMap<String,String>();

            Elements eltitle = ellength.get(i).select(".info-movie strong");
            Elements elgrade = ellength.get(i).select(".ico-grade");
            Elements elkind = ellength.get(i).select(".info-hall li:first-child");
            Elements elfloor = ellength.get(i).select(".info-hall li:nth-child( 2 )");
            Elements eltime = ellength.get(i).select(".info-timetable ul li");

            title = eltitle.text();
            grade = elgrade.text();
            kind = elkind.text();
            floor = elfloor.text();
            time = eltime.text();

            System.out.println(title);
            System.out.println(grade);
            System.out.println(kind);
            System.out.println(floor);
            
            // for(int j = 0; j < eltime.size(); j++) {
                
            // }
            System.out.println(eltime.size());
            


            System.out.println("--------------------------------------");

        }

		// for(int i = 0; i < elrank.size(); i++) {
        //     reserveMap = new HashMap<String,String>();
        //     title = eltitle.get(i).text();
		// 	grade = elgrade.get(i).text().substring(0, 2);

        //     reserveMap.put("title", title);
        //     reserveMap.put("grade", grade);
            
		// 	list.add(reserveMap);
        // }
        
		// for(int i = 0; i < elmoretitle.size(); i++) {
        //     reserveMap = new HashMap<String,String>();
		// 	title = elmoretitle.get(i).text();
		// 	grade = elmoregrade.get(i).text().substring(0, 2);

        //     reserveMap.put("title", title);
        //     reserveMap.put("grade", grade);
            
		// 	list.add(reserveMap);
		// }

        return list;
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
}