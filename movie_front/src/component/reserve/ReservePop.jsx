import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled, { keyframes } from 'styled-components';
import { generateMedia } from 'styled-media-query';
import { jssPreset } from "@material-ui/core";

// 반응형 웹
const customMedia = generateMedia({
    maxmobile: '700px',
    minmobile: '352px',
});

const opacityTransition = keyframes`
    from { opacity: 0; }
    to { opacity: 0.5; }
`
const widthTransition = keyframes`
    from { width: 0%; }
    to { width: 70%; }
`
var ModalOverlay = styled.div`
`
var Modalbody = styled.div`
`
const CloseModal = styled.div`
    position: relative;
    cursor: pointer;
    top: 0.5vw;
    left: 96%;
    margin-top: 0.5vw;
    margin-bottom: 1vw;
    margin-right: 0;
    width: 2vw;
    height: 2vw;
    border: solid black;
    border-radius: 50%;
    opacity: 0.6;
    transform: translate(-10%);
    &:before {
        content: '';
        position: absolute;
        height: 1.2vw;
        border: solid black;
        border-width: 0 0.2vw 0.2vw 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
        content: '';
        position: absolute;
        height: 1.2vw;
        border: solid black;
        border-width: 0 0.2vw 0.2vw 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`
const ReserveMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    content: '';
    width: 100%;
`
const Info = styled.div`
    width: 20%;
    text-align: justify;
    font-size: 1.2vw;
    line-height: 2vw;
`
const InfoBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 0.5vw;
    width: 100%;
`
const InfoBox = styled.div`
    width: 2vw;
    height: 2vw;
    background-color: ${ 
        props => {
            switch(props.disable) {
                case 'true' :
                    return 'gray';
                case 'false' :
                    return 'none';
                default : 
                    return '#333';
            }
        }
    };
    border: ${ 
        props => {
            switch(props.disable) {
                case 'false' :
                    return '1px solid #E9005F';
                default : 
                    return 'none';
            }
        }
    };
`
const CheckBox = styled.input`
    height: 2vw;
    margin-bottom: 0.2vw;
`
const CheckBoxBody = styled.div`
    display: flex;
    width: 70%;
    position: absolute;
    right: 0;
`
const InfoText = styled.div`
    margin-left: ${ 
        props => {
            switch(props.info) {
                case 'true' :
                    return '0.5vw';
                default : 
                    return '0.1vw';
            }
        }
    };
    font-size: 0.8vw;
    line-height: 2vw;
`
const TitleBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-bottom: 2vw;
`
const Title = styled.div`
    margin-left: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return '7vw';
                case 'false' :
                    return '7vw'
                default : 
                    return '0';
            }
        }
    };
    width: 100%;
    text-align: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return 'justify';
                case 'false' :
                    return 'justify'
                default : 
                    return 'center';
            }
        }
    };
    font-size: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return '0.9vw';
                case 'false' :
                    return '1.2vw'
                default : 
                    return '1vw';
            }
        }
    };
    font-weight: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return 'none';
                default : 
                    return 'bold';
            }
        }
    };
    line-height: 2vw;
`
const SelectSeatInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #333;
    margin-bottom: 2vw;
    padding-left: 2vw;
    padding-right: 2vw;
`
const Seat = styled.div`
    position: relative;
    width: 40vw;
    height: 50vh;
    margin: 0 auto;
    margin-left: 8vw;
    margin-right: 3vw;
    display: flex;
    flex-wrap: wrap;
`
const Screen = styled.div`
    margin: 0 auto;
    margin-bottom: 3vw;
    width: 100%;
    height: 2.5vw;
    background-color: #78A9AD;
    border-radius: 5px;
    line-height: 2.5vw;
`
const Seat_pt = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const Alphabet = styled.div`
    position: absolute;
    left: -1vw;
    font-size: 0.7vw;
    height: 2vw;
    line-height: 2vw;
`
var Seat_div = styled.div`
    display: flex;
    border: 1px solid #E9005F;
    width: 7%;
    height: 100%;
    font-size: 0.6vw;
    justify-content: center;
    align-items: center;
    color: #666;
    cursor: pointer;
`
var Aisle = styled.div`
    background-color: transparent !important;
    width: 7%;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path:inset(50%);
`
const CheckSeat = styled.div`
    width: 0%;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path:inset(50%);
`
const Button = styled.button`
    position: relative;
    left: 83%;
    bottom: 2vw;
    cursor: pointer;
    width: 10%;
    height: 10%;
    border: none;
    border-radius: 8px;
    padding: 0.7vw;
    background-color: #F5DA81;
    white-space: pre;
    font-family: NanumGothic;
    font-size: 1vw;
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
//좌석정보 초기값(0 : 통로, 1 : 예약가능 좌석, 2 : 예약완료 좌석) 
var Seats;

var state = {
    count: 0,
    checkSeat: 0,
    inc: 1,
    api: 0,
    seat: 0,
    seatNum: 0,
    startTime: 0,
    endTime: 0,
    timeCnt: 0,
    timeCheck: 0,
    subtimeCheck: 0,
    selectSeat: false,
    ticketNum: 0,
    seatCnt: 0,
    ticketAge: false,
    ageCheck: '',
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K', 'L', 'M', 'N', 'O', 'P']
}

const ReservePop = ({ modalOpen, modalClose, popData }) => {

    if(modalOpen === true) {
        if(state.count === 0) {
            ModalOverlay = styled.div`
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: black;
                opacity: 0;
                animation: ${ opacityTransition } 0.3s forwards;
            `
            Modalbody = styled.div`
                position: fixed;
                z-index: 10;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 70%;
                height: 80vh;
                border-radius: 10px;
                background-color: #F9F5EA;
                box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
                animation: ${ widthTransition } 0.3s;
                @media only screen and (orientation: portrait) {
                    height: 70vh;
                }
            `

            state.count = 1;
            state.api = 1;
        }

        if(state.api === 1) {
            state.selectSeat = false;
            state.ticketNum = 100;

            console.log(popData);
            state.seat = popData[9].substring(0, popData[9].length - 1);
            state.seat = parseInt(state.seat);
            state.seatNum = state.seat + 28;

            Seats = new Array(Math.ceil(state.seatNum / 14));

            state.endTime = popData[8].substring(0, popData[8].length - 1);
            state.endTime = parseInt(state.endTime);
            state.timeCheck = popData[7].substring(0, 2);
            state.timeCheck = parseInt(state.timeCheck);
            state.subtimeCheck = popData[7].substring(2, 4);
            state.subtimeCheck = parseInt(state.subtimeCheck);

            // 종영시간
            if(state.timeCnt === 0) {
                for(var i = 0; i < state.endTime; i++) {
                    if(i === 60 || i === 120 || i === 180) {
                        state.timeCheck += 1;
                        state.endTime -= i;
                        console.log("endTime : " + state.endTime);
                    }
                }
                state.timeCnt = 1;
            }

            if(state.timeCnt === 1) {
                if(state.subtimeCheck + state.endTime > 59) {
                    state.timeCheck += 1;
                    state.subtimeCheck = (state.subtimeCheck + state.endTime) - 60;
                    console.log(state.subtimeCheck);
                } else {
                    state.subtimeCheck = state.subtimeCheck + state.endTime;
                }
                state.timeCnt = 2;
            }
            
            if(state.timeCnt === 2) {
                if(state.subtimeCheck < 10) {
                    state.endTime = state.timeCheck.toString() + '0' + state.subtimeCheck.toString();
                } else {
                    state.endTime = state.timeCheck.toString() + state.subtimeCheck.toString();
                }
                console.log(state.endTime);
                state.timeCnt = 0;
            }

            // 좌석 갯수
            for(var i = 0; i < Seats.length; i++) {
                Seats[i] = new Array(14);
                for(var j = 0; j < 14; j++) {
                    if(i === 0) {
                        if(j === 2 || j === 5 || j === 6 || j === 7 || j === 8 || j === 11) {
                            Seats[i][j] = 0;
                        } else {
                            Seats[i][j] = 1;
                        }
                    } else if(i === Seats.length - 1) {
                        Seats[i][j] = 1;
                    } else {
                        if(j === 2 || j === 11) {
                            Seats[i][j] = 0;
                        } else {
                            Seats[i][j] = 1;
                        }
                    }
                }
            }
            
            state.api = 2;
        }
    } else {
        state.count = 0;
        state.api = 0;
        state.selectSeat = false;
        state.ticketNum = 100;
    }

    return(
        <React.Fragment>
            { modalOpen === true ?
            <React.Fragment>
                <ModalOverlay/>
                <Modalbody id = "modal">
                    <CloseModal onClick = { modalClose }/>
                    <ReserveMain>
                        <TitleBody>
                            <Title small = 'false'>
                                { popData[6] }&emsp;&emsp;
                            </Title>
                            <Title small = 'true'>{ popData[10].substring(0, popData[10].length - 8) }</Title>
                            <Title small = 'false'>
                                { popData[4].substring(0, 4) + "." + popData[4].substring(4, 6) + "." + popData[4].substring(6, 8) + "(" + popData[3] + ")"}&emsp;
                                { popData[7].substring(0, 2) + " : " + popData[7].substring(2, 4) + " ~ " }
                                { state.endTime.substring(0, 2) + " : " + state.endTime.substring(2, 4)  }
                            </Title>
                        </TitleBody>
                        <SelectSeatInfo>
                                <InfoText>선택된 좌석 수</InfoText>
                                <Title>{ state.seatCnt }</Title>
                        </SelectSeatInfo>
                        <SelectSeatInfo>
                                <InfoText>남은좌석</InfoText>
                                <Title>{ popData[10].substring(popData[10].length - 4, popData[10].length) }&nbsp;/&nbsp;{ popData[10].substring(popData[10].length - 4, popData[10].length) }</Title>
                        </SelectSeatInfo>
                        <Seat>
                            <Screen>Screen</Screen>
                            { state.count === 1 ?
                                <React.Fragment>
                                    { Seats.map((s, index) => {
                                        return <Seat_pt  className = "seatParent" key = { index }>
                                            <Alphabet>{ state.alphabet[index] }</Alphabet>
                                            { s.map((i, j) => {
                                                return <React.Fragment key = { j }>
                                                    { index === 0 ?
                                                        <React.Fragment>
                                                            { j === 0 ?
                                                                <CheckSeat>
                                                                    { state.inc = j }
                                                                </CheckSeat>
                                                                : 
                                                                <CheckSeat>
                                                                    { state.inc = state.inc + 1 }
                                                                </CheckSeat>
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            <CheckSeat>
                                                                { state.checkSeat = state.checkSeat + 1 }
                                                            </CheckSeat>
                                                            { j === 0 ?
                                                                <CheckSeat>
                                                                    { state.inc = j }
                                                                </CheckSeat>
                                                                : 
                                                                <CheckSeat>
                                                                    { state.inc = state.inc + 1 }
                                                                </CheckSeat>
                                                            }
                                                        </React.Fragment>
                                                    }

                                                    { i === 1 ?
                                                        <React.Fragment>
                                                            { index === 0 ?
                                                                <Seat_div className = "seatlist" onClick = { () => selectSeat(index, j) }>
                                                                    { state.inc + 1 }
                                                                    <CheckSeat>
                                                                        { j === s.length - 1 ? state.checkSeat = ((index * s.length) + 1) + state.inc : "" }
                                                                    </CheckSeat>
                                                                </Seat_div>
                                                                :
                                                                <React.Fragment>
                                                                    { state.checkSeat > state.seat ?
                                                                        <CheckSeat></CheckSeat>
                                                                        :
                                                                        <Seat_div className = "seatlist" onClick = { () => selectSeat(index, j) }>
                                                                            { state.inc + 1 }
                                                                        </Seat_div>
                                                                    }
                                                                    <CheckSeat>
                                                                        { j === s.length - 1 ? state.checkSeat = state.checkSeat : "" }
                                                                    </CheckSeat>
                                                                </React.Fragment>
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            { index === 0 ?
                                                                <Aisle className = "seatlist">
                                                                    { state.inc = state.inc - 1 }
                                                                </Aisle>
                                                                :
                                                                <React.Fragment>
                                                                    { index === Seats.length - 1 ?
                                                                        <CheckSeat></CheckSeat>
                                                                        : 
                                                                        <Aisle className = "seatlist">
                                                                            { state.checkSeat = state.checkSeat - 1 }
                                                                            { state.inc = state.inc - 1 }
                                                                        </Aisle>
                                                                    }
                                                                </React.Fragment>
                                                        }
                                                        </React.Fragment>
                                                    }
                                                    </React.Fragment>
                                            })}
                                        </Seat_pt>
                                    })}
                                </React.Fragment>
                            : ""
                            }
                        </Seat>
                        <Info>
                            <Title>티켓 매수를 선택해주세요</Title>
                            <InfoBody>
                                <InfoText>어린이</InfoText>
                                <CheckBoxBody>
                                    <CheckBox className = "checkbox1" type = "checkbox" value = "1" onClick = { () => TickCheck('1', 'child') }/><InfoText>1</InfoText>&nbsp;
                                    <CheckBox className = "checkbox1" type = "checkbox" value = "2" onClick = { () => TickCheck('2', 'child') }/><InfoText>2</InfoText>&nbsp;
                                    <CheckBox className = "checkbox1" type = "checkbox" value = "3" onClick = { () => TickCheck('3', 'child') }/><InfoText>3</InfoText>&nbsp;
                                    <CheckBox className = "checkbox1" type = "checkbox" value = "4" onClick = { () => TickCheck('4', 'child') }/><InfoText>4</InfoText>&nbsp;
                                    <CheckBox className = "checkbox1" type = "checkbox" value = "5" onClick = { () => TickCheck('5', 'child') }/><InfoText>5</InfoText>&nbsp;
                                </CheckBoxBody>
                            </InfoBody>
                            <InfoBody>
                                <InfoText>청소년</InfoText>
                                <CheckBoxBody>
                                    <CheckBox className = "checkbox2" type = "checkbox" value = "1" onClick = { () => TickCheck('1', 'teenager') }/><InfoText>1</InfoText>&nbsp;
                                    <CheckBox className = "checkbox2" type = "checkbox" value = "2" onClick = { () => TickCheck('2', 'teenager') }/><InfoText>2</InfoText>&nbsp;
                                    <CheckBox className = "checkbox2" type = "checkbox" value = "3" onClick = { () => TickCheck('3', 'teenager') }/><InfoText>3</InfoText>&nbsp;
                                    <CheckBox className = "checkbox2" type = "checkbox" value = "4" onClick = { () => TickCheck('4', 'teenager') }/><InfoText>4</InfoText>&nbsp;
                                    <CheckBox className = "checkbox2" type = "checkbox" value = "5" onClick = { () => TickCheck('5', 'teenager') }/><InfoText>5</InfoText>&nbsp;
                                </CheckBoxBody>
                            </InfoBody>
                            <InfoBody>
                                <InfoText>일반</InfoText>
                                <CheckBoxBody>
                                    <CheckBox className = "checkbox3" type = "checkbox" value = "1" onClick = { () => TickCheck('1', 'adult') }/><InfoText>1</InfoText>&nbsp;
                                    <CheckBox className = "checkbox3" type = "checkbox" value = "2" onClick = { () => TickCheck('2', 'adult') }/><InfoText>2</InfoText>&nbsp;
                                    <CheckBox className = "checkbox3" type = "checkbox" value = "3" onClick = { () => TickCheck('3', 'adult') }/><InfoText>3</InfoText>&nbsp;
                                    <CheckBox className = "checkbox3" type = "checkbox" value = "4" onClick = { () => TickCheck('4', 'adult') }/><InfoText>4</InfoText>&nbsp;
                                    <CheckBox className = "checkbox3" type = "checkbox" value = "5" onClick = { () => TickCheck('5', 'adult') }/><InfoText>5</InfoText>&nbsp;
                                </CheckBoxBody>
                            </InfoBody>
                            <hr/>
                            <InfoBody>
                                <InfoBox disable = "true"/><InfoText info = "true">선택 불가</InfoText>
                            </InfoBody>
                            <InfoBody>
                                <InfoBox disable = "false"/><InfoText info = "true">예매 가능</InfoText>
                            </InfoBody>
                            <InfoBody>
                                <InfoBox/><InfoText info = "true">선택</InfoText>
                            </InfoBody>
                        </Info>
                        <Button>결제하기</Button>
                    </ReserveMain>
                </Modalbody>
            </React.Fragment>
            : ""
            }
        </React.Fragment>
    )
}

const TickCheck = (check, age) => {
    var checkbox1 = document.querySelectorAll(".checkbox1");
    var checkbox2 = document.querySelectorAll(".checkbox2");
    var checkbox3 = document.querySelectorAll(".checkbox3");

    var selectSeats = document.querySelectorAll(".seatlist");
    state.seatCnt = 0;
    state.ageCheck = age;

    if(state.ticketAge === false) {
        state.ticketNum = 0;
    }

    state.ticketNum = parseInt(state.ticketNum);

    for(var i = 0; i < selectSeats.length; i++) {
        selectSeats[i].style.backgroundColor = 'transparent';
        selectSeats[i].style.color = '#666';
    }
    if(age === 'child') {
        state.ticketAge = true;
        if(checkbox1[0].checked === false &&
            checkbox1[1].checked === false &&
            checkbox1[2].checked === false &&
            checkbox1[3].checked === false &&
            checkbox1[4].checked === false ) {
                state.selectSeat = false;
                state.ticketAge = false;
                for(var i = 0; i < checkbox2.length; i++) {
                    checkbox2[i].checked = false;
                }
                for(var i = 0; i < checkbox3.length; i++) {
                    checkbox3[i].checked = false;
                }
        } else {
            for(var i = 0; i < checkbox1.length; i++) {
                if(checkbox1[i].value != check) {
                    checkbox1[i].checked = false;
                }
            }
            state.selectSeat = true;
            check = parseInt(check);
            state.ticketNum = state.ticketNum + check;
        }
    } else if(age === 'teenager') {
        state.ticketAge = true;
        if(checkbox2[0].checked === false &&
            checkbox2[1].checked === false &&
            checkbox2[2].checked === false &&
            checkbox2[3].checked === false &&
            checkbox2[4].checked === false ) {
                state.selectSeat = false;
                state.ticketAge = false;
                for(var i = 0; i < checkbox1.length; i++) {
                    checkbox1[i].checked = false;
                }
                for(var i = 0; i < checkbox3.length; i++) {
                    checkbox3[i].checked = false;
                }
        } else {
            for(var i = 0; i < checkbox2.length; i++) {
                if(checkbox2[i].value != check) {
                    checkbox2[i].checked = false;
                }
            }
            state.selectSeat = true;
            check = parseInt(check);
            state.ticketNum = state.ticketNum + check;
        }
    } else {
        state.ticketAge = true;
        if(checkbox3[0].checked === false &&
            checkbox3[1].checked === false &&
            checkbox3[2].checked === false &&
            checkbox3[3].checked === false &&
            checkbox3[4].checked === false ) {
                state.selectSeat = false;
                state.ticketAge = false;
                for(var i = 0; i < checkbox1.length; i++) {
                    checkbox1[i].checked = false;
                }
                for(var i = 0; i < checkbox2.length; i++) {
                    checkbox2[i].checked = false;
                }
        } else {
            for(var i = 0; i < checkbox3.length; i++) {
                if(checkbox3[i].value != check) {
                    checkbox3[i].checked = false;
                }
            }
            state.selectSeat = true;
            check = parseInt(check);
            state.ticketNum = state.ticketNum + check;
        }
    }
    
    console.log(state.ticketNum);
}

const selectSeat = (parent, index) => {
    var selectParents = document.querySelectorAll(".seatParent");
    var selectSeats = selectParents[parent].querySelectorAll(".seatlist");
    state.ticketNum = parseInt(state.ticketNum);
    console.log(state.seatCnt);

    if(state.selectSeat === true) {
        for(var i = 0; i < selectSeats.length; i++) {
            if(index === i) {
                if(selectSeats[index].style.backgroundColor === 'rgb(51, 51, 51)') {
                    selectSeats[index].style.backgroundColor = 'transparent';
                    selectSeats[index].style.color = '#666';
                    state.seatCnt--;
                } else {
                    if(state.seatCnt != state.ticketNum) {
                        selectSeats[index].style.backgroundColor = '#333';
                        selectSeats[index].style.color = 'white';
                    }
                    state.seatCnt++;
                }
                if(state.ticketNum < state.seatCnt) {
                    alert("더이상 고를 수 없습니다.");
                    state.seatCnt--;
                    state.selectSeat = false;
                }
            }
        }
    } else if(state.selectSeat === false && state.ticketNum === state.seatCnt && (state.ticketNum && state.seatCnt != 0)) {
        alert("더이상 고를 수 없습니다.");
    } else {
        alert("티켓 매수를 먼저 체크해주세요.");
    }
}

export default ReservePop;