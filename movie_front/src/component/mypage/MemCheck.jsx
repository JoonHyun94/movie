import React from "react";
import styled, { keyframes } from 'styled-components';
import axios from "axios";

const opacityTransition = keyframes`
    from { opacity: 0; }
    to { opacity: 0.5; }
`
const widthTransition = keyframes`
    from { width: 0%; }
    to { width: 50%; }
`

const CheckOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0;
    animation: ${ opacityTransition } 0.3s forwards;
`
const Checkbody = styled.div`
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 30%;
    border-radius: 10px;
    background-color: #F9F5EA;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    animation: ${ widthTransition } 0.3s;
    @media only screen and (orientation: portrait) {
        width: 50%;
        height: 20%;
    }
`
const Title = styled.div`
    margin-top: 1vw;
    width: 100%;
    font-size: 1.5vw;
    font-weight: bold;
`
const TextBody = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1vw;
    width: 100%;
    font-size: 1vw;
`
const TextInput = styled.input`
    margin-top: 0.5vw;
    width: 70%;
    border: none;
    border-bottom: 1px solid black;
    border-width: 0.1vw;
    outline: none;
    background-color: transparent;
    font-size: 1vw;
    vertical-align: bottom;
`
const Id = styled.div`
    margin-top: 1vw;
    width: 20%;
    text-align: end;
`
const Password = styled.div`
    margin-top: 1vw;
    width: 20%;
    text-align: end;
`
const Button = styled.button`
    position: absolute;
    top: 80%;
    right: 10%;
    cursor: pointer;
    width: 15%;
    height: 2vw;
    border: none;
    border-radius: 5px;
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
        box-shadow: 230px 0 0 0 rgba(0,0,0,0.25) inset, 
                    -230px 0 0 0 rgba(0,0,0,0.25) inset;
    }
`

const state = {
    id: null,
    pw: null,
    mem: "mem",
    reserve: "reserve"
}

const textCheck = (e) => {
    if(e.target.name === "id") {
        state.id = e.target.value;
    } else if(e.target.name === "pw") {
        state.pw = e.target.value;
    }
}

const userCheck = (check, reserveResult, reserveIndex) => {
    let form = new FormData()
    form.append('id', state.id);
    form.append('pw', state.pw);

    axios.post('http://localhost:8088/memberCheck', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
    .then(res => {
        console.log(res.data);
        if(res.data === true) {
            if(check === "mem") {
                var msg = "회원 탈퇴를 계속 진행하시겠습니까?";
                if(window.confirm(msg) != 0) {
                    let formMember = new FormData()

                    formMember.append('id', state.id);
                    formMember.append('pw', state.pw);

                    axios.post('http://localhost:8088/removeMember', formMember, { headers: { 'Content-Type': 'multipart/form-data;' }})
                    .then(res => {
                        window.sessionStorage.clear();
                        alert("회원탈퇴가 성공적으로 진행되었습니다.")
                        window.location.href="/main";
                    })
                    .catch(res => console.log(res))
                } else {
                    alert("마이페이지로 다시 돌아갑니다.")
                    window.location.href="/mypage";
                }
            } else if(check === "reserve") {
                var msg = "예매 취소를 계속 진행하시겠습니까?";
                if(window.confirm(msg) != 0) {
                    let formReserve = new FormData()
                
                    for(var i = 0; i < reserveResult.length; i++) {
                        if(reserveIndex === i) {
                            formReserve.append('id', reserveResult[i].id);
                            formReserve.append('area', reserveResult[i].area);
                            formReserve.append('theater', reserveResult[i].theater);
                            formReserve.append('day',reserveResult[i].day);
                            formReserve.append('reserve_time', reserveResult[i].reserve_time);
                            formReserve.append('ticket_number', reserveResult[i].ticket_number);
                            formReserve.append('ticket_price', reserveResult[i].ticket_price);
                            formReserve.append('title', reserveResult[i].title);
                            formReserve.append('time', reserveResult[i].start_time);
                        }
                    }
        
                    axios.post('http://localhost:8088/removeReserve', formReserve, { headers: { 'Content-Type': 'multipart/form-data;' }})
                    .then(res => {
                        alert("해당 예매내역이 취소 되었습니다.")
                        window.location.href="/mypage";
                    })
                    .catch(res => console.log(res))
                } else {
                    alert("마이페이지로 다시 돌아갑니다.")
                    window.location.href="/mypage";
                }
            }
        } else if(res.data === false) {
            alert("회원정보가 일치하지 않습니다. 다시 확인해 주세요.")
        }
    })
    .catch(res => console.log(res))
}

const MemCheck = ({ member, reserve, MemCheckClose, reserveResult, reserveIndex }) => {
    return(
        <React.Fragment>
            { member === true && reserve === false ?
            <React.Fragment>
                <CheckOverlay onClick = { MemCheckClose }/>
                <Checkbody>
                    <Title>회원정보 확인을 위해 정보를 입력해주세요</Title>
                    <TextBody>
                        <Id>아이디 : &nbsp;</Id>
                        <TextInput name = "id" type = "text" onChange = { (e) => textCheck(e) }/>
                    </TextBody>
                    <TextBody>
                        <Password>비밀번호 : &nbsp;</Password>
                        <TextInput name = "pw" type = "password" onChange = { (e) => textCheck(e) }/>
                    </TextBody>
                    <Button onClick = { () => userCheck(state.mem, reserveResult, reserveIndex) }>회원 탈퇴</Button>
                </Checkbody>
            </React.Fragment>
            : ""
            }
            { member === false && reserve === true ?
            <React.Fragment>
                <CheckOverlay onClick = { MemCheckClose }/>
                <Checkbody>
                    <Title>회원정보 확인을 위해 정보를 입력해주세요</Title>
                    <TextBody>
                        <Id>아이디 : &nbsp;</Id>
                        <TextInput name = "id" type = "text" onChange = { (e) => textCheck(e) }/>
                    </TextBody>
                    <TextBody>
                        <Password>비밀번호 : &nbsp;</Password>
                        <TextInput name = "pw" type = "password" onChange = { (e) => textCheck(e) }/>
                    </TextBody>
                    <Button onClick = { () => userCheck(state.reserve, reserveResult, reserveIndex) }>예매 취소</Button>
                </Checkbody>
            </React.Fragment>
            : ""
            }
        </React.Fragment>
    )
}

export default MemCheck;