import React from 'react'
import styled from 'styled-components';
import {BsArrowLeft} from 'react-icons/bs'
import video from '../assets/video.mp4';
import { useNavigate } from 'react-router-dom';
//api=f2fc815c2dc07cef3f9b6b78089f8114
export default function Players() {
    const navigate=useNavigate()

  return (
    <Container>
      <div className="player">
        <div className="back">
            <BsArrowLeft onClick={()=>navigate(-1)}/>
        </div>
        <video src={video} autoPlay controls loop muted></video>
      </div>
    </Container>
  )
}
const Container=styled.div`
.player{
    width:100vw;
    height:100vh;
    .back{
        position:absolute;
        padding:2rem;
        z-index:1;
        svg{
            font-size:3rem;
            cursor:pointer;
        
            font-weight:bold;
        }
    }
    video{
        width:100%;
        height:100%;
        object-fit:cover;
    }
}
`;