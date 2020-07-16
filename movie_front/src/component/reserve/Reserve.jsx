import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';

const ReserveMain = styled.div`
    content: '';
    width: 100%;
    height: 100vh;
    background-color: #E0DFDE;
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
var Seat_div2 = styled.div`
    background-color: transparent !important;
    width: 5%;
    height: 5%;
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

class Reserve extends Component {
    state = {
        inc: 1,
    }

    render() {
        return(
            <ReserveMain>
                <Seat>
                    <Screen>Screen</Screen>
                    { Seats.map(s => {
                        return <Seat_pt>
                            {s.map(i => {
                                return <React.Fragment>
                                    { i === 1 ?
                                        <Seat_div>{ this.state.inc++ }</Seat_div>
                                        : <Seat_div2></Seat_div2>
                                    }
                                    </React.Fragment>
                            })}
                        </Seat_pt>
                    })}
                </Seat>
            </ReserveMain>
        )
    }
}

export default Reserve;