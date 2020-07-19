package com.example.movie_back.service.reserve.impl;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.service.reserve.face.ReserveService;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

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

        base_url = "http://www.cgv.co.kr/movies/";

		return base_url;
    }
    
    @Override
    public ArrayList<HashMap<String,String>> getReserveList(String url) {
        HashMap<String,String> reserveMap = new HashMap<String,String>();
        ArrayList<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
		Document doc = null;        //Document에는 페이지의 전체 소스가 저장된다

        try {
            //get page (= 브라우저에서 url을 주소창에 넣은 후 request 한 것과 같다)
            driver.get(url);
			webElement = driver.findElement(By.className("btn-more-fontbold"));
			webElement.click();
			
            Thread.sleep(500);
        } catch (Exception e) {
            e.printStackTrace();
		}
		
        doc = Jsoup.parse(driver.getPageSource());

        Elements elrank = doc.select("strong.rank");
		Elements eltitle = doc.select("strong.title");
        Elements elgrade = doc.select(".ico-grade");

        Elements elmoretitle = doc.select(".list-more .title");
        Elements elmoregrade = doc.select(".list-more .ico-grade");
        
        String title;
        String grade;
        
		for(int i = 0; i < elrank.size(); i++) {
            reserveMap = new HashMap<String,String>();
            title = eltitle.get(i).text();
			grade = elgrade.get(i).text().substring(0, 2);

            reserveMap.put("title", title);
            reserveMap.put("grade", grade);
            
			list.add(reserveMap);
        }
        
		for(int i = 0; i < elmoretitle.size(); i++) {
            reserveMap = new HashMap<String,String>();
			title = elmoretitle.get(i).text();
			grade = elmoregrade.get(i).text().substring(0, 2);

            reserveMap.put("title", title);
            reserveMap.put("grade", grade);
            
			list.add(reserveMap);
		}

        return list;
    }

    @Override
    public ArrayList<ArrayList<String>> getTheaterName() {
        ArrayList<String> theaterMap = new ArrayList<String>();
        ArrayList<ArrayList<String>> list = new ArrayList<ArrayList<String>>();
        String url = "http://ticket.cgv.co.kr/Reservation/Reservation.aspx?MOVIE_CD=&MOVIE_CD_GROUP=&PLAY_YMD=&THEATER_CD=&PLAY_NUM=&PLAY_START_TM=&AREA_CD=&SCREEN_CD=&THIRD_ITEM="; //크롤링할 url지정
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

        System.out.println(elname);
        System.out.println(eltheater);

        String name;
        String count;
        String theater;
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

            theaterMap.add("00" + name);

            for(int j = 1; j < arrayCount[i] + 1; j++) {
                theater = eltheater.get(cnt).text();

                theaterMap.add(theater);
    
                cnt++;
            }

            list.add(theaterMap);

        }

        System.out.println(list);
        
        return list;
    }
}