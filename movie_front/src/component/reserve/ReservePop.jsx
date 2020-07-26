import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled, { keyframes } from 'styled-components';
import { generateMedia } from 'styled-media-query';

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
var Projectbody = styled.div`
`

const ReserveMain = styled.div`
    content: '';
    width: 100%;
    height: 100vh;
    background-color: ivory;
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
    margin-bottom: 1vw;
    border: 1px solid red;
    width: 5%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
var Aisle = styled.div`
    background-color: transparent !important;
    width: 5%;
`

//좌석정보 초기값(0 : 통로, 1 : 예약가능 좌석, 2 : 예약완료 좌석) 
var Seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

var state = {
    count: 0,
    inc: 1,
}

const getApi = () => {
    axios.get('http://localhost:8088/reservePop') 
        .then(res => {
            console.log(res.data[0]);
        })
        .catch(res => console.log(res))
        console.log(this.apiResult);
}


const ReservePop = ({ modalOpen, modalClose }) => {

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
        Projectbody = styled.div`
            position: fixed;
            z-index: 10;
            overflow: scroll;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            height: 90%;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
            animation: ${ widthTransition } 0.3s;
        `

        state.count = 1;
    }

    return(
        <React.Fragment>
            { modalOpen === true ?
            <React.Fragment>
                <ModalOverlay onClick = { modalClose }/>
                <Projectbody id = "modal">
                    <ReserveMain>
                        <Seat>
                            <Screen>Screen</Screen>
                            { state.count === 1 ?
                                <React.Fragment>
                                    { Seats.map(s => {
                                        return <Seat_pt>
                                            {s.map(i => {
                                                return <React.Fragment>
                                                    { i === 1 ?
                                                        <Seat_div>{ i }</Seat_div>
                                                        : <Aisle></Aisle>
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
                </Projectbody>
            </React.Fragment>
            : ""
            }
        </React.Fragment>
    )
}

export default ReservePop;