import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ListComponent from '../main/List' 
import cgv_logo from '../../image/cgv_logo.png';
import styled from 'styled-components';

const Logo = styled.img`
    position: absolute;
    width: 10%;
`
const Menu_frame = styled.div`
    margin: 0 auto;
`
const Menu = styled.div`
    display: inline-block;
    color: white;
    padding-top: 2vw;
    padding-bottom: 2vw;
    margin-right: 1vw;
    font-size: 1.5vw;
    line-height: inherit;
    white-space: nowrap;
`
class TopMenuComponent extends Component { 
    render() { 
        return ( 
            <Router> 
                <Navbar bg="dark" variant="dark" className="mb-4" > 
                    <Logo src = { cgv_logo } href="/"></Logo>
                    <Menu_frame>
                        <Menu href="/"> Home </Menu> 
                        <Menu href="/list"> 무비차트 </Menu>
                    </Menu_frame>
                </Navbar> 
                <Route path="/list" component={ ListComponent } /> 
            </Router>
        ) 
    } 
} 

export default TopMenuComponent;
