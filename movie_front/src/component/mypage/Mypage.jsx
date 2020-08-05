import React, {Component} from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
import axios from "axios";
import barcodeimg from "../../image/barcode.png";
import expansion from "../../image/expansion.png";
import BarcodePop from "../mypage/BarcodePop";

const type = keyframes`
    from { margin-left: -150%; }
    to { margin-left: 120%; }
`

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
const Loadingmypage = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 70%;
    left: 50%;
    transform:translateX(-50%);
`

const MypageBack = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
const MypageBody = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 45%;
    height: 80vh;
    background-color: #F9F5EA;
    border-radius: 5px;
`
const Title = styled.div`
    width: 100%;
    height: 3.5vh;
    background-color: #504E48;
    color: white;
    border-radius: 5px 5px 0 0;
    line-height: 3.5vh;
`
const ReserveBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 90%;
    height: 88%;
    background-color: transparent !important;
    top: 52%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: space-between;
`
const ScrollBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none; // IE에서 스크롤바 감춤
    &::-webkit-scrollbar { 
      display: none !important; // 윈도우 크롬 등
    }
    justify-content: space-between;
`
const ReserveListBody = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`
const ReserveList = styled.div`
    position: relative;
    width: 100%;
    height: max-content;
    border: solid 1px #D1D1D1;
    border-radius: 5px 5px 0 0;
`
const ReserveTitle = styled.div`
    margin: 0 auto;
    margin-top: 2vw;
    width: 100%;
    height: 2vw;
    font-size: 0.9vw;
    line-height: 2vw;
    border-top: solid 2px #666;
    border-bottom: solid 2px #666;;
`
const ReserveGrade = styled.div`
    position: absolute;
    top: 0.5vw;
    right: 1vw;
    width: 10%;
    font-size: 0.8vw;
`
const ReserveFloor = styled.div`
    position: relative;
    margin: 0 auto;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    width: 80%;
    height: 0.7vw;
    font-size: 0.7vw;
    line-height: 0.7vw;
    overflow: hidden;
    white-space: nowrap;

`
const Floor = styled.div`
    position: absolute;
    animation: ${ type } 10s;
    animation-iteration-count: infinite;
    animation-delay: now;
`
const Seat = styled.div`
    width: 100%;
    font-size: 1vw;
    font-weight: bold;
`
const Date = styled.div`
    width: 100%;
    font-size: 0.7vw;
    font-weight: bold;
`
const ReserveDate = styled.div`
    margin-top: 0.5vw;
    width: 100%;
    font-size: 0.7vw;
`
const ReservePrice = styled.div`
    margin-top: 0.5vw;
    width: 100%;
    font-size: 0.9vw;
`
const SubTitle = styled.div`
    font-size: 0.7vw;
`
const SubBody = styled.div`
    font-weight: bold;
`
const BacodeText = styled.div`
    margin-top: 1vw;
    font-size: 1.1vw;
    font-weight: bold;
`
const Barcode = styled.img`
    width: 80%;
    height: 100%;
    margin-bottom: 0.5vw;
`
const Expansion = styled.img`
    cursor: pointer;
    position: absolute;
    bottom: 1vw;
    width: 8%;
    height: 5%;
`
const Button = styled.button`
    position: relative;
    margin-bottom: 1vw;
    cursor: pointer;
    width: 100%;
    height: 2vw;
    border: none;
    border-radius: 0 0 5px 5px;
    background-color: #F5DA81;
    white-space: pre;
    font-family: NanumGothic;
    font-size: 0.7vw;
    transition: all 0.8s, color 0.8s; // 마우스오버 시 box-shadow 0.8s, 텍스트 색깔 0.8s 설정
    &:hover {
        color: #fff;
        // box-shadow:  x-positon(가로) +-150px로 양옆으로 그림자생성, 
        //              y-position(세로) 0,
        //              blur(흐림) 0, 
        //              spread(그림자 확장) 0, 
        //              color(색상) rgba로 투명도 적용, 
        //              inset 안쪽에만 적용
        box-shadow: 250px 0 0 0 rgba(0,0,0,0.25) inset, 
                    -250px 0 0 0 rgba(0,0,0,0.25) inset;
    }
`

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2
    }
});

class Mypage extends Component { 
    state = {
        completed: 0, // 로딩 애니메이션의 초기값: 0, 0 ~ 100까지 게이지가 채워짐
        loadingText: 0, // 로딩 텍스트
        nullCheck: 0, // nullCheck
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        mainTag: null,
        reserveResult: [],
        date: new window.Date(),
        bacodeOpen: false
    }

    componentDidMount() {
        this.IntervalProgress = setInterval(this.progress, 20); // 0.02초마다 progress함수가 실행됨
        this.IntervalText = setInterval(this.loadingText, 20);

        this.getMypage();
    };

    getMypage = () => {
        let form = new FormData()
        form.append('id', window.sessionStorage.getItem("id"));

        axios.post('http://localhost:8088/mypage', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
            .then(res => {
                console.log(res.data);
                const reserveList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    console.log(res.data.title);
                    for(var i = 0; i < res.data.length; i++) {
                        reserveList[i] = res.data[i];
                    }
                    console.log(reserveList[0]);
                }
                this.setState({
                    reserveResult: reserveList,
                    nullCheck: 1
                });
            })
            .catch(res => console.log(res))
    }

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
            this.statemainTag = document.querySelector("[id = 'Mypage_Back']");
    
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

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.prevHeaderHeight != this.state.headerHeight) {
            this.setState({ 
                prevHeaderHeight: this.state.headerHeight
            });

            this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.state.mainTag = document.querySelector("[id = 'Mypage_Back']");
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

    openExpansion = () => {
        this.setState({
            bacodeOpen: true
        });
    }
    closeExpansion = () => {
        this.setState({ 
            bacodeOpen: false 
        });
    }

    removeReserve = (index) => {
        var msg = "예매를 취소할 경우 예매내역이 전부 사라집니다. 진행하시겠습니까?";
        if(window.confirm(msg) != 0) {
            let form = new FormData()
            
            for(var i = 0; i < this.state.reserveResult.length; i++) {
                if(index === i) {
                    form.append('id', this.state.reserveResult[i].id);
                    form.append('area', this.state.reserveResult[i].area);
                    form.append('theater', this.state.reserveResult[i].theater);
                    form.append('day', this.state.reserveResult[i].day);
                    form.append('reserve_time', this.state.reserveResult[i].reserve_time);
                    form.append('ticket_number', this.state.reserveResult[i].ticket_number);
                    form.append('ticket_price', this.state.reserveResult[i].ticket_price);
                    form.append('title', this.state.reserveResult[i].title);
                    form.append('time', this.state.reserveResult[i].start_time);
                }
            }

            axios.post('http://localhost:8088/removeReserve', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
            .then(res => {
                alert("해당 예매내역이 취소 되었습니다.")
                window.location.href="/mypage";
            })
            .catch(res => console.log(res))
        }
    }

    render() { 
        const { classes } = this.props;
        const { completed, nullCheck, loadingText, reserveResult, date } = this.state;

        return (
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
                        <Loadingmypage>Mypage를 로딩 중입니다.</Loadingmypage>
                    </React.Fragment>
                    :
                    <MypageBack id = "Mypage_Back">
                        <MypageBody>
                            <Title>예매 현황</Title>
                                <ReserveBody>
                                    <ScrollBody>
                                        { reserveResult.map((el, index) => {
                                            return <ReserveListBody key = { index }>
                                            <ReserveList>
                                                <ReserveGrade>{ el.grade }</ReserveGrade>
                                                <ReserveTitle>{ el.title }</ReserveTitle>
                                                <ReserveFloor>
                                                    <Floor>
                                                        { el.floor }
                                                    </Floor>
                                                </ReserveFloor>
                                                <Seat>{ el.select_seat }</Seat>
                                                <Date>
                                                    { date.getFullYear() + '.' + el.day.substring(0, 2) + '.' + el.day.substring(2, 4) + '(' + el.week + ')' }
                                                    &nbsp;
                                                    { el.start_time.substring(0, 2) + ':' + el.start_time.substring(2, 4) }
                                                </Date>
                                                <ReserveDate>
                                                    <SubTitle>결제일<br></br></SubTitle>
                                                    <SubBody>{ '20' + el.reserve_time.substring(0, 2) + '.' + el.reserve_time.substring(3, 5) + '.' + el.reserve_time.substring(6, 8) }</SubBody>
                                                </ReserveDate>
                                                <ReservePrice>
                                                    <SubTitle>결제금액<br></br></SubTitle>
                                                    <SubBody>{ el.ticket_price + '원' }</SubBody>
                                                </ReservePrice>
                                                <BacodeText>
                                                    CGV<br></br>
                                                    <Barcode src = { barcodeimg }></Barcode>
                                                    <Expansion src = { expansion } onClick = { () => this.openExpansion() }></Expansion>
                                                </BacodeText>
                                            </ReserveList>
                                            <Button onClick = { () => this.removeReserve(index) }>예매취소</Button>
                                        </ReserveListBody>
                                        })}
                                    </ScrollBody>
                                </ReserveBody>
                        </MypageBody>
                        <BarcodePop bacodeOpen = { this.state.bacodeOpen } bacodeClose = { this.closeExpansion } />
                    </MypageBack>
                }
            </React.Fragment>
        )
    }
}

export default  withStyles(styles)(Mypage);