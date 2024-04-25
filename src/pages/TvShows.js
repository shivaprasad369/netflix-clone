import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchTvShows, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../component/Navbar";
import NotAvailabel from "../component/NotAvailabel";
import Slider from "../component/Slider";
import SelectGenra from "../component/SelectGenra";
export default function TvShows() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genrsLoaded);
  const movies = useSelector((state) => state.netflix.TvShows);
  const genres = useSelector((state) => state.netflix.genres);
  console.log(movies);
  const [isScrolled, seIsScrolled] = useState(false);
  window.onscroll = () => {
    seIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTvShows({ type: "tv" }));
    }
  }, [dispatch, genresLoaded]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/");
  });
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenra genres={genres} type={"tv"} />
        {movies.length ? <Slider movies={movies} /> : <NotAvailabel />}
      </div>
    </Container>
  );
}
const Container = styled.div`
  .data {
    margin-top: 8rem;
    NotAvailable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
