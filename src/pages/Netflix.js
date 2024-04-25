import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store";
import Slider from "../component/Slider";
export default function Netflix() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genrsLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  //console.log(movies);
  const [isScrolled, seIsScrolled] = useState(false);
  window.onscroll = () => {
    seIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  },[dispatch,genresLoaded]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="logo" />
          </div>
          <div className="button flex">
            <button className="flex j-center a-center">
              <FaPlay onClick={() => navigate("/player")} /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .button {
        gap: 2rem;
        margin: 5rem;
        button {
          gap: 1rem;
          font-size: 1.4rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
