import React from 'react';
import styled from 'styled-components';
import axios from "axios";

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

var state = {
    id: null,
    buyer: null,
    buyerTell: 0,
    buyerEmail: null,
    idCheck: false,
    area: null,
    theater: null,
    time: null,
    week: null,
    day: null,
    title: null,
    price: 0
}

const paymentMovie = () => {
    let form = new FormData()

    form.append('id', state.id)
    form.append('area', state.area)
    form.append('theater', state.theater)
    form.append('time', state.time)
    form.append('week', state.week)
    form.append('day', state.day)
    form.append('title', state.title)

    axios.post('http://localhost:8088/setReserve', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
    .then(res => {
        console.log(res.data);
    })
    .catch(res => console.log(res))
}

const Payment = ({ payOpen, payClose, area, theater, time, week, day, title, price }) => {
    if(payOpen === true) {
        state.price = price;
        
        if(state.idCheck === false) {
            state.id = window.sessionStorage.getItem("id");
            state.area = area;
            state.theater = theater;
            state.time = time;
            state.week = week;
            state.day = day;
            state.title = title;
            
            console.log("price : " + price)
            let form = new FormData()
            form.append('id', window.sessionStorage.getItem("id"))
        
            axios.post('http://localhost:8088/getReserveMember', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
                .then(res => {
                    console.log(res.data);
                    state.buyer = res.data.name;
                    state.buyerTell = res.data.phone_Number;
                    state.buyerEmail = res.data.email;
                    
                    state.idCheck = true;
                    onClickPayment();
                })
                .catch(res => console.log(res))
        }
    }

    const onClickPayment = () => {
        if(state.idCheck === true) {
            /* 1. 가맹점 식별하기 */
            const { IMP } = window;
            IMP.init('imp56823805');

            /* 2. 결제 데이터 정의하기 */
            const data = {
                pg: 'html5_inicis',                           // PG사
                pay_method: 'card',                           // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
                amount: state.price,                           // 결제금액
                name: title + "결제",                           // 주문명
                buyer_name: state.buyer,                           // 구매자 이름
                buyer_tel: state.buyerTell,                     // 구매자 전화번호
                buyer_email: state.buyerEmail               // 구매자 이메일
            };

            /* 4. 결제 창 호출하기 */
            IMP.request_pay(data, callback);
        }
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        const {
            success,
            error_msg,
        } = response;

        if (success) {
            state.idCheck = false;
            paymentMovie();
            alert('결제 성공');
        } else {
            state.idCheck = false;
            alert(`결제 실패: ${ error_msg }`);
        }
    }

    return (
        <React.Fragment>
            { payOpen === true ?
                <React.Fragment ></React.Fragment>
                : ""
            }
            {/* <Button onClick={ onClickPayment }>결제하기</Button> */}
        </React.Fragment>
    )
}

export default Payment;