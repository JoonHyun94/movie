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
    margin-bottom: 2vw;
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
    margin-top: 6vw;
    margin-right: 7vw;
    text-align: justify;
    font-size: 1.2vw;
    line-height: 2vw;
`
const InfoBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2vw;
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
const InfoText = styled.div`
    margin-left: 0.5vw;
    font-size: 0.8vw;
`
const Title = styled.div`
    margin-top: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return '2vw';
                default : 
                    return '0';
            }
        }
    };
    margin-bottom: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return '0';
                default : 
                    return '5vw';
            }
        }
    };
    margin-left: 7vw;
    width: 100%;
    text-align: justify;
    font-size: ${ 
        props => {
            switch(props.small) {
                case 'true' :
                    return '0.9vw';
                default : 
                    return '1.5vw';
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
const Seat = styled.div`
    position: relative;
    width: 40vw;
    height: 50vh;
    margin: 0 auto;
    margin-left: 8vw;
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
    align-items: center;
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
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K', 'L', 'M', 'N', 'O', 'P']
}

const selectSeat = (parent, index) => {
    // var selectSeats = document.querySelectorAll(".seatlist").parent.parent;

    // console.log(selectSeats);
    // for(var i = 0; i < selectSeats.length; i++) {
    //     if(i === index) {
    //         selectSeats[index].style.backgroundColor = '#333';
    //         selectSeats[index].style.color = 'white';
    //     } else {
    //         selectSeats[i].style.backgroundColor = 'transparent';
    //         selectSeats[i].style.color = '#666';
    //     }
    // }
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
            `

            state.count = 1;
            state.api = 1;
        }

        if(state.api === 1) {

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
                    if(i > 59) {
                        state.timeCheck += 1;
                        state.endTime -= i;
                    }
                }
                state.timeCnt = 1;
            }

            if(state.timeCnt === 1) {
                if(state.subtimeCheck + state.endTime > 59) {
                    state.timeCheck += 1;
                    state.subtimeCheck = (state.subtimeCheck + state.endTime) - 60;
                    console.log(state.subtimeCheck);
                    state.timeCnt = 2;
                }
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
    }

    return(
        <React.Fragment>
            { modalOpen === true ?
            <React.Fragment>
                <ModalOverlay/>
                <Modalbody id = "modal">
                    <CloseModal onClick = { modalClose }/>
                    <ReserveMain>
                        <Seat>
                            <Screen>Screen</Screen>
                            { state.count === 1 ?
                                <React.Fragment>
                                    { Seats.map((s, index) => {
                                        return <Seat_pt key = { index }>
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
                                                                <Seat_div className = "seatlist" onClick = { () => selectSeat(index, j)}>
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
                                                                        <Seat_div className = "seatlist" onClick = { () => selectSeat(index, j)}>
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
                                                                <Aisle>
                                                                    { state.inc = state.inc - 1 }
                                                                </Aisle>
                                                                :
                                                                <React.Fragment>
                                                                    { index === Seats.length - 1 ?
                                                                        <CheckSeat></CheckSeat>
                                                                        : 
                                                                        <Aisle>
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
                            <InfoBody>
                                <InfoBox disable = "true"/><InfoText>선택 불가</InfoText>
                            </InfoBody>
                            <InfoBody>
                                <InfoBox disable = "false"/><InfoText>예매 가능</InfoText>
                            </InfoBody>
                            <InfoBody>
                                <InfoBox/><InfoText>선택</InfoText>
                            </InfoBody>
                        </Info>
                        <Title small = 'true'>지역: { popData[1] }&emsp;극장: { popData[2] }&emsp;&emsp;{ popData[10] }</Title>
                        <Title>
                            { popData[6] }&emsp;&emsp;
                            { popData[4].substring(0, 4) + "." + popData[4].substring(4, 6) + "." + popData[4].substring(6, 8) + "(" + popData[3] + ")"}&emsp;&emsp;
                            { popData[7].substring(0, 2) + " : " + popData[7].substring(2, 4) + " ~ " }
                            { state.endTime.substring(0, 2) + " : " + state.endTime.substring(2, 4)  }
                        </Title>
                    </ReserveMain>
                </Modalbody>
            </React.Fragment>
            : ""
            }
        </React.Fragment>
    )
}

export default ReservePop;