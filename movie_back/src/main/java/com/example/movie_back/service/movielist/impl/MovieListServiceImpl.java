package com.example.movie_back.service.movielist.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.example.movie_back.service.movielist.face.MovieListService;

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
public class MovieListServiceImpl implements MovieListService {	
    //WebDriver
    private WebDriver driver;
	private WebElement webElement;

	//크롤링 할 URL
	private String base_url;

	//Document 페이지 소스 저장
	Document docSource;
	
	public String Selenium(String WEB_DRIVER_ID, String WEB_DRIVER_PATH) {
		System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
		
		ChromeOptions options = new ChromeOptions();
		options.addArguments("headless");
        options.setCapability("ignoreProtectedModeSettings", true);
		driver = new ChromeDriver(options);
		base_url = "http://www.cgv.co.kr/movies/";

		return base_url;
	}

    public ArrayList<HashMap<String,String>> getMovieList(String url) {
		HashMap<String,String> movieMap = new HashMap<String,String>();
		ArrayList<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
		Document doc = null;

        try {
			driver.get(url);

			webElement = driver.findElement(By.className("btn-more-fontbold"));
			webElement.click();
			
            Thread.sleep(500);
        } catch (Exception e) {
            e.printStackTrace();
		}
		
		doc = Jsoup.parse(driver.getPageSource());
		// driver.close();
		
		//select를 이용하여 원하는 태그를 선택한다. select는 원하는 값을 가져오기 위한 중요한 기능이다.
		Elements elrank = doc.select("strong.rank");
		Elements eltitle = doc.select("strong.title");
		Elements elgrade = doc.select(".ico-grade");
		Elements elimg = doc.select("span.thumb-image > img");
		Elements elpercent = doc.select("strong.percent span");
		Elements elopening = doc.select("span.txt-info strong");
		Elements elmoviesrc = doc.select(".box-image > a");
		
		// list-more
		Elements elmoretitle = doc.select(".list-more .title");
		Elements elmoregrade = doc.select(".list-more .ico-grade");
		Elements elmoreimg = doc.select(".list-more .thumb-image > img");
		Elements elmorepercent = doc.select(".list-more strong.percent span");
		Elements elmoreopening = doc.select(".list-more span.txt-info strong");
		Elements elmoremoviesrc = doc.select(".list-more .box-image > a");

		String rank;
		String title;
		String grade;
		String img;
		String percent;
		String opening;
		String moviesrc;

		System.out.println("============================================================");

		for(int i = 0; i < elrank.size(); i++) {
			movieMap = new HashMap<String,String>();

            rank = elrank.get(i).text();
			title = eltitle.get(i).text();
			grade = elgrade.get(i).text().substring(0, 2);
			img = elimg.get(i).attr("src");
			percent = elpercent.get(i).text();
			opening = elopening.get(i).text();
			moviesrc = elmoviesrc.get(i).attr("href");
			
			movieMap.put("rank", rank);
			movieMap.put("title", title);
			movieMap.put("grade", grade);
			movieMap.put("img", img);
			movieMap.put("percent", percent);
			movieMap.put("opening", opening);
			movieMap.put("moviesrc", moviesrc);

			list.add(movieMap);
		}

		for(int i = 0; i < elmoretitle.size(); i++) {
			movieMap = new HashMap<String,String>();

			title = elmoretitle.get(i).text();
			grade = elmoregrade.get(i).text().substring(0, 2);
			img = elmoreimg.get(i).attr("src");
			percent = elmorepercent.get(i).text();
			opening = elmoreopening.get(i).text();
			moviesrc = elmoremoviesrc.get(i).attr("href");

			movieMap.put("title", title);
			movieMap.put("grade", grade);
			movieMap.put("img", img);
			movieMap.put("percent", percent);
			movieMap.put("opening", opening);
			movieMap.put("moviesrc", moviesrc);

			list.add(movieMap);
		}
		
		System.out.println("============================================================");

		return list;
	}

	public ArrayList<HashMap<String,String>> getTopMovieList() {
		HashMap<String,String> movieMap = new HashMap<String,String>();
		ArrayList<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
		String url = "http://www.cgv.co.kr/movies/"; //크롤링할 url지정
		Document doc = null; 

		try {
			doc = Jsoup.connect(url).get();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Elements elimg = doc.select(".sect-movie-chart .thumb-image > img");    

		for(int i = 0; i < elimg.size(); i++) {
			movieMap = new HashMap<String,String>();
			String img = elimg.get(i).attr("src");

			movieMap.put("img", img);

			list.add(movieMap);
		}

		return list;
	}

	@Override
	public HashMap<String,String> getMovieDetail(String moviesrc) {
		HashMap<String,String> movieDetailMap = new HashMap<String,String>();
		String url = "http://www.cgv.co.kr" + moviesrc; //크롤링할 url지정
		Document doc = null; 

		System.out.println(url);

		try {
			doc = Jsoup.connect(url).get();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Elements elimg = doc.select(".thumb-image > img");
		Elements eltitle = doc.select(".box-contents .title > strong");
		Elements elstate = doc.select(".box-contents .round > *");
		Elements elpercent = doc.select(".score .percent span");
		Elements elinfo = doc.select(".spec");
		Elements elcontent = doc.select(".sect-story-movie");

		String img = elimg.attr("src");
		String title = eltitle.text();
		String state = elstate.text();
		String percent = elpercent.text();
		String info = elinfo.text();
		String content = elcontent.text();

		info = info.replaceAll("\\u00A0", ""); // &nbsp; 제거

		System.out.println(img);
		System.out.println(title);
		System.out.println(state);
		System.out.println(percent);
		System.out.println(info);
		System.out.println(content);

		movieDetailMap.put("img", img);
		movieDetailMap.put("title", title);
		movieDetailMap.put("state", state);
		movieDetailMap.put("percent", percent);
		movieDetailMap.put("info", info);
		movieDetailMap.put("content", content);

		return movieDetailMap;
	}
}