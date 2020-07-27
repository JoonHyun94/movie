import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
import ReservePopComponent from '../reserve/ReservePop';

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
    height: 80vh;
    background-color: #F9F5EA;
    border-radius: 5px;
`
const ScrollBody = styled.div`
    width: 100%;
    height: 75vh;
    overflow-y: scroll;
    -ms-overflow-style: none; // IE에서 스크롤바 감춤
    &::-webkit-scrollbar { 
      display: none !important; // 윈도우 크롬 등
    }
`
const Title = styled.div`
    width: 100%;
    height: 3.5vh;
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
    line-height: 3.5vh;
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
    width: 70%;
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
    margin-top: 0.5vw;
    margin-bottom: ${ 
        props => {
            switch(props.time) {
                case 'true' :
                    return '0';
                default : 
                    return '1vw';
            }
        }
    };
    cursor: ${ 
        props => {
            switch(props.time) {
                case 'true' :
                    return 'default';
                default : 
                    return 'pointer';
            }
        }
    };
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
    margin-top: 0.5vw;
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
    cursor: pointer;
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
const TimeBody = styled(MovieBody)`
    flex-wrap: wrap;
    margin-top: 0;
    cursor: default;
`
const Kind = styled.div`
    margin-bottom: 0.5vw;
    margin-left: 1vw;
    width: 100%;
    font-size: 0.7vw;
    text-align: justify;
`
const Floor = styled.div`
    margin-top: 1.5vw;
    margin-bottom: 0.5vw;
    margin-left: 1vw;
    width: 90%;
    font-size: 0.8vw;
    font-weight: bold;
    text-align: justify;
`
const TimetableBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 1vw;
    width: 80%;
    cursor: pointer;
`
const Timetableinfo = styled.div`
    width: 100%;
    margin-left: 1vw;
    font-size: 1.5vw;
`
const Timetable = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 0.4vw;
    border: solid #CBCABE;
    border-width: ${ 
        props => {
            switch(props.border) {
                case 0 :
                    return '1px';
                case 4 :
                case 8 :
                case 12 :
                case 16 :
                    return '1px 1px 1px 0px';
                case 20 :
                    return '0px 1px 1px 1px';
                case 40 :
                    return '0px 1px 1px 1px';
                default : 
                    return '0px 1px 1px 0px';
            }
        }
    };
    font-size: 0.8vw;
    font-weight: bold;
`
const Timetabletime = styled.div`
`
const Timetableseat = styled.div`
    margin-top: 0.2vw;
    color: #2275A4;
`
const Movie = styled.div`
    width: 15%;
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
    width: 40%;
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
        theaterResult: [],
        movieResult: [],
        movieTimeResult: [],
        completed: 0, // 로딩 애니메이션의 초기값: 0, 0 ~ 100까지 게이지가 채워짐
        loadingText: 0, // 로딩 텍스트
        nullCheck: 0, // nullCheck
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        mainTag: null,
        selectAreaIndex: 0,
        subStringArea: null,
        dateResult: [],
        timeResult: [],
        selectAreaNo: null,
        selectArea: null,
        selectTheaterNo: null,
        selectTheater: null,
        selectDate: null,
        selectWeek: null,
        selectDay: null,
        selectTitle: null,
        selectGrade: null,
        selectKind: null,
        selectRuntime: null,
        selectTime: null,
        selectSeat: null,
        modalOpen: false,
        popData: []
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

    selectArea (index, areano, area) {
        document.getElementById("displaydate").style.display = "none";
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

        this.state.selectAreaIndex = index;
        this.state.selectAreaNo = areano;
        this.state.selectArea = area;

        document.getElementById('theaterbody').style.display = 'block'
    }

    selectDate (index, theaterno, theater) {
        var selectDate = document.querySelectorAll(".theaterlist");
        var selectDateListBody = document.querySelectorAll(".datelistbody");

        document.getElementById("displaydate").style.display = "block";
        document.getElementById("displaymovie").style.display = "none"
        document.getElementById("displaytime").style.display = "none"

        for(var i = 0; i < selectDate.length; i++) {
            if(i === index) {
                selectDate[index].style.backgroundColor = '#333';
                selectDate[index].style.color = 'white';
            } else {
                selectDate[i].style.backgroundColor = 'transparent';
                selectDate[i].style.color = '#666';
            }
        }
        for(var i = 0; i < selectDateListBody.length; i++) {
            selectDateListBody[i].style.border = '0px';
            selectDateListBody[i].style.padding = '0px 0px 0px 0px';
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

        this.state.selectTheaterNo = theaterno;
        this.state.selectTheater = theater;

        console.log(this.state.dateResult);

    }

    getMovie (date, index, week, month, day) {
        var selectDateListBody = document.querySelectorAll(".datelistbody");
        var selectMovieBody = document.querySelectorAll(".moviebody");
        document.getElementById("displaymovie").style.display = "block"
        document.getElementById("displaytime").style.display = "none"

        for(var i = 0; i < selectDateListBody.length; i++) {
            if(i === index) {
                selectDateListBody[index].style.border = '1.5px solid #666';
                selectDateListBody[index].style.padding = '0px 5px 0px 5px';
            } else {
                selectDateListBody[i].style.border = '0px';
                selectDateListBody[i].style.padding = '0px 0px 0px 0px';
            }
        }
        for(var i = 0; i < selectMovieBody.length; i++) {
            selectMovieBody[i].style.backgroundColor = 'transparent';
            selectMovieBody[i].style.color = '#666';
        }

        var subDate = null;
        subDate = date.replace(/-/gi, "");
        subDate = subDate.substring(0, 8);

        this.state.selectDate = subDate;
        this.state.selectWeek = week;
        this.state.selectDay = month + day;

        let form = new FormData()
        form.append('areano', this.state.selectAreaNo)
        form.append('theaterno', this.state.selectTheaterNo)
        form.append('date', this.state.selectDate)

        axios.post('http://localhost:8088/getMovie', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
        .then(res => {
            console.log(res.data);
            const movieList = []; // 결과값을 받아올 배열
            if(res.data && Array.isArray(res.data)) {
                console.log(res.data.title);
                res.data.forEach(el => { // 결과 수 만큼 반복
                    movieList.push({ // movieListList에 결과의 원하는 부분을 저장
                        title: el.title,
                        grade: el.grade,
                        kind: el.kind,
                        runtime: el.runtime
                    })
                    console.log(movieList);
                })
            }
             this.setState({
                movieResult: movieList, // state에 저장
                nullCheck: 1
            });
        }) 
        .catch(res => console.log(res))
    }

    getMovieTime (index, title, grade, kind, runtime) {
        document.getElementById("displaytime").style.display = "block"

        var selectDoc = document.querySelectorAll(".moviebody");
        this.state.selectTitle = title;
        this.state.selectGrade = grade;
        this.state.selectKind = kind;
        this.state.selectRuntime = runtime;
        var cnt = 0;

        for(var i = 0; i < selectDoc.length; i++) {
            if(i === index) {
                selectDoc[index].style.backgroundColor = '#333';
                selectDoc[index].style.color = 'white';
            } else {
                selectDoc[i].style.backgroundColor = 'transparent';
                selectDoc[i].style.color = '#666';
            }
        }

        let form = new FormData()
        form.append('areano', this.state.selectAreaNo)
        form.append('theaterno', this.state.selectTheaterNo)
        form.append('date', this.state.selectDate)
        form.append('title', this.state.selectTitle)

        axios.post('http://localhost:8088/getMovieTime', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
        .then(res => {
            const movieTimeList = []; // 결과값을 받아올 배열
            this.state.timeResult = [];
            if(res.data && Array.isArray(res.data)) {
                for(var i = 0; i < res.data.length; i++) {
                    movieTimeList[i] = res.data[i];
                }

                for(var i = 0; i < movieTimeList.length; i++) {
                    console.log(movieTimeList[i].time);
                    if(!movieTimeList[i].time) {
                        var timeArray = [];
                        timeArray[i] = "null";

                        this.state.timeResult[i] = timeArray;
                    } else {
                        var timeArray = [];
                        for(var j = 0; j < movieTimeList[i].time.length; j = j + 4) {
                            timeArray[j] = movieTimeList[i].time.substring(j, j + 4);
                        }
                        this.state.timeResult[i] = timeArray;
                    }
                }
                console.log(this.state.timeResult);

                this.setState({
                    movieTimeResult: movieTimeList // state에 저장
                });
            }
        }) 
        .catch(res => console.log(res))

    }

    selectSeat (time, seat) {
        this.state.selectTime = time;
        this.state.selectSeat = seat;

        let form = new FormData()
        form.append('id', window.sessionStorage.getItem("id"));
        form.append('area', this.state.selectArea)
        form.append('theater', this.state.selectTheater)
        form.append('week', this.state.selectWeek)
        form.append('day', this.state.selectDay)
        form.append('grade', this.state.selectGrade)
        form.append('title', this.state.selectTitle)
        form.append('time', this.state.selectTime)
        form.append('runtime', this.state.selectRuntime)
        form.append('seat', this.state.selectSeat)

        this.state.popData[0] = window.sessionStorage.getItem("id");
        this.state.popData[1] = this.state.selectArea;
        this.state.popData[2] = this.state.selectTheater;
        this.state.popData[3] = this.state.selectWeek;
        this.state.popData[4] = this.state.selectDay;
        this.state.popData[5] = this.state.selectGrade;
        this.state.popData[6] = this.state.selectTitle;
        this.state.popData[7] = this.state.selectTime;
        this.state.popData[8] = this.state.selectRuntime;
        this.state.popData[9] = this.state.selectSeat;

        axios.post('http://localhost:8088/reservePop', form, { headers: { 'Content-Type': 'multipart/form-data;' }})
        .then(res => {
                console.log(res.data);
                if(res.data.tprr === "true" && res.data.reserve === "true") {
                    alert("이미 예약된 내역이 있습니다.");
                } else if(res.data.tprr === "true" && res.data.reserve === "false") {
                    var msg = "진행중인 예약 내용이 있습니다. 불러오시겠습니까?";
                    if(window.confirm(msg) != 0) {
                        this.setState({ modalOpen: true });
                    }
                } else if(res.data.tprr === "false" && res.data.reserve === "true") {
                    alert("이미 예약된 내역이 있습니다.");
                } else if(res.data.tprr === "false" && res.data.reserve === "false") {
                    this.setState({ modalOpen: true });
                }
            }
        ) 
        .catch(res => console.log(res))
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        const { classes } = this.props;
        const { completed, nullCheck, loadingText, dateResult, movieTimeResult, timeResult } = this.state;

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
                                    return <Area key = { index } className = "area" onClick = { () => this.selectArea(index, el[1], el[0].substr(2)) }>
                                                { el[0].substr(2) }({ this.state.theaterResult[index].length })
                                            </Area>
                                })}
                                </AreaBody>
                                <TheaterListBody id = "theaterbody">
                                    <ScrollBody className = "scrollbody">
                                    { this.state.theaterResult.map((el, index) => {
                                        if(this.state.selectAreaIndex === index) {
                                            return <React.Fragment key = { index }>
                                            { this.state.theaterResult[index].map((i, j) => {
                                                if(j >= 2) {
                                                    return <TheaterList key = { j } id = "theaterlist" className = "theaterlist" onClick = { () => this.selectDate(j - 2, i.substring(i.indexOf("=") + 1, i.length), i.substring(0, i.indexOf("="))) }>
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
                            <DateBody id = "datebody" className = "datebody">
                                <ScrollBody id = "displaydate">
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
                                                return <DateListBody className = "datelistbody" week = { i[11] } key = { j } onClick = { () => this.getMovie(el[j], j, i[11], el[0].substring(5, 7), i.substring(9, 10)) }>
                                                            <DayWeek className = "week" week = { i[11] }>{ i[11] }</DayWeek>
                                                            <Day className = "day" week = { i[11] }>{ i.substring(9, 10) }</Day>
                                                        </DateListBody>
                                            } else {
                                                return <DateListBody className = "datelistbody" week = { i[11] } key = { j } onClick = { () => this.getMovie(el[j], j, i[11], el[0].substring(5, 7), i.substring(8, 10)) }>
                                                            <DayWeek className = "week" week = { i[11] }>{ i[11] }</DayWeek>
                                                            <Day className = "day" week = { i[11] }>{ i.substring(8, 10) }</Day>
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
                            <ScrollBody id = "displaymovie">
                                { this.state.movieResult.map((el, index) => {
                                    return <MovieBody id = "moviebody" className = "moviebody" key = { index } onClick = { () => this.getMovieTime(index, el.title, el.grade, el.kind, el.runtime) }>
                                        <Grade grade = { el.grade }>{ el.grade === '청소' ? '청불' : el.grade }</Grade>
                                        <MovieTitle>{ el.title }</MovieTitle>
                                    </MovieBody>
                                })}
                            </ScrollBody>
                        </Movie>
                        <Time>
                            <Title border = "time">시간</Title>
                            <TimeBody id = "displaytime">
                                <ScrollBody>
                                    <MovieBody time = "true">
                                        <Grade grade = { this.state.selectGrade }>{ this.state.selectGrade === '청소' ? '청불' : this.state.selectGrade }</Grade>
                                        <MovieTitle>{ this.state.selectTitle }</MovieTitle>
                                    </MovieBody>
                                    <Kind>{ this.state.selectKind }</Kind>
                                        { movieTimeResult.map((el, index) => {
                                            return <React.Fragment key = { index }>
                                                <Floor>▶&nbsp;{ el.floor }</Floor>
                                                <TimetableBody>
                                                { timeResult[index].map((i , j) => {
                                                    if(i === "null") {
                                                        return <Timetableinfo>
                                                                    현재 상영시간이 없습니다!
                                                                </Timetableinfo>
                                                    } else {
                                                        return <Timetable border = { j } key = { j } onClick = { () => this.selectSeat(i, el.floor.substring(el.floor.length - 4, el.floor.length)) }>
                                                                    <Timetabletime>{ i.substring(0, 2) + " : " + i.substring(2, 4) }</Timetabletime>
                                                                    <Timetableseat>{ el.floor.substring(el.floor.length - 4, el.floor.length)}</Timetableseat>
                                                                </Timetable>
                                                    }
                                                })}
                                                </TimetableBody>
                                            </React.Fragment>
                                        })}
                                </ScrollBody>
                            </TimeBody>
                        </Time>
                    </ReserveBody>
                </MainBack>
                }
                <ReservePopComponent modalOpen = { this.state.modalOpen } modalClose = { this.closeModal } popData = {this.state.popData }/>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Reserve);