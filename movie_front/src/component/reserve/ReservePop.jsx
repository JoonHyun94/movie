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
    content: '';
    width: 100%;
`
const Seat = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Screen = styled.div`
    margin: 0 auto;
    margin-bottom: 5vw;
    width: 80%;
    height: 20%;
    background-color: #78A9AD;
    border-radius: 5px;
`
const Seat_pt = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
var Seat_div = styled.div`
    display: flex;
    border: 1px solid red;
    width: 3%;
    height: 100%;
    font-size: 0.6vw;
    justify-content: center;
    align-items: center;
`
var Aisle = styled.div`
    background-color: transparent !important;
    width: 3%;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path:inset(50%);
`
const CheckSeat = styled.div`
    width: 0%;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path:inset(50%);
`

//좌석정보 초기값(0 : 통로, 1 : 예약가능 좌석, 2 : 예약완료 좌석) 
// var Seats = [
//     [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
// ];

var Seats;

var state = {
    count: 0,
    checkSeat: 0,
    inc: 1,
    api: 0,
    seat: 0,
    seatNum: 0
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
                background-color: ivory;
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
            console.log(state.seatNum);

            Seats = new Array(Math.ceil(state.seatNum / 14));
            
            for(var i = 0; i < Seats.length; i++) {
                Seats[i] = new Array(14);
                for(var j = 0; j < 14; j++) {
                    if(i === 0) {
                        if(j === 2 || j === 5 || j === 6 || j === 7 || j === 8 || j === 11) {
                            Seats[i][j] = 0;
                        } else {
                            Seats[i][j] = 1;
                        }
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
                                                        </React.Fragment>
                                                    }

                                                    { i === 1 ?
                                                        <React.Fragment>
                                                            { index === 0 ?
                                                                <Seat_div>
                                                                    { j === 0 ? (index * s.length) + 1 : ((index * s.length) + 1) + state.inc }
                                                                    <CheckSeat>
                                                                        { j === s.length - 1 ? state.checkSeat = ((index * s.length) + 1) + state.inc : "" }
                                                                    </CheckSeat>
                                                                </Seat_div>
                                                                :
                                                                <React.Fragment>
                                                                    { state.checkSeat > state.seat ?
                                                                        <Aisle></Aisle>
                                                                        :
                                                                        <Seat_div>
                                                                            { j === 0 ? state.checkSeat : state.checkSeat }
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
                                                                <Aisle>
                                                                    { state.checkSeat = state.checkSeat - 1 }
                                                                </Aisle>
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
                    </ReserveMain>
                </Modalbody>
            </React.Fragment>
            : ""
            }
        </React.Fragment>
    )
}

export default ReservePop;