import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainComponent from '../main/Main';
import ListComponent from '../main/List';
import ReservePopComponent from '../reserve/ReservePop';
import ReserveComponent from '../reserve/Reserve';
import cgv_logo from '../../image/cgv_logo.png';
import styled from 'styled-components';

const Logo = styled.img`
    position: absolute;
    width: 7%;
`
const Menu_frame = styled.div`
    margin: 0 auto;
`
const Menu = styled.div`
    display: inline-block;
    color: white;
    padding-top: 1vw;
    padding-bottom: 1vw;
    margin-right: 1vw;
    font-size: 1.2vw;
    line-height: inherit;
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
                { window.location.href === window.location.protocol + "//" + window.location.host + "/reserve_pop" ?
                ""
                :    
                <Navbar id = "nav_var" bg="dark" variant="dark" className="nav_var" > 
                    <Logo src = { cgv_logo } href="/"></Logo>
                    <Menu_frame>
                        <a href="/main"><Menu>Home</Menu></a>
                        <a href="/list"><Menu>무비차트</Menu></a>
                        { sessionStorage.length > 1 ?
                            <Menu login = "true" onClick = { () => this.logout()}>logout</Menu>
                            : ""
                        }
                    </Menu_frame>
                </Navbar>
                }
                <Route path="/main" component = { MainComponent }/>
                <Route path="/list" component = { ListComponent }/>
                <Route path="/reserve" component = { ReserveComponent }/>
                <Route path="/reserve_pop" component = { ReservePopComponent }/>
            </Router>
        ) 
    } 
} 

export default TopMenuComponent;
