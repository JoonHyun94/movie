import axios from "axios";
import React, { Component } from "react";
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 70%;
    margin: 0 auto;
`
const Movie = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-left: ${ 
        props => {
            switch(props.listNum) {
                case 7 :
                    return '33%';
            }
        }
    };
    padding-right: ${ 
        props => {
            switch(props.listNum) {
                case 7 :
                    return '33%';
            }
        }
    };
    width: ${ 
        props => {
            switch(props.listNum) {
                default:
                    return '30%';
                case 7 :
                    return '96.5%';
            }
        }
    };
    border-bottom: ${ 
        props => {
            switch(props.listNum) {
                case 7 :
                    return '1px solid black';
            }
        }
    };
    border-width: 0.3vw;
`
const Rank = styled.div`
    font-size: 1.5vw;
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
    width: 2.5vw;
    height: 2.5vw;
    margin: 0.3vw;
    padding: 0.5vw;
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
            }
        }
    };
    font-size: ${ 
        props => {
            switch(props.grade) {
                case '전체' :
                case '청소' :
                    return '0.8vw';
                default : 
                    return '1vw';
            }
        }
    };
    font-weight: bolder;
    color: white;
    white-space:nowrap;
    line-height: ${ 
        props => {
            switch(props.grade) {
                case '전체' :
                case '청소' :
                    return '1.5vw';
                default : 
                    return '1.4vw';
            }
        }
    };
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const Title = styled.div`
    font-size: 1.3vw;
    font-weight: bolder;
    margin-bottom: 1vw;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
`
const Percent = styled.div`
    font-size: 1.1vw;
    text-align: left;
`
const Opening = styled.div`
    font-size: 1.1vw;
    margin-bottom: 4vw;
    text-align: left;
    opacity: 0.8;
`
const ListMore = styled.div`
    margin-right: 50%;
    font-size: 1.5vw;
    font-weight: bold;
`

class List extends Component {
    constructor(props) { 
        super(props) 
        this.state = { 
            apiResult : [],
            listNum: 0
        } 
    } 
    
    componentDidMount() { 
        this.getApi();
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
                    apiResult: movieList // state에 저장
                });
            }) 
            .catch(res => console.log(res))
            console.log(this.apiResult);
    }

     render() {        
        return(
            <Main>
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
                                MovieMore
                            </ListMore>
                            : ""
                        }
                    </Movie>
                })}
            </Main> 
        ) 
    } 
} 

export default List
