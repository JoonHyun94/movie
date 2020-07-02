package com.example.movie_back.controller;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class SeleniumTest {
 
    public static void main(String[] args) {
        SeleniumTest selTest = new SeleniumTest();
        selTest.crawl();
    }

    //WebDriver
    private WebDriver driver;
    private WebElement webElement;
    
    //Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/Program Files/selenium/chromedriver_win32/chromedriver.exe";
    
    //크롤링 할 URL
    private String base_url;
    
    public SeleniumTest() {
        // super();
 
        //System Property SetUp
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        
        //Driver SetUp
        ChromeOptions options = new ChromeOptions();
        options.setCapability("ignoreProtectedModeSettings", true);
        driver = new ChromeDriver(options);
        
        base_url = "http://www.cgv.co.kr/movies/";
    }
 
    public void crawl() {
 
        try {
            //get page (= 브라우저에서 url을 주소창에 넣은 후 request 한 것과 같다)
            driver.get(base_url);
            
            webElement = driver.findElement(By.className("btn-more-fontbold"));
            webElement.click();

            Thread.sleep(1000);
    
        } catch (Exception e) {
            e.printStackTrace();
        
        }

        System.out.println(driver.getPageSource());

        // driver.close();
    }
 
}