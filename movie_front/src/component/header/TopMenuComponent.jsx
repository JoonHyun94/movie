import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainComponent from '../main/Main';
import ListComponent from '../main/List';
import ReservePopComponent from '../reserve/ReservePop';
import ReserveComponent from '../reserve/Reserve';
import Payment from '../reserve/Payment';
import cgv_logo from '../../image/cgv_logo.png';
import cgv_header from '../../image/header.png';
import styled from 'styled-components';

const Header = styled.div`
    position: relative;
    width: 100%;
    height: 6vw;
    background-color: ivory !important;
`
const Bg_header = styled.img`
    position: absolute;
    left: 0;
    bottom:  ${ 
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
    position: absolute;
    margin: 0;
    margin-top: 1.2vw;
    width: 99.8%;
    border: 0.1px solid black;
    filter: opacity(0.3);
`
const Logo = styled.img`
    position: absolute;
    top: 1.3vw;
    left: 1vw;
    width: 7%;
`
const Menu_frame = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
`
const Menu = styled.div`
    display: inline-block;
    color: #666;
    margin-right: 1vw;
    font-size: 1.5vw;
    font-weight: bold;
    line-height: 6vw;
    white-space: nowrap;
`

class TopMenuComponent extends Component { 

    logout() {
        window.sessionStorage.clear();
        window.location.reload();
        this.reload();
    }

    render() { 
        return ( 
            <Router>
                { window.location.href === window.location.protocol + "//" + window.location.host + "/kakaopay" ?
                ""
                :    
                <Header id = "nav_var" className="nav_var">
                    <Bg_header position = "top"></Bg_header>
                    <Logo src = { cgv_logo } href="/"></Logo>
                    <Hr></Hr><br></br>
                    <Hr></Hr><br></br>
                    <Hr></Hr><br></br>
                    <Menu_frame>
                        <a href="/main"><Menu>Main</Menu></a>
                        <a href="/list"><Menu>무비차트</Menu></a>
                        { sessionStorage.length > 1 ?
                            <Menu login = "true" onClick = { () => this.logout()}>logout</Menu>
                            : ""
                        }
                    </Menu_frame>
                    <Bg_header position = "bottom"></Bg_header>
                </Header>
                }
                <Route path="/main" component = { MainComponent }/>
                <Route path="/list" component = { ListComponent }/>
                <Route path="/reserve" component = { ReserveComponent }/>
                <Route path="/reserve_pop" component = { ReservePopComponent }/>
                <Route path="/payment" component = { Payment }/>
            </Router>
        ) 
    } 
} 

export default TopMenuComponent;
