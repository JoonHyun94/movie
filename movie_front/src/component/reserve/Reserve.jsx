import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';

const MainBack = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
const ReserveBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    height: 80%;
    background-color: #F9F5EA;
    border-radius: 5px;
`
const ScrollBody = styled.div`
    height: 70vh;
    overflow-y: scroll;
    -ms-overflow-style: none; // IE에서 스크롤바 감춤
    &::-webkit-scrollbar { 
      display: none !important; // 윈도우 크롬 등
    }
`
const Title = styled.div`
    width: 100%;
    background-color: #504E48;
    color: white;
    border-radius: ${ 
        props => {
            switch(props.border) {
                case 'movie' :
                    return '5px 0 0 0';
                case 'time' :
                    return '0 5px 0 0';
                default : 
                    return '0 0 0 0';
            }
        }
    };
`
const Grade = styled.div`
    width: 1.5vw;
    height: 1.5vw;
    margin: 0.3vw;
    border-radius: 50%;
    background-color: ${ 
        props => {
            switch(props.grade) {
                case '15' :
                    return 'orange';
                case '12' :
                    return 'blue';
                case '전체' :
                    return 'green';
                case '청소' : 
                    return 'red';
                case '미정' :
                    return 'gray';
            }
        }
    };
    font-size: ${ 
        props => {
            switch(props.grade) {
                case '전체' :
                case '청소' :
                case '미정' :
                    return '0.5vw';
                default : 
                    return '0.6vw';
            }
        }
    };
    font-weight: bolder;
    color: white;
    white-space:nowrap;
    line-height: 1.5vw
`
const MovieTitle = styled.div`
    width: 80%;
    height: 1.5vw;
    margin: 0.3vw;
    font-size: 0.8vw;
    font-weight: bolder;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: justify;
    line-height: 1.5vw;
`
const MovieBody = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    margin-bottom: 1vw;
`
const TheaterBody = styled.div`
    display: flex;
    flex-wrap: row;
`
const AreaBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`
const Area = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 0.5vw;
    padding: 0.5vw;
    font-size: 1vw;
    background-color: #DCDCDC;
`
const TheaterListBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    display: none;
`
const TheaterList = styled.div`
    margin-bottom: 0.7vw;
    font-size: 1.2vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: justify;
`
const Movie = styled.div`
    width: 25%;
    height: 100%;
    background-color: transparent !important;
`
const Theater = styled.div`
    width: 40%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`
const Date = styled.div`
    width: 10%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`
const Time = styled.div`
    width: 25%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`

class Reserve extends Component {
    state = {
        apiResult: [],
        theaterResult: [],
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        mainTag: null,
        selectArea: 0,
        subStringArea: null
    }

    componentDidMount() {
        this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
        this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
        this.state.mainTag = document.querySelector("[id = 'Main_Back']");
        this.state.mainTag.style.height = this.state.newHeight + "vh";
        
        this.getApi();
        setInterval(this.onHeight, 10);
    };

    getApi = () => {
        axios.get('http://localhost:8088/reserve') 
            .then(res => {
                console.log(res.data);
                const reserveList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    console.log(res.data.title);
                    res.data.forEach(el => { // 결과 수 만큼 반복
                        reserveList.push({ // reserveList에 결과의 원하는 부분을 저장
                            title: el.title,
                            grade: el.grade,
                        })
                        console.log(reserveList);
                    })
                }
                 this.setState({
                    apiResult: reserveList, // state에 저장
                });
            }) 
            .catch(res => console.log(res))
            console.log(this.apiResult);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.prevHeaderHeight != this.state.headerHeight) {
            this.setState({ 
                prevHeaderHeight: this.state.headerHeight
            });

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

    getTheater (index) {    
        var selectDoc = document.querySelectorAll(".moviebody");

        for(var i = 0; i < selectDoc.length; i++) {
            if(i === index) {
                selectDoc[index].style.backgroundColor = 'black';
                selectDoc[index].style.color = 'white';
            } else {
                selectDoc[i].style.backgroundColor = 'transparent';
                selectDoc[i].style.color = 'black';
            }
        }

        axios.post('http://localhost:8088/getTheater') 
        .then(res => {
            console.log(res.data[0]);
            const theaterList = []; // 결과값을 받아올 배열
            if(res.data && Array.isArray(res.data)) {
                for(var i = 0; i < res.data.length; i++) {
                    theaterList[i] = res.data[i];
                }

                console.log(theaterList[0]);
                this.setState({
                    theaterResult: theaterList, // state에 저장
                });
            }
        });
    }

    selectArea (index) {
        var selectDoc = document.querySelectorAll(".area");

        for(var i = 0; i < selectDoc.length; i++) {
            if(i === index) {
                selectDoc[index].style.backgroundColor = 'transparent';
            } else {
                selectDoc[i].style.backgroundColor = '#DCDCDC';
                selectDoc[i].style.color = 'black';
            }
        }

        this.state.selectArea = index;
        document.getElementById('theaterbody').style.display = 'block'
    }

    render() {
        return(
            <MainBack id = "Main_Back">
                <ReserveBody>
                    <Movie>
                        <Title border = "movie">영화</Title>
                            <ScrollBody>
                                { this.state.apiResult.map((el, index) => {
                                    return <MovieBody className = "moviebody" key = { index } onClick = { () => this.getTheater(index) }>
                                        <Grade grade = { el.grade }>{ el.grade === '청소' ? '청불' : el.grade }</Grade>
                                        <MovieTitle>{ el.title }</MovieTitle>
                                    </MovieBody>
                                })}
                            </ScrollBody>
                    </Movie>
                    <Theater>
                        <Title>극장</Title>
                        <TheaterBody>
                            <AreaBody>
                            { this.state.theaterResult.map((el, index) => {
                                return <Area key = { index } className = "area" onClick = { () => this.selectArea(index) }>
                                            { el[0].substr(2) }({ this.state.theaterResult[index].length })
                                        </Area>
                                    
                            })}
                            </AreaBody>
                            <TheaterListBody id = "theaterbody">
                                <ScrollBody>
                                { this.state.theaterResult.map((el, index) => {
                                    if(this.state.selectArea === index) {
                                        return <React.Fragment>
                                        { this.state.theaterResult[index].map((i, j) => {
                                            if(j >= 1) {
                                                return <TheaterList key = { j } id = "theaterlist">
                                                    { i }
                                                </TheaterList> 
                                            }
                                        })}
                                        </React.Fragment>
                                    }
                                })}
                                </ScrollBody>
                            </TheaterListBody>
                        </TheaterBody>
                        </Theater>
                    <Date>
                        <Title>날짜</Title>
                    </Date>
                    <Time>
                        <Title border = "time">시간</Title>
                    </Time>
                </ReserveBody>
            </MainBack>
        )
    }
}

export default Reserve;