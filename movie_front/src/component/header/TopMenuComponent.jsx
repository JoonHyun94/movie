import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainComponent from '../main/Main';
import ListComponent from '../main/List';
import DetailComponent from '../detail/MovieDetail';
import ReservePopComponent from '../reserve/ReservePop';
import ReserveComponent from '../reserve/Reserve';
import Payment from '../reserve/Payment';
import Mypage from '../mypage/Mypage';
import cgv_logo from '../../image/cgv_logo.png';
import cgv_header from '../../image/header.png';
import styled from 'styled-components';

const Header = styled.div`
    position: relative;
    width: 100%;
    height: 6vw;
    background-color: #F9F5EA !important;
`
const Bg_header = styled.img`
    position: absolute;
    left: 0;
    bottom: ${ 
        props => {
            switch(props.position) {
                case 'bottom' :
                    return '0';
            }
        }
    };
    background: url(${ cgv_header });
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 10%;
`
const Hr = styled.hr`
    width: 100%;
    position: absolute;
`
const Culture = styled.div`
    font-size: 2vw;
    font-weight: bold;
    text-shadow: 0px 1px #ffffff, 4px 4px 0px #DAD7D7;
`
const Logo = styled.img`
    position: absolute;
    top: 1.3vw;
    left: 1vw;
    width: 7%;
`
const Menu_frame = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
`
const MenuBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0.5vw;
`
const Menu = styled.div`
    cursor: pointer;
    display: inline-block;
    color: #666;
    margin: 1vw;
    margin-top: 0;
    margin-bottom: 0;
    font-size: ${ 
        props => {
            switch(props.user) {
                case 'true' :
                    return '1vw';
                default:
                    return '1.2vw'
            }
        }
    };
    font-weight: bold;
    white-space: nowrap;
`
const My_frame = styled.div`
    position: absolute;
    top: 50%;
    right: -2vw;
    transform: translate(-50%, -50%);
    margin: 0 auto;
`

class TopMenuComponent extends Component { 

    logout() {
        window.sessionStorage.clear();
        window.location.href = "/main";
    }

    render() { 
        return ( 
            <Router>
                <Header id = "nav_var" className="nav_var">
                    <Bg_header position = "top"></Bg_header>
                    <Logo src = { cgv_logo } href="/"></Logo>
                    <Menu_frame>
                        <Culture>CULTUREPLEX</Culture>
                        <MenuBody>
                            <a href="/main"><Menu>Main</Menu></a>
                            <a href="/list"><Menu>무비차트</Menu></a>
                        </MenuBody>
                    </Menu_frame>                        
                    { sessionStorage.length > 1 ?
                        <My_frame>
                            <a href="/mypage"><Menu user = "true">Mypage</Menu></a>
                            <Menu user = "true" login = "true" onClick = { () => this.logout()}>logout</Menu>
                        </My_frame>
                        : ""
                    }
                    <Bg_header position = "bottom"></Bg_header>
                </Header>

                <Route path="/main" component = { MainComponent }/>
                <Route path="/list" component = { ListComponent }/>
                <Route path="/detail" component = { DetailComponent }/>
                <Route path="/reserve" component = { ReserveComponent }/>
                <Route path="/reserve_pop" component = { ReservePopComponent }/>
                <Route path="/payment" component = { Payment }/>
                <Route path="/mypage" component = { Mypage }/>
            </Router>
        ) 
    } 
} 

export default TopMenuComponent;
