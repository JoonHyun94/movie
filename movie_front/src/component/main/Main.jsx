import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';
import cgv_main from '../../image/cgv_main.jpg';
import cgv_logo from '../../image/cgv_logo.png';
import name from '../../image/name.png';
import id from '../../image/id.png';
import pw from '../../image/pw.png';
import phone from '../../image/phone.png';
import email from '../../image/email.png';

// 반응형 웹
const customMedia = generateMedia({
    maxmobile: '575px',
    minmobile: '352px',
});
const Column = styled.div`
    flex-direction: column;
`
const Row = styled.div`
    flex-direction: row;
`

const MainBack = styled.div`
    content: '';
    background-image: url(${ cgv_main });
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    position: relative;
    width: 100%;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    &:before {
        content: "";
        background: inherit;
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 100%;
        max-width: 100%;
        height: 100vh;
        filter: brightness(60%);
      }
`
const Login = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    width: 50%;
    height: 65%;
    // background-color: #F9F5EA;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    @media only screen and (max-width: 1100px) {
        width: 60%;
    }
    @media only screen and (orientation: portrait) {
        @media only screen and (max-width: 900px) {
            width: 70%;
        }
        @media only screen and (max-width: 600px) {
            width: 80%;
        }
        @media only screen and (max-height: 850px) {
            @media only screen and (max-width: 500px) {
                justify-content: center;
                flex-direction: column;
                width: 90%;
                height: 90%;
            }
        }
        @media only screen and (max-width: 430px) {
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 80%;
        }
    }
`
const Scroll_body = styled.div`
    width: 50%;
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    align-items: center;
`
const Scroll_child = styled.div`
    display: flex;
    flex-direction: row;
`
const Movie = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    flex-shrink: 0;
`
const Movieimg = styled.img`
    width: 100%;
    height: auto;
`
const Loginform = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F9F5EA;
    width: 50%;
    height: 100%;
`
const Form = styled.form`
    width: 100%;
`
const Title = styled.div`
    flex-direction: row;
    width: 50%;
    margin-top: 2vw;
    margin-bottom: 3vw;
`
const Logo = styled.img`
    width: 50%;
`
const Span = styled.span`
    font-weight: bold;
    font-size: 1.3vw;
    vertical-align: bottom;
    margin-top: ${ 
        props => {
            switch(props.user) {
                case 'true' :
                    return '5vw';
            }
        }
    };
    margin-bottom: ${ 
        props => {
            switch(props.user) {
                case 'true' :
                    return '5vw';
            }
        }
    };
`
const Inputdiv = styled.div`
    margin: 0 auto;
    width: ${ 
        props => {
            switch(props.label) {
                case 'true' :
                    return '100%';
            }
            switch(props.dplct) {
                case 'true' :
                    return '80%';
                default :
                    return '100%';
            }
        }
    };
    margin-top: ${ 
        props => {
            switch(props.sign) {
                case 'false' :
                    return '2vw';
                case 'true' :
                    return '1vw';
            }
        }
    };
    flex-direction: row;
`
const Logintext = styled.input`
    width: ${ 
        props => {
            switch(props.label) {
                case 'true' :
                    return '30%';
                default : 
                    return '70%';
            }
        }
    };
    border: none;
    border-bottom: 1px solid black;
    border-width: 0.1vw;
    outline: none;
    background-color: transparent;
    font-size: 1vw;
    vertical-align: bottom;
    autocomplete: off;
`
const Loginimg = styled.img`
    width: 5%;
`
const Label = styled.label`
    width: 30%;
    left: 50;
    font-size: 1vw;
`
const Buttondiv = styled.div`
    margin-top: 3vw;
    width: 100%;
    flex-direction: column;
    @media only screen and (orientation: portrait) {
        @media only screen and (max-height: 850px) {
            @media only screen and (max-width: 500px) {
                margin-top: ${ 
                    props => {
                        switch(props.sign) {
                            case 'true' :
                                return '1vw';
                            default : 
                                return '5vw';
                        }
                    }
                };
            }
        }
    }
`
const Button = styled.button`
    cursor: pointer;
    margin-top: 1vw;
    width: 55%;
    height: auto;
    border: none;
    border-radius: 8px;
    padding: 0.7vw;
    background-color: #F5DA81;
    white-space: pre;
    font-family: JejuGothic, NanumGothic;
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
    @media only screen and (max-width: 1100px) {
        margin-top: 2vw;
        font-size: 1.5vw;
    }
    @media only screen and (orientation: portrait) {
        @media only screen and (max-width: 900px) {
            margin-top: 2vw;
        }
        @media only screen and (max-width: 750px) {
            font-size: 1.5vw;
        }
        @media only screen and (max-width: 600px) {
            margin-top: 3vw;
            font-size: 1.7vw;
        }
        @media only screen and (max-height: 850px) {
            @media only screen and (max-width: 500px) {
                margin-top: 2vw;
                font-size: 1.5vw;
            }
        }
    }
`
const Dplctcheck = styled(Button)`
    width: 20%;
    margin-top: 0;
    margin-left: 0.7vw;
    font-size: 0.6vw;
    padding: 0.5vw;
    @media only screen and (max-width: 1100px) {
        margin-top: 0;
        margin-left: 0.7vw;
        font-size: 0.5vw;
    }
    @media only screen and (orientation: portrait) {
        @media only screen and (max-width: 750px) {
            margin-top: 0;
            margin-left: 1vw;
            font-size: 1vw;
        }
        @media only screen and (max-width: 600px) {
            margin-top: 0;
            margin-left: 1vw;
            padding: 0.7vw;
            font-size: 1.2vw;
        }
        @media only screen and (max-height: 850px) {
            @media only screen and (max-width: 500px) {
                margin-top: 0;
                margin-left: 1.5vw;
                padding: 0.7vw;
                font-size: 0.5vw;
            }
        }
    }
`
const LoginDplct = styled(Button)`
    width: 25%;
`

class Main extends Component {
    state = {
        apiResult : [],
        mainTag: null,
        loginTag: null,
        user: null,
        id: null,
        pw: null,
        number: null,
        email: null,
        gender: null,
        sign: false,
        dplctCheck: false,
        login: false,
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        movieHeight: 0,
        loginHeight: 0,
        prevMovieHeight: 0,
        prevLoginHeight: 0
    }

    getApi = () => {
        axios.get('http://localhost:8088/main') 
            .then(res => {
                const movieList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    res.data.forEach(el => { // 결과 수 만큼 반복
                        movieList.push({ // movieList에 결과의 원하는 부분을 저장
                            img: el.img,
                        })
                    })
                }
                 this.setState({
                    apiResult: movieList, // state에 저장
                    nullCheck: 1
                });
                this.slideShow(); // movie slide
            }) 
            .catch(res => console.log(res))
    }

    slideShow = () => {
        const target = document.querySelector(".slide");
        const len = target.children.length;
        const width = document.querySelector(".slidebody")
        var curIndex = 0;

        console.log(len);
        setInterval (() => {
            target.style.transition = "0.2s";
            target.style.transform = "translate3d(-" + width.offsetWidth * (curIndex + 1) + "px, 0px, 0px)";

            curIndex++;

            if(curIndex === len-1) {
                curIndex = -1;
            }
        }, 2000);

        this.loginWidth(); // login width 조정
    }

    loginWidth = () => {
        this.state.prevMovieHeight = document.querySelector(".slidebody").offsetHeight;
        this.state.prevLoginHeight = document.querySelector(".login").offsetHeight;
        this.state.loginTag = document.querySelector(".loginform");
        this.state.loginTag.style.height = (this.state.prevMovieHeight / window.innerHeight) * 100 + "vh";
    }

    componentDidMount() {
        this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
        this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
        this.state.mainTag = document.querySelector("[id = 'Main_Back']");
        this.state.mainTag.style.height = this.state.newHeight + "vh";
        
        this.getApi();
        setInterval(this.onHeight, 10);
    };

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.prevHeaderHeight != this.state.headerHeight) {
            this.setState({ 
                prevHeaderHeight: this.state.headerHeight
            });

            this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.state.mainTag = document.querySelector("[id = 'Main_Back']");
            this.state.mainTag.style.height = this.state.newHeight + "vh";
        }

        if(this.state.prevMovieHeight != this.state.movieHeight) {
            this.setState({ 
                prevMovieHeight: this.state.movieHeight
            });

            this.state.prevMovieHeight = document.querySelector(".slidebody").offsetHeight;
            this.state.prevLoginHeight = document.querySelector(".login").offsetHeight;
            this.state.loginTag = document.querySelector(".loginform");
            this.state.loginTag.style.height = (this.state.prevMovieHeight / window.innerHeight) * 100 + "vh";
        }

        return true;
    };

    onHeight = () => {
        const hdHeight = document.querySelector(".nav_var").offsetHeight;
        const mvHeight = document.querySelector(".slidebody").offsetHeight;
        this.setState({ 
            headerHeight: hdHeight,
            movieHeight: mvHeight
        });
    };

    maxLengthCheck = (e) => {
        this.setState({
            [e.target.user]: e.target.value,
            [e.target.id]: e.target.value,
            [e.target.pw]: e.target.value,
            [e.target.number]: e.target.value,
            [e.target.email]: e.target.value
        });

        if(e.target.name != 'email') {
            if(e.target.value.length > 11) {
                    e.target.value = e.target.value.slice(0, 11);
            }
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login (id, pw) {
        if(id === null || id.length < 1) {
            alert("아이디를 입력해주세요");
        } else if(pw === null || pw.length < 1) {
            alert("비밀번호를 입력해주세요");
        } else {
            let form = new FormData()
            form.append('id', id)
            form.append('pw', pw)

            axios.post('http://localhost:8088/login', form, { headers: { 'Content-Type': 'multipart/form-data;' }})
            .then(res => {
                if(res.data === null) {
                    alert("아이디와 비밀번호를 확인해주세요");
                } else {
                    this.setState({
                        user: res.data,
                        login: !this.state.login
                    });
                }
                console.log('response : ', res);
            });
        }
    }

    logout () {
        this.setState({
            login: !this.state.login,
            id: null,
            pw: null
        });
    }

    sign () {
        this.setState({
            sign: !this.state.sign,
            user: null,
            id: null,
            pw: null,
            number: null,
            email: null,
            gender: null
        });
    }

    nullCheck () {
        const { user, id, pw, number, email, gender } = this.state;

        if((user === null || user.length < 1) || 
            (id === null || id.length < 1) ||
            (pw === null || pw.length < 1) ||
            (number === null || number.length < 1) ||
            (email === null || email.length < 1)) {
            alert("빈칸을 채워주세요");
        } else {
            if(this.state.dplctCheck === false) {
                alert("아이디 중복체크를 해주세요.");
            } else if(isNaN(number) === true) {
                alert("휴대폰 번호를 체크해 주세요.\n숫자만 입력가능합니다.\n하이폰('-')이 포함된 경우 삭제해주세요.");
            } else if(gender === null) {
                alert("성별을 체크해 주세요.")
            } else {
                this.completeSign();
            }
        }
    }

    dplctCheck (name, value) {
        if(value === null || value.length < 1) {
            alert(name + "를 입력해주세요");
        } else {
            let form = new FormData()
            form.append('name', name)
            form.append('id', this.state.id)

            axios.post('http://localhost:8088/dplct', form, { headers: { 'Content-Type': 'multipart/form-data;' }})
            .then(res => {
                if(res.data === false) {
                    alert("해당 아이디가 존재합니다.");
                } else {
                    alert("사용가능한 아이디 입니다.");
                    this.setState({
                        dplctCheck: !this.state.dplctCheck
                    });
                }
                console.log('response : ', res);
            });
        }

    }

    completeSign () {
        let form = new FormData()
        form.append('name', this.state.user)
        form.append('id', this.state.id)
        form.append('pw', this.state.pw)
        form.append('number', this.state.number)
        form.append('email', this.state.email)
        form.append('gender', this.state.gender)

        axios.post('http://localhost:8088/sign', form, { headers: { 'Content-Type': 'multipart/form-data;' }})
            .then(res => {
                console.log('response : ', JSON.stringify(res, null, 2));
            });
            this.setState({ 
                sign: false,
                user: null,
                id: null,
                pw: null,
                number: null,
                email: null,
                gender: null
            });
            alert("회원가입 성공!")
    }

    render() {
        var { login, sign, test } = this.state;

        return (
            <MainBack id = "Main_Back">
                <Login className = "login">
                    <Scroll_body className = "slidebody">
                        <Scroll_child className = "slide">
                            { this.state.apiResult.map((el, index) => {
                                return <Movie key = { index }>
                                        <Movieimg src = { el.img }></Movieimg>
                                    </Movie>
                            })}
                        </Scroll_child>
                    </Scroll_body>
                    { login === false ?
                        <React.Fragment>
                        { sign === false ?
                            <Loginform sign = 'false' className = "loginform">
                                <Title>
                                    <Logo src = { cgv_logo }/>
                                    <Span>로그인</Span>
                                </Title>
                                <Inputdiv sign = 'false'>
                                    <Logintext name = "id" placeholder='아이디를 입력하세요' type = "text" value = { this.state.id } onChange = { this.maxLengthCheck }></Logintext>
                                    <Loginimg src = { id }/>
                                </Inputdiv>
                                <Inputdiv sign = 'false'> 
                                    <Logintext name = "pw" placeholder='비밀번호를 입력하세요' type = "password" value = { this.state.pw } onChange = { this.maxLengthCheck }></Logintext>
                                    <Loginimg src = { pw }/>
                                </Inputdiv>
                                <Buttondiv>
                                    <Button onClick = { () => this.login( this.state.id, this.state.pw ) }>로그인</Button>
                                    <Button onClick = { () => this.sign() }>회원가입</Button>
                                    <Button>ID/PW찾기</Button>
                                </Buttondiv>
                            </Loginform>
                            : 
                            <Loginform sign = 'true' className = "loginform">
                                <Title>
                                    <Logo src = { cgv_logo }/>
                                    <Span>회원가입 { test }</Span>
                                </Title>
                                <Form id = "form">
                                    <Inputdiv sign = 'true'>
                                        <Logintext name = "user" placeholder='이름을 입력하세요' type = "text" value = { this.state.user } onChange = { this.maxLengthCheck }></Logintext>
                                        <Loginimg src = { name }/>
                                    </Inputdiv>
                                    <Inputdiv dplct = "true" sign = 'true'>
                                        <Logintext name = "id" placeholder='아이디를 입력하세요' type = "text" value = { this.state.id } onChange = { this.maxLengthCheck }></Logintext>
                                        <Dplctcheck type = "button" onClick = { () => this.dplctCheck( "아이디", this.state.id ) }>중복체크</Dplctcheck>
                                    </Inputdiv>
                                    <Inputdiv sign = 'true'>
                                        <Logintext name = "pw" placeholder='비밀번호를 입력하세요' type = "password" value = { this.state.pw } onChange = { this.maxLengthCheck }></Logintext>
                                        <Loginimg src = { pw }/>
                                    </Inputdiv>
                                    <Inputdiv sign = 'true'>
                                        <Logintext name = "number" placeholder="전화번호를 입력하세요 ('-')는 포함X" type = "text" value = { this.state.number } onChange = { this.maxLengthCheck }></Logintext>
                                        <Loginimg src = { phone }/>
                                    </Inputdiv>
                                    <Inputdiv sign = 'true'>
                                        <Logintext name = "email" placeholder='e-mail을 입력하세요' type = 'email' value = { this.state.email } onChange = { this.maxLengthCheck }></Logintext>
                                        <Loginimg src = { email }/>
                                    </Inputdiv>
                                    <Inputdiv label = 'true' sign = 'true'>
                                            <Label for="male">남자
                                                <Logintext label = 'true' id = "male" type = "radio" name="gender" value = "male" onChange = { this.maxLengthCheck }/>
                                            </Label>
                                            <Label for="female">여자
                                                <Logintext label = 'true' id = "female" type = "radio" name="gender" value = "female" onChange = { this.maxLengthCheck }/>
                                            </Label>
                                    </Inputdiv>
                                    <Buttondiv sign = 'true'>
                                        <LoginDplct onClick = { () => this.sign() }>로그인</LoginDplct>&emsp;&emsp;
                                        <LoginDplct type = "button" onClick = { () => this.nullCheck() }>회원가입</LoginDplct>
                                    </Buttondiv>
                                </Form>
                            </Loginform>
                        }
                        </React.Fragment>
                        :
                        <Loginform sign = 'false' className = "loginform">
                            <Title>
                                <Logo src = { cgv_logo }/>
                                <Span>로그인</Span>
                            </Title>
                            <Span user = "true">{ this.state.user }님 환영합니다.</Span>
                            <Buttondiv>
                                <Button>MY페이지</Button>
                                <Button onClick = { () => this.logout() }>로그아웃</Button>
                            </Buttondiv>
                        </Loginform>
                    }
                </Login>
            </MainBack>
        )
    }
}

export default Main;
