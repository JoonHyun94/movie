import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';
import cgv_main from '../../image/cgv_main.jpg';

// 반응형 웹
const customMedia = generateMedia({
    maxmobile: '575px',
    minmobile: '352px',
});

const MainBack = styled.div`
    content: '';
    background-image: url(${ cgv_main });
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    position: relative;
    width: 100%;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    &:before {
        content: "";
        background: inherit;
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 100%;
        max-width: 100%;
        height: 100vh;
        filter: brightness(60%);
      }
`
const Login = styled.div`
    display: flex;
    position: absolute;
    width: 50%;
    height: 65%;
    background-color: #F9F5EA;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    @media only screen and (orientation: portrait) {
        width: 65%;
        height: 50%;
    }
`
const Scroll_body = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 2vw;
    width: 45%;
    height: auto;
    right: 0;
    overflow-x: hidden;
    align-items: center;
`
const Movie = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    height: auto;
    right: 0;
    flex-shrink: 0;
`
const Movieimg = styled.img`
    width: 100%;
    height: 100%;
`

class Main extends Component {
    state = {
        apiResult : [],
        mainTag: null,
        newHeight: 0,
        headerHeight: 0,
        mainHeight: 0,
        prevHeaderHeight: 0,
        prevMainHeight: 0,
        index: 0 // 이미지 슬라이드
    }

    getApi = () => {
        axios.get('http://localhost:8088/main') 
            .then(res => {
                console.log(res.data);
                const movieList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    res.data.forEach(el => { // 결과 수 만큼 반복
                        movieList.push({ // movieList에 결과의 원하는 부분을 저장
                            img: el.img,
                        })
                        console.log(movieList);
                    })
                }
                 this.setState({
                    apiResult: movieList, // state에 저장
                    nullCheck: 1
                });
                this.slideShow();
            }) 
            .catch(res => console.log(res))
            console.log(this.apiResult);
    }

    slideShow = () => {
        var i;
        var x = document.querySelector("[id = 'slide']");
        
        console.log("sssss" + x[0].style);
        for(var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

        this.state.index++;

        if(this.state.index > x.length) {
            this.state.index = 1;
        }

        x[this.state.index-1].style.display = "block";
        setTimeout(this.slideShow, 1000);
    }

    componentDidMount() {
        this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
        this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
        this.state.mainTag = document.querySelector("[id = 'Main_Back']");
        this.state.mainTag.style.height = this.state.newHeight + "vh";

        this.getApi();
        setInterval(this.onHeight, 10);
    };

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.prevHeaderHeight != this.state.headerHeight) {
            // console.log(this.state.headerHeight);
            this.setState({ 
                prevHeaderHeight: this.state.headerHeight,
            });

            console.log("headerHeight : " + this.state.headerHeight);
            console.log("prevHeaderHeight : " + this.state.prevHeaderHeight);

            this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.state.mainTag = document.querySelector("[id = 'Main_Back']");
            this.state.mainTag.style.height = this.state.newHeight + "vh";
        }

        return true;
    };

    onHeight = () => {
        const hdHeight = document.querySelector(".nav_var").offsetHeight;
        this.setState({ 
            headerHeight: hdHeight,
        });
    };

    render() {      
        return (
            <MainBack id = "Main_Back">
                <Login>
                    <Scroll_body>
                    { this.state.apiResult.map((el, index) => {
                        return <Movie  key = { index }>
                                <Movieimg id = "slide" src = { el.img }></Movieimg>
                            </Movie>
                    })}
                    </Scroll_body>
                </Login>
            </MainBack>
        )
    }
}

export default Main;
