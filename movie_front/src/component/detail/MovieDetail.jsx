import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';

const Detail = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 70%;
    background-color: transparent;
    @media only screen and (orientation: portrait) {
        display: flex;
        flex-direction: column;
        top: 0%;
        transform: translate(-50%, 5%);
        margin-bottom: 5vw;
    }
`
const DetailTitle = styled.div`
    margin: 0 auto;
    margin-top: 3vw;
    width: 55vw;
    height: 5vw;
    font-size: 2vw;
    font-weight: bold;
    border-bottom: 2px solid black;
    text-align: justify;
    line-height: 5vw;
`
const ImgBody = styled.div`
    margin-top: 2vw;
    margin-left: 7vw;
    width: 30%;
    @media only screen and (orientation: portrait) {
        margin: 0 auto;
        margin-top: 2vw;
        width: 80%;
    }
`
const ImgDiv = styled.div`
    width: 100%;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2vw;
    margin-right: 7vw;
    width: 46.5%;
    @media only screen and (orientation: portrait) {
        margin: 0 auto;
        margin-top: 2vw;
        width: 80%;
    }
`
const MovieInfoBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`
const Title = styled.div`
    margin-top: 2vw;
    width: max-content;
    height: 2vw;
    font-size: 1.5vw;
    font-weight: bold;
    line-height: 2vw;
    text-align: justify;
`
const State = styled.div`
    margin-top: 2vw;
    padding: 0.5vw;
    font-size: 1vw;
    font-weight: bold;
    color: #3E82E4;
    border: 2px solid #3E82E4;
    border-radius: 5px;
`
const Percent = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2vw;
    width: 100%;
    height: 4vw;
    font-size: 1vw;
    border-bottom: 1px solid black;
    line-height: 4vw;
    text-align: justify;
`
const PercentText = styled.div`
    font-size: 1.2vw;
    font-weight: bold;
`
const Info = styled.div`
    margin-top: 2vw;
    width: 100%;
    font-size: 1vw;
    text-align: justify;
`
const Content = styled.div`
    margin-top: 3vw;
    width: 100%;
    font-size: 1vw;
    text-align: justify;
`
class MovieDetail extends Component {
    constructor(props) { 
        super(props) 
        this.state = { 
            img: null,
            title: null,
            state: null,
            percent: null,
            info: null,
            content: null
        } 
    } 

    componentDidMount() {
        var moviesrc = window.location.href.substring(window.location.href.indexOf("/movies"), window.location.href.length);
        console.log(moviesrc);

        let form = new FormData()
        form.append('moviesrc', moviesrc);
        
        axios.post('http://localhost:8088/movieDetail', form, { headers: { 'Content-Type': 'multipart/form-data;' }}) 
        .then(res => {
            console.log(res.data);

            this.setState({
                img: res.data.img,
                title: res.data.title,
                state: res.data.state,
                percent: res.data.percent,
                info: '' + res.data.info,
                content: res.data.content
            });
        })
        .catch(res => console.log(res))
    }

    render() {
        const { img, title, state, percent, info, content } = this.state; 
        var infoText = '' + info; // info(Object) -> String

        return (
            <Detail>
                <DetailTitle>영화 상세</DetailTitle>
                <ImgBody>
                    <ImgDiv>
                        <Img src = { img }></Img>
                    </ImgDiv>
                </ImgBody>

                <MovieInfo>
                    <MovieInfoBody>
                        <Title>{ title }&emsp;</Title>
                        <State>{ state }</State>
                        <Percent>
                            <PercentText>예매율&nbsp;</PercentText>
                            { percent }
                        </Percent>
                        <Info>
                            { infoText.substring(0, infoText.indexOf("장르", 0)) }<br></br>
                            { infoText.substring(infoText.indexOf("장르", 0), infoText.indexOf("개봉", 0)) }<br></br>
                            { infoText.substring(infoText.indexOf("개봉", 0), infoText.length) }<br></br>
                        </Info>
                    </MovieInfoBody>
                    <Content>
                        { content }
                    </Content>
                </MovieInfo>
            </Detail>
        )
    }
}

export default MovieDetail;