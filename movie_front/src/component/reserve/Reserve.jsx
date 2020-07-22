import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

const Mainloading = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform:translateX(-50%);
    text-align: center;
`
const Loadingtext = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 40%;
    left: 50%;
    transform:translateX(-50%);
`
const Loadingreserve = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 70%;
    left: 50%;
    transform:translateX(-50%);
`
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
    height: 68vh;
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
                case 'theater' :
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
    cursor: pointer;
    color: #666;
`
const TheaterBody = styled.div`
    display: flex;
    flex-wrap: row;
    margin: 1vw;
    margin-top: 0.5vw;
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
    margin-right: 0.5vw;
    padding: 0.5vw;
    font-size: 0.8vw;
    background-color: #E6E4D9;
    cursor: pointer;
`
const TheaterListBody = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.5vw;
    width: 50%;
    display: none;
`
const TheaterList = styled.div`
    margin-bottom: 0.9vw;
    font-size: 0.9vw;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: justify;
    cursor: pointer;
    color: #666;
`
const DateBody = styled.div`
    margin-bottom: 1vw;
    display: flex;
    flex-direction: column;
`
const Year = styled.div`
    font-size: 0.7vw;
    color: #666;
`
const Month = styled.div`
    font-size: 2vw;
    font-weight: bold;
    color: #666;
`
const DateListBody = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: row;
    width: 50%;
`
const DayWeek = styled.div`
    font-size: 0.7vw;
    line-height: 2vw;
    color: ${ 
        props => {
            switch(props.week) {
                case '토' :
                    return '#31597E';
                case '일' :
                    return '#AD2727';
                default : 
                    return '#666';
            }
        }
    };
`
const Day = styled.div`
    width: 100%;
    font-size: 1.2vw;
    font-weight: bold;
    text-align: end;
    color: ${ 
        props => {
            switch(props.week) {
                case '토' :
                    return '#31597E';
                case '일' :
                    return '#AD2727';
                default : 
                    return '#666';
            }
        }
    };
`
const Movie = styled.div`
    width: 25%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`
const Theater = styled.div`
    width: 30%;
    height: 100%;
    background-color: transparent !important;
`
const Date = styled.div`
    width: 15%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`
const Time = styled.div`
    width: 30%;
    height: 100%;
    background-color: transparent !important;
    border-left: 1px solid gray;
`

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2
    }
});

class Reserve extends Component {    
    state = {
        apiResult: [],
        completed: 0, // 로딩 애니메이션의 초기값: 0, 0 ~ 100까지 게이지가 채워짐
        loadingText: 0, // 로딩 텍스트
        nullCheck: 0, // nullCheck
        theaterResult: [],
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        mainTag: null,
        selectArea: 0,
        subStringArea: null,
        dateResult: [],
        selectAreaNo: null,
        selectTheaterNo: null,
        selectDate: null
    }

    componentDidMount() {
        this.IntervalProgress = setInterval(this.progress, 20); // 0.02초마다 progress함수가 실행됨
        this.IntervalText = setInterval(this.loadingText, 20);

        this.getApi();
    };

    // 애니메이션 함수
    progress = () => {
        if(this.state.nullCheck === 0) {
            const { completed } = this.state;
            // completed가 100이되면 0으로 돌아가고 아닐 시 1씩 증가
            this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
        } else {
            clearInterval(this.IntervalProgress);

            // 로딩 화면 후 메인화면 view 잡기
            this.stateprevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.statenewHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.statemainTag = document.querySelector("[id = 'Main_Back']");
    
            setInterval(this.onHeight, 10);
        }
    }

    // 로딩 텍스트
    loadingText = () => {
        if(this.state.nullCheck === 0) {
            const { loadingText } = this.state;
            this.setState({ loadingText: loadingText >= 1.0 ? 0 : loadingText + 0.01 })
        } else {
            clearInterval(this.IntervalText);
        }
    }

    getApi = () => {
        axios.get('http://localhost:8088/reserve') 
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
                        nullCheck: 1
                    });
                }
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
        var selectArea = document.querySelectorAll(".area");

        for(var i = 0; i < selectDoc.length; i++) {
            if(i === index) {
                selectDoc[index].style.backgroundColor = '#333';
                selectDoc[index].style.color = 'white';
            } else {
                selectDoc[i].style.backgroundColor = 'transparent';
                selectDoc[i].style.color = '#666';
            }
        }

        for(var i = 0; i < selectArea.length; i++) {
            selectArea[i].style.backgroundColor = '#E6E4D9';
            selectArea[i].style.color = 'black';
            document.getElementById('theaterbody').style.display = 'none'
        }
    }

    selectArea (index, area) {
        var selectDoc = document.querySelectorAll(".area");

        for(var i = 0; i < selectDoc.length; i++) {
            selectDoc[i].style.backgroundColor = '#E6E4D9';
            selectDoc[i].style.color = 'black';

            if(i === index) {
                selectDoc[index].style.backgroundColor = 'transparent';
            } else {
                selectDoc[i].style.backgroundColor = '#E6E4D9';
                selectDoc[i].style.color = 'black';
            }
        }

        this.state.selectArea = index;
        this.state.selectAreaNo = area;
        document.getElementById('theaterbody').style.display = 'block'
    }

    selectDate (index, theater) {
        var selectDate = document.querySelectorAll(".theaterlist");

        for(var i = 0; i < selectDate.length; i++) {
            if(i === index) {
                selectDate[index].style.backgroundColor = '#333';
                selectDate[index].style.color = 'white';
            } else {
                selectDate[i].style.backgroundColor = 'transparent';
                selectDate[i].style.color = '#666';
            }
        }

        let newDate = new window.Date();
        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var date = newDate.getDate();
        var sysdate = 0;
        var cnt = 0;

        for(var i = month; i < 12; i++) {
            var dateArray = new Array();
            if(i === month) {
                sysdate = date - 1;
                cnt++;
            } else {
                sysdate = 0;
            }
            for(var j = sysdate; j < new window.Date(year, i + 1, 0).getDate(); j++) {  
                var monthString = (i + 1);
                var dayString = (j + 1);

                if(monthString.toString().length === 1) {
                    monthString = '0' + monthString;
                }
                if(dayString.toString().length === 1) {
                    dayString = '0' + dayString;
                }

                var dateString = newDate.getFullYear() + '-' + monthString + '-' + dayString;
                if(i === month) {
                    dateArray[j-sysdate] = dateString + ',' + week[new window.Date("'" + dateString + "'").getDay()];
                } else {
                    dateArray[j] = dateString + ',' + week[new window.Date("'" + dateString + "'").getDay()];
                }
            }
            this.state.dateResult[i+1] = dateArray;
        }

        this.state.selectTheaterNo = theater;
        console.log(this.state.dateResult);

    }

    getMovie (date) {
        var subDate = null;
        subDate = date.replace(/-/gi, "");
        subDate = subDate.substring(0, 8);

        this.state.selectDate = subDate;

        let form = new FormData()
        form.append('areano', this.state.selectAreaNo)
        form.append('theaterno', this.state.selectTheaterNo)
        form.append('date', this.state.selectDate)

        axios.post('http://localhost:8088/getMovie', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
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
                nullCheck: 1,
            });
        }) 
        .catch(res => console.log(res))
        console.log(this.apiResult);
    }

    render() {
        const { classes } = this.props;
        const { completed, nullCheck, loadingText, dateResult } = this.state;

        return(
            <React.Fragment>
            { nullCheck === 0 ?
                <React.Fragment>
                    <Mainloading>
                        <CircularProgress className = { classes.progress } variant = "determinate" value={ completed } size = {'10vw'}/>
            
                        <Motion style={{ opacity: spring(loadingText) }}>
                                {
                                ({ opacity }) =>  <Loadingtext style={Object.assign({}, this.Loadingtext, { opacity })}>
                                Loading
                                </Loadingtext>
                                }
                        </Motion>
                    </Mainloading>
                    <Loadingreserve>영화 리스트와 극장목록을 불러오는 중입니다.</Loadingreserve>
                </React.Fragment>
                :
                <MainBack id = "Main_Back">
                    <ReserveBody>
                        <Theater>
                            <Title border = "theater">극장</Title>
                            <TheaterBody>
                                <AreaBody id = "areabody">
                                { this.state.theaterResult.map((el, index) => {
                                    return <Area key = { index } className = "area" onClick = { () => this.selectArea(index, el[1]) }>
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
                                                if(j >= 2) {
                                                    return <TheaterList key = { j } id = "theaterlist" className = "theaterlist" onClick = { () => this.selectDate(j-1, i.substring(i.indexOf("=") + 1, i.length)) }>
                                                        { i.substring(0, i.indexOf("=")) }
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
                            <DateBody id = "datebody">
                                <ScrollBody>
                                    { dateResult.map((el, index) => {
                                        return <React.Fragment key = { index }>
                                                <Year>{ el[0].substring(0, 4) }</Year>
                                                <Month>{ el[0].substring(5, 7) }</Month>
                                        { dateResult[index].map((i, j) => {
                                            if(i.substring(8, 10) === '01' || 
                                                i.substring(8, 10) === '02' || 
                                                i.substring(8, 10) === '03' || 
                                                i.substring(8, 10) === '04' || 
                                                i.substring(8, 10) === '05' || 
                                                i.substring(8, 10) === '06' || 
                                                i.substring(8, 10) === '07' || 
                                                i.substring(8, 10) === '08' || 
                                                i.substring(8, 10) === '09') {
                                                return <DateListBody key = { j } onClick = { () => this.getMovie(el[j]) }>
                                                            <DayWeek week = { i[11] }>{ i[11] }</DayWeek>
                                                            <Day week = { i[11] }>{ i.substring(9, 10) }</Day>
                                                        </DateListBody>
                                            } else {
                                                return <DateListBody key = { j } onClick = { () => this.getMovie(el[j]) }>
                                                            <DayWeek week = { i[11] }>{ i[11] }</DayWeek>
                                                            <Day week = { i[11] }>{ i.substring(8, 10) }</Day>
                                                        </DateListBody>
                                            }
                                        })}
                                        </React.Fragment>
                                    })}
                                </ScrollBody>
                            </DateBody>
                        </Date>
                        <Movie>
                            <Title border = "movie">영화</Title>
                            <ScrollBody>
                                { this.state.apiResult.map((el, index) => {
                                    return <MovieBody id = "moviebody" className = "moviebody" key = { index } onClick = { () => this.getTheater(index) }>
                                        <Grade grade = { el.grade }>{ el.grade === '청소' ? '청불' : el.grade }</Grade>
                                        <MovieTitle>{ el.title }</MovieTitle>
                                    </MovieBody>
                                })}
                            </ScrollBody>
                        </Movie>
                        <Time>
                            <Title border = "time">시간</Title>
                        </Time>
                    </ReserveBody>
                </MainBack>
                }
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Reserve);