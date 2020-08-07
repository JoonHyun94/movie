import React, {Component} from "react";
import styled, { keyframes } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
import axios from "axios";
import cgv_main from '../../image/cgv_main.jpg';
import vintageconcrete from "../../image/vintage_concrete.png";
import barcodeimg from "../../image/barcode.png";
import expansion from "../../image/expansion.png";
import user from "../../image/user.png";
import finger from "../../image/finger.png";
import BarcodePop from "../mypage/BarcodePop";
import MemCheck from "../mypage/MemCheck";

const type = keyframes`
    from { margin-left: -150%; }
    to { margin-left: 120%; }
`
const click = keyframes`
    from { top: 0; }
    to { top: -0.5vw; }
`

const Mainloading = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform:translateX(-50%);
    text-align: center;
`
const Loadingtext = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 40%;
    left: 50%;
    transform:translateX(-50%);
`
const Loadingmypage = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 70%;
    left: 50%;
    transform:translateX(-50%);
`

const MypageBack = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-image: url(${ cgv_main });
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`
const MypageBody = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    height: 60vh;
    background-image: url(${ vintageconcrete });
    border-radius: 5px;
    @media only screen and (orientation: portrait) {
        width: 60%;
        height: 80vh;
    }
`
const MyBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    width: 90%;
    height: 90%;
    border: 1px solid #666;
    @media only screen and (orientation: portrait) {
        flex-wrap: none;
        flex-direction: column;
    }
`
const MyInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    height: 100%;
    position: absolute;
    background-color: transparent !important;
    left: 0;
    @media only screen and (orientation: portrait) {
        position: relative;
        width: 100%;
        height: 35%;
    }
`
const InfoBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    height: 7vw;
    margin: 0 auto;
    margin-top: 5vw;
    margin-left: 2vw;
    text-align: justify;
`
const UserImgDiv = styled.div`
    cursor: pointer;
    width: 7vw;
    height: 7vw;
    margin-left: 5vw;
    margin-top: 5vw;
    border: 1px solid #666;
    border-radius: 50%;
    overflow: hidden;
    @media only screen and (orientation: portrait) {
        width: 5vw;
        height: 5vw;
    }
`
const UserImg = styled.img`
    width: 100%;
    height: 100%;
`
const UserName = styled.div`
    margin-bottom: 1vw;
    width: 30%;
    font-size: 1.5vw;
    font-weight: bold;
`
const UserInfoText = styled.div`
    width: ${ 
        props => {
            switch(props.gender) {
                case "true" :
                    return '40%';
                default :
                    return '100%';
            }
        }
    };
    font-size: 0.8vw;
    line-height: ${ 
        props => {
            switch(props.gender) {
                case "true" :
                    return '3vw';
            }
        }
    };
`
const ReserveBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: transparent !important;
    right: 0;
    justify-content: space-between;
    align-items: center;
    @media only screen and (orientation: portrait) {
        position: relative;
        width: 100%;
        height: 65%;
    }
`
const ScrollBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-right: 3vw;
    padding-left: 1vw;
    width: 90%;
    height: 90%;
    overflow-y: scroll;
    -ms-overflow-style: none; // IE에서 스크롤바 감춤
    &::-webkit-scrollbar { 
      display: none !important; // 윈도우 크롬 등
    }
    justify-content: space-between;
    border-left: 1px solid #666;
    @media only screen and (orientation: portrait) {
        padding-left: 0;
        padding-top: 1vw;
        border-left: 0;
        border-top: 1px solid #666;
    }
`
const ReserveListBody = styled.div`
    width: 40%;
    height: max-content;
    display: flex;
    flex-direction: column;
`
const ReserveList = styled.div`
    position: relative;
    width: 100%;
    height: max-content;
    border: solid 1px #D1D1D1;
    border-radius: 5px 5px 0 0;
    background-color: #F9F5EA;
`
const ReserveTitle = styled.div`
    margin: 0 auto;
    margin-top: 2vw;
    width: 100%;
    height: 2vw;
    font-size: 0.9vw;
    line-height: 2vw;
    border-top: solid 2px #666;
    border-bottom: solid 2px #666;;
`
const ReserveGrade = styled.div`
    position: absolute;
    top: 0.5vw;
    right: 1vw;
    width: 20%;
    font-size: 0.8vw;
`
const ReserveFloor = styled.div`
    position: relative;
    margin: 0 auto;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    width: 80%;
    height: 0.7vw;
    font-size: 0.7vw;
    line-height: 0.7vw;
    overflow: hidden;
    white-space: nowrap;

`
const Floor = styled.div`
    position: absolute;
    animation: ${ type } 10s;
    animation-iteration-count: infinite;
    animation-delay: now;
`
const Seat = styled.div`
    width: 100%;
    font-size: 1vw;
    font-weight: bold;
`
const Date = styled.div`
    width: 100%;
    font-size: 0.7vw;
    font-weight: bold;
`
const ReserveDate = styled.div`
    margin-top: 0.5vw;
    width: 100%;
    font-size: 0.7vw;
`
const ReservePrice = styled.div`
    margin-top: 0.5vw;
    width: 100%;
    font-size: 0.9vw;
`
const SubTitle = styled.div`
    font-size: 0.7vw;
`
const SubBody = styled.div`
    font-weight: bold;
`
const BacodeText = styled.div`
    margin-top: 1vw;
    font-size: 1.1vw;
    font-weight: bold;
`
const Barcode = styled.img`
    width: 80%;
    height: 100%;
    margin-bottom: 0.5vw;
`
const Expansion = styled.img`
    cursor: pointer;
    position: absolute;
    bottom: 1vw;
    width: 8%;
    height: 5%;
`
const ButtonBody = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`
const Button = styled.button`
    position: relative;
    margin-bottom: 1vw;
    cursor: pointer;
    width: ${ 
        props => {
            switch(props.user) {
                case "true" :
                    return '40%';
                default :
                    return '100%';
            }
        }
    };
    left:${ 
        props => {
            switch(props.user) {
                case "true" :
                    return '30%';
            }
        }
    };
    height: 2vw;
    border: none;
    border-radius: ${ 
        props => {
            switch(props.user) {
                case "true" :
                    return '5px';
                default :
                    return '0 0 5px 5px';
            }
        }
    };
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
const Circle = styled.div`
    position: absolute; 
    width: 3vw; 
    height: 3vw; 
    border-radius: 3vw; 
    border: 1px solid #666;
    background-image: url(${ vintageconcrete });
    left: ${ 
        props => {
            switch(props.circle) {
                case "1" :
                    return '-0.5vw';
                case "3" :
                    return '-0.5vw';
            }
        }
    };
    right: ${ 
        props => {
            switch(props.circle) {
                case "2" :
                    return '-0.5vw';
                case "4" :
                    return '-0.5vw';
            }
        }
    };
    top: ${ 
        props => {
            switch(props.circle) {
                case "1" :
                    return '-0.5vw';
                case "2" :
                    return '-0.5vw';
            }
        }
    };
    bottom: ${ 
        props => {
            switch(props.circle) {
                case "3" :
                    return '-0.5vw';
                case "4" :
                    return '-0.5vw';
            }
        }
    };
    border-left-color: ${ 
        props => {
            switch(props.circle) {
                case "1" :
                    return 'transparent';
                case "3" :
                    return 'transparent';
            }
        }
    };
    border-right-color: ${ 
        props => {
            switch(props.circle) {
                case "2" :
                    return 'transparent';
                case "4" :
                    return 'transparent';
            }
        }
    };
    border-top-color: ${ 
        props => {
            switch(props.circle) {
                case "1" :
                    return 'transparent';
                case "2" :
                    return 'transparent';
            }
        }
    };
    border-bottom-color: ${ 
        props => {
            switch(props.circle) {
                case "3" :
                    return 'transparent';
                case "4" :
                    return 'transparent';
            }
        }
    };
`
const FingerBody = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    width: 30%;
    animation: ${ click } 0.4s infinite;
    animation-direction: alternate;
`
const ClickFinger = styled.img`
    width: 20%;
    margin: 1vw;
`
const ClickText = styled.div`
    width: 100%;
    font-size: 0.8vw;
`
const ImgInput = styled.input`
    display: none;
`

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2
    }
});

class Mypage extends Component { 
    state = {
        completed: 0, // 로딩 애니메이션의 초기값: 0, 0 ~ 100까지 게이지가 채워짐
        loadingText: 0, // 로딩 텍스트
        nullCheck: 0, // nullCheck
        newHeight: 0,
        headerHeight: 0,
        prevHeaderHeight: 0,
        myPageHeight: 0,
        clickTextHeight: 0,
        mainTag: null,
        reserveResult: [],
        userId: null,
        userPw: null,
        userName: null,
        userPhone: null,
        userEmail: null,
        userGender: null,
        userSignDate: null,
        userSecurity: null,
        date: new window.Date(),
        bacodeOpen: false,
        MemCheckOpen: false,
        reserveCheck: false,
        clickText: null,
        reserveIndex: 0
    }

    componentDidMount() {
        this.IntervalProgress = setInterval(this.progress, 20); // 0.02초마다 progress함수가 실행됨
        this.IntervalText = setInterval(this.loadingText, 20);

        this.getMyInfo();
    };

    
    getMyInfo = () => {
        let form = new FormData()
        form.append('id', window.sessionStorage.getItem("id"));

        axios.post('http://localhost:8088/myinfo', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
        .then(res => { 
            console.log(res.data);
            this.setState({
                userId: res.data.id,
                userPw: res.data.pw,
                userName: res.data.name,
                userPhone: res.data.phone_Number,
                userEmail: res.data.email,
                userGender: res.data.gender,
                userSignDate: res.data.sign_date,
                userSecurity: res.data.security_number,
                nullCheck: 1
            });
        })
        .catch(res => console.log(res))
    }

    getMypage = () => {
        let form = new FormData()
        form.append('id', window.sessionStorage.getItem("id"));

        axios.post('http://localhost:8088/mypage', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
            .then(res => {
                console.log(res.data);
                const reserveList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    for(var i = 0; i < res.data.length; i++) {
                        reserveList[i] = res.data[i];
                    }
                    console.log(reserveList[0]);
                }
                this.setState({
                    reserveResult: reserveList
                });
            })
            .catch(res => console.log(res))
    }

    // 애니메이션 함수
    progress = () => {
        if(this.state.nullCheck === 0) {
            const { completed } = this.state;
            // completed가 100이되면 0으로 돌아가고 아닐 시 1씩 증가
            this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
        } else {
            clearInterval(this.IntervalProgress);

            // 로딩 화면 후 메인화면 view 잡기
            this.stateprevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.statenewHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.statemainTag = document.querySelector("[id = 'Mypage_Back']");

            setInterval(this.onHeight, 10);
        }
    }

    // 로딩 텍스트
    loadingText = () => {
        if(this.state.nullCheck === 0) {
            const { loadingText } = this.state;
            this.setState({ loadingText: loadingText >= 1.0 ? 0 : loadingText + 0.01 })
        } else {
            clearInterval(this.IntervalText);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.state.clickTextHeight = 100 - ((this.state.myPageHeight) / (window.innerHeight) * 100);

        if(this.state.prevHeaderHeight != this.state.headerHeight) {
            this.setState({ 
                prevHeaderHeight: this.state.headerHeight
            });

            this.state.prevHeaderHeight = document.querySelector(".nav_var").offsetHeight;
            this.state.newHeight = 100 - ((this.state.prevHeaderHeight) / (window.innerHeight) * 100);
            this.state.mainTag = document.querySelector("[id = 'Mypage_Back']");
            this.state.mainTag.style.height = this.state.newHeight + "vh";
        }
        
        if(this.state.clickTextHeight < 39) {
            document.querySelector("[id = 'clicktext']").innerHTML = "클릭시 아래에 보여집니다.";
        } else if(40 === this.state.clickTextHeight) {
            document.querySelector("[id = 'clicktext']").innerHTML = "클릭시 오른쪽에 보여집니다.";
        }

        return true;
    };

    onHeight = () => {
        const hdHeight = document.querySelector(".nav_var").offsetHeight;
        const mypageHeight = document.querySelector("[id = 'mypagebody']").offsetHeight;
        const clickText = document.querySelector("[id = 'clicktext']");

        this.setState({ 
            headerHeight: hdHeight,
            myPageHeight: mypageHeight,
            clickTextTag: clickText
        });
    };

    openExpansion = () => {
        this.setState({
            bacodeOpen: true
        });
    }
    closeExpansion = () => {
        this.setState({ 
            bacodeOpen: false 
        });
    }
    closeMemcCheck = () => {
        this.setState({ 
            memberCheck: false,
            reserveCheck: false
        });
    }

    imgUpload = () => {
        let form = new FormData()
        form.append('img', document.querySelector("[id = 'myimg']").click());
        
        axios.post('http://localhost:8088/imgUpload', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
        .then(res => {
            console.log(res.data);
        }) 
        .catch(res => console.log(res))
    }

    removeReserve = (index) => {
        var msg = "예매를 취소할 경우 예매내역이 전부 사라집니다. 진행하시겠습니까?";
        if(window.confirm(msg) != 0) {
            this.setState({
                memberCheck: false,
                reserveCheck: true,
                reserveIndex: index
            });
        }
    }

    removeMember = () => {
        var msg = "회원탈퇴를 하실 경우 예매된 내역과 회원정보가 전부 사라집니다. 진행하시겠습니까?";
        if(window.confirm(msg) != 0) {
            this.setState({
                memberCheck: true,
                reserveCheck: false,
            });
        }
    }

    render() { 
        const { classes } = this.props;
        const { completed, nullCheck, loadingText, reserveResult, date } = this.state;

        return (
            <React.Fragment>
                { nullCheck === 0 ?
                    <React.Fragment>
                        <Mainloading>
                            <CircularProgress className = { classes.progress } variant = "determinate" value={ completed } size = {'10vw'}/>
                
                            <Motion style={{ opacity: spring(loadingText) }}>
                                    {
                                    ({ opacity }) =>  <Loadingtext style={Object.assign({}, this.Loadingtext, { opacity })}>
                                    Loading
                                    </Loadingtext>
                                    }
                            </Motion>
                        </Mainloading>
                        <Loadingmypage>유저 정보를 불러오는 중입니다.</Loadingmypage>
                    </React.Fragment>
                    :
                    <MypageBack id = "Mypage_Back">
                        <MypageBody id = "mypagebody">
                            {/* <Title>예매 현황</Title> */}
                            <MyBody>
                                <Circle circle = "1"/>
                                <Circle circle = "2"/>
                                <Circle circle = "3"/>
                                <Circle circle = "4"/>
                                <MyInfo>
                                    <UserImgDiv onClick = { () => this.imgUpload() }>
                                        <UserImg type="file" src = { user }></UserImg>
                                        <ImgInput type = "file" id = "myimg" name = "myimg"/>
                                    </UserImgDiv>
                                    <InfoBody>
                                        <UserName>{ this.state.userName }님</UserName>
                                        <UserInfoText gender = "true">
                                            성별 : { this.state.userGender === 'male' ? '남' : '여' }
                                        </UserInfoText>
                                        <UserInfoText>ID : { this.state.userId }</UserInfoText>
                                        <UserInfoText>Tel : { this.state.userPhone.substring(0, 3) + '-' + this.state.userPhone.substring(3, 7) + '-' + this.state.userPhone.substring(7, 11)}</UserInfoText>
                                        <UserInfoText>Email : { this.state.userEmail }</UserInfoText>
                                    </InfoBody>

                                    <ButtonBody>
                                        <Button user = "true" onClick = { () => this.getMypage() }>
                                            예매내역 확인
                                        </Button>
                                        <Button user = "true" onClick = { () => this.removeMember() }>
                                            회원탈퇴
                                        </Button>
                                        <FingerBody>
                                            <ClickFinger src = { finger }/>
                                            <ClickText id = "clicktext">클릭시 오른쪽에 보여집니다.</ClickText>
                                        </FingerBody>
                                    </ButtonBody>

                                </MyInfo>
                                <ReserveBody>
                                    <ScrollBody>
                                        { reserveResult.map((el, index) => {
                                            return <ReserveListBody key = { index }>
                                            <ReserveList>
                                                <ReserveGrade>{ el.grade }</ReserveGrade>
                                                <ReserveTitle>{ el.title }</ReserveTitle>
                                                <ReserveFloor>
                                                    <Floor>
                                                        { el.floor }
                                                    </Floor>
                                                </ReserveFloor>
                                                <Seat>{ el.select_seat }</Seat>
                                                <Date>
                                                    { date.getFullYear() + '.' + el.day.substring(0, 2) + '.' + el.day.substring(2, 4) + '(' + el.week + ')' }
                                                    &nbsp;
                                                    { el.start_time.substring(0, 2) + ':' + el.start_time.substring(2, 4) }
                                                </Date>
                                                <ReserveDate>
                                                    <SubTitle>결제일<br></br></SubTitle>
                                                    <SubBody>{ '20' + el.reserve_time.substring(0, 2) + '.' + el.reserve_time.substring(3, 5) + '.' + el.reserve_time.substring(6, 8) }</SubBody>
                                                </ReserveDate>
                                                <ReservePrice>
                                                    <SubTitle>결제금액<br></br></SubTitle>
                                                    <SubBody>{ el.ticket_price + '원' }</SubBody>
                                                </ReservePrice>
                                                <BacodeText>
                                                    CGV<br></br>
                                                    <Barcode src = { barcodeimg }></Barcode>
                                                    <Expansion src = { expansion } onClick = { () => this.openExpansion() }></Expansion>
                                                </BacodeText>
                                            </ReserveList>
                                            <Button onClick = { () => this.removeReserve(index) }>예매취소</Button>
                                        </ReserveListBody>
                                        })}
                                    </ScrollBody>
                                </ReserveBody>
                            </MyBody>
                        </MypageBody>
                        <MemCheck member = { this.state.memberCheck } reserve = { this.state.reserveCheck } MemCheckClose = { this.closeMemcCheck } reserveResult = { this.state.reserveResult } reserveIndex = { this.state.reserveIndex } />
                        <BarcodePop bacodeOpen = { this.state.bacodeOpen } bacodeClose = { this.closeExpansion } />
                    </MypageBack>
                }
            </React.Fragment>
        )
    }
}

export default  withStyles(styles)(Mypage);