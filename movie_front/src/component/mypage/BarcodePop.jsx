import React from "react";
import styled, { keyframes } from 'styled-components';
import barcodeimg from "../../image/barcode.png";

const opacityTransition = keyframes`
    from { opacity: 0; }
    to { opacity: 0.5; }
`
const widthTransition = keyframes`
    from { width: 0%; }
    to { width: 30%; }
`

const BacodeOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0;
    animation: ${ opacityTransition } 0.3s forwards;
`
const Bacodebody = styled.div`
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
    border-radius: 10px;
    background-color: #F9F5EA;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    animation: ${ widthTransition } 0.3s;
    @media only screen and (orientation: portrait) {
        width: 50%;
        height: 20%;
    }
`
const BacodeImg= styled.img`
    width: 100%;
    height: 100%;
`

const BarcodePop = ({ bacodeOpen, bacodeClose }) => {
    return(
        <React.Fragment>
        { bacodeOpen === true ?
        <React.Fragment>
            <BacodeOverlay onClick = { bacodeClose }/>
            <Bacodebody>
                <BacodeImg src = { barcodeimg }>

                </BacodeImg>
            </Bacodebody>
        </React.Fragment>
            : ""
        }
        </React.Fragment>
    )
}

export default BarcodePop;