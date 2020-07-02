import axios from "axios";
import React, { Component } from "react";
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

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
const Loadingmovie = styled.div`
    position: absolute;
    font-family: JejuGothic, NanumGothic;
    font-size: 1.5vw;
    top: 70%;
    left: 50%;
    transform:translateX(-50%);
`
const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
`
const Movie = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: ${ 
        props => {
            switch(props.listNum) {
                case 7 :
                    return '5vw';
            }
        }
    };
    margin-right: ${ 
        props => {
            switch(props.listNum) {
                case 7 :
                    return '5vw';
            }
        }
    };
    margin-left: ${ 
        props => {
            switch(props.listNum) {
                case 5 :
                    return '5vw';
            }
        }
    };
    width: ${ 
        props => {
            switch(props.listNum) {
                default:
                    return '23%';
                case 7 :
                    return '23%';
            }
        }
    };
`
const Rank = styled.div`
    font-size: 1.2vw;
    font-weight: bold;
`
const Img_div = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-top: 1vw;
    margin-bottom: 1vw;
    border: 5.2px solid black;
`
const Grade = styled.div`
    position: absolute;
    width: 2vw;
    height: 2vw;
    margin: 0.3vw;
    border-radius: 50%;
    background-color: ${ 
        props => {
            switch(props.grade) {
                case '15' :
                    return 'orange';
                case '12' :
                    return 'blue';
                case '전체' :
                    return 'green';
                case '청소' : 
                    return 'red';
                case '미정' :
                    return 'gray';
            }
        }
    };
    font-size: ${ 
        props => {
            switch(props.grade) {
                case '전체' :
                case '청소' :
                case '미정' :
                    return '0.7vw';
                default : 
                    return '0.8vw';
            }
        }
    };
    font-weight: bolder;
    color: white;
    white-space:nowrap;
    line-height: 2vw
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const Title = styled.div`
    font-size: 1vw;
    font-weight: bolder;
    margin-bottom: 1vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
`
const Percent = styled.div`
    font-size: 0.8vw;
    text-align: left;
`
const Opening = styled.div`
    font-size: 0.8vw;
    margin-bottom: 4vw;
    text-align: left;
    opacity: 0.8;
`
const TopRank = styled.div`
    width: 98%;
    margin-bottom: 2vw;
    font-size: 1.5vw;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid black;
    border-width: 0.3vw;
    line-height: 3vw;
`
const ListMore = styled.div`
    position: absolute;
    width: 426%;
    font-size: 1.5vw;
    font-weight: bold;
    left: -294%;
    bottom: -10%;
    text-align: left;
    border-bottom: 1px solid black;
    border-width: 0.3vw;
    line-height: 3vw;
`
const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2
    }
});

class List extends Component {
    constructor(props) { 
        super(props) 
        this.state = { 
            apiResult : [],
            completed: 0, // 로딩 애니메이션의 초기값: 0, 0 ~ 100까지 게이지가 채워짐
            loadingText: 0, // 로딩 텍스트
            nullCheck: 0, // nullCheck
            listNum: 0
        } 
    } 
    
    componentDidMount() {
        this.IntervalProgress = setInterval(this.progress, 20); // 0.02초마다 progress함수가 실행됨
        this.IntervalText = setInterval(this.loadingText, 20);
        this.getApi();
    } 
    
    // 애니메이션 함수
    progress = () => {
        if(this.state.nullCheck === 0) {
            const { completed } = this.state;
            // completed가 100이되면 0으로 돌아가고 아닐 시 1씩 증가
            this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
        } else {
            clearInterval(this.IntervalProgress);
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

    getApi = () => {
        axios.get('http://localhost:8088/list') 
            .then(res => {
                console.log(res.data);
                const movieList = []; // 결과값을 받아올 배열
                if(res.data && Array.isArray(res.data)) {
                    console.log(res.data.rank);
                    res.data.forEach(el => { // 결과 수 만큼 반복
                        movieList.push({ // movieList에 결과의 원하는 부분을 저장
                            rank: el.rank,
                            title: el.title,
                            grade: el.grade,
                            img: el.img,
                            percent: el.percent,
                            opening: el.opening
                        })
                        console.log(movieList);
                    })
                }
                 this.setState({
                    apiResult: movieList, // state에 저장
                    nullCheck: 1
                });
            }) 
            .catch(res => console.log(res))
            console.log(this.apiResult);
    }

     render() {      
        const { classes } = this.props;
        const { completed } = this.state;

        return(
            <React.Fragment>
                { this.state.nullCheck === 0 ?
                    <React.Fragment>
                        <Mainloading>
                            <CircularProgress className = { classes.progress } variant = "determinate" value={ completed } size = {'10vw'}/>
                
                            <Motion style={{ opacity: spring(this.state.loadingText) }}>
                                    {
                                    ({ opacity }) =>  <Loadingtext style={Object.assign({}, this.Loadingtext, { opacity })}>
                                    Loading
                                    </Loadingtext>
                                    }
                            </Motion>
                        </Mainloading>
                        <Loadingmovie>영화 리스트를 불러오는 중입니다.</Loadingmovie>
                    </React.Fragment>
                    :
                    <Main>
                    <TopRank>Top Rank</TopRank>
                    { this.state.apiResult.map((el, index) => {

                        this.state.listNum = this.state.listNum + 1;

                        return <Movie key = { index } listNum = { this.state.listNum }>
                            
                            <Rank>{ el.rank }</Rank>
                            <Img_div>
                                <Grade grade = { el.grade }>
                                    { el.grade === '청소' ? '청불' : el.grade }
                                </Grade>
                                <Img src = { el.img }/>
                            </Img_div>
                            <Title>{ el.title }</Title>
                            <Info>
                                <Percent>예매율&emsp;{ el.percent }</Percent>
                                <Opening>{ el.opening }</Opening>
                            </Info>

                            { this.state.listNum === 7 ?
                                <ListMore>
                                    More Movies
                                </ListMore>
                                : ""
                            }
                        </Movie>
                    })}
                </Main>
                }
            </React.Fragment>
        ) 
    } 
} 

export default withStyles(styles)(List);
