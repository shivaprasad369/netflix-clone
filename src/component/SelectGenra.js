import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenres, fetchMoviesByGenres } from "../store";
export default function SelectGenra({ genres, type }) {
  console.log(genres);
  const dispatch = useDispatch();
  const selectHandler=(e)=>{
    if(type==='tv')
        dispatch(fetchDataByGenres({ genre: e.target.value, type }))
      else{
        dispatch(fetchMoviesByGenres({genre: e.target.value, type}))
      }
  }
  return (<Container className='flex'>

    <select
      className="flex"
      onChange={selectHandler}
      >
      {genres.map((data) => {
        return (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        );
      })}
    </select>
      </Container>
  );
}
const Container=styled.div`
margin-left:5rem;
select{
cursor:pointer;
font-size:1.4rem;
padding-left:1rem;
background-color:rgba(0,0,0,0.4);
color:white;
}
`;