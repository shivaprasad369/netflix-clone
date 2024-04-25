import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getUserLikedMovie } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../component/Navbar";
import NotAvailabel from "../component/NotAvailabel";
import Slider from "../component/Slider";
import SelectGenra from "../component/SelectGenra";
import Card from "../component/Card";
export default function MyList() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genrsLoaded);
  const movies = useSelector((state) => state.netflix.likedMovies);
 
  console.log(movies);
  const [isScrolled, seIsScrolled] = useState(false);
  window.onscroll = () => {
    seIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) setEmail(currentUser.email)
    else navigate('/')
})
  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovie(email));
    }
  }, [dispatch, genresLoaded,email]);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/");
  });
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
            {movies.map((movie,index)=>(
                <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
            ))}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
.content{
    margin:2.3rem;
    margin-top:8rem;
    gap:3rem;
    h1{
        margin-left:3rem;
    }
    .grid{
        flex-wrap:wrap;
        gap:2rem;
    }
}
`;
