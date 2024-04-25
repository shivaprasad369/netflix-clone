import {createAsyncThunk,configureStore,createSlice} from '@reduxjs/toolkit';
import axios from 'axios'
import { REACT_API, TMDB_BASE_URL } from '../utils/constant';
//import { getLikedMovie } from '../../../netflix-api/controllers/UseController';
const initialState={
    movies:[],
    genrsLoaded:false,
    likedMovies:[],
    TvShows:[],
    genres:[]
};

const NetflixSlice=createSlice({
    name:'netflix',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
            state.genres=action.payload;
            state.genrsLoaded=true;
        })
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
       // console.log(state.movies)
        })
        builder.addCase(fetchTvShows.fulfilled,(state,action)=>{
            state.TvShows=action.payload;
       // console.log(state.movies)
        })
        builder.addCase(fetchDataByGenres.fulfilled,(state,action)=>{
            state.TvShows=action.payload;
      //  console.log(state.movies)
        })
        builder.addCase(fetchMoviesByGenres.fulfilled,(state,action)=>{
            state.movies=action.payload;
      //  console.log(state.movies)
        })
        builder.addCase(getUserLikedMovie.fulfilled,(state,action)=>{
            state.likedMovies=action.payload;
       // console.log(state.movies)
        })
        builder.addCase(removeFromLikedMovie.fulfilled,(state,action)=>{
            state.likedMovies=action.payload;
       // console.log(state.movies)
        })
    }
});
const createArrayFromData=(array,movieArray,genres)=>{
//console.log(array);
array.forEach(movie => {
    const moviegenres=[];
    movie.genre_ids.forEach((genre)=>{
        const name=genres.find(({id})=>id===genre);
        if(name) moviegenres.push(name,name)
    });
if(movie.backdrop_path){
    movieArray.push({
        id:movie.id,
        name:movie?.original_name ? movie.original_name :movie.original_title,
        image:movie.backdrop_path,
        genres:moviegenres.slice(1,3)
    })
}
//console.log(movieArray)
});
}

const getRawData=async(api,genres,paging)=>{
    const movieArray=[];
    for(let i=1;movieArray.length<60 && i<10;i++){
        const {
            data:{results}
        }=await axios.get(`${api}${paging ?`&page=${i}`:""}`);
       //console.log(results);
        createArrayFromData(results,movieArray,genres);

    }
    return movieArray;
}
export const fetchMovies=createAsyncThunk('netflix/trending',async({type},thunkApi)=>{
    const{
        netflix:{genres},
    }=thunkApi.getState();
    const data=getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${REACT_API}`,genres,true);
    return data;
})
export const fetchTvShows=createAsyncThunk('netflix/tvShows',async({type},thunkApi)=>{
    const{
        netflix:{genres},
    }=thunkApi.getState();
    const data=getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${REACT_API}`,genres,true);
    return data;
})
export const fetchDataByGenres=createAsyncThunk('netflix/tvshowsByGenres',async({genre,type},thunkApi)=>{
    const{
        netflix:{genres},
    }=thunkApi.getState();
    const data=getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${REACT_API}&with_genres=${genre}`,genres);
    return data;
})
export const fetchMoviesByGenres=createAsyncThunk('netflix/movieByGenres',async({genre,type},thunkApi)=>{
    const{
        netflix:{genres},
    }=thunkApi.getState();
    const data=getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${REACT_API}&with_genres=${genre}`,genres);
    return data;
})
 export const getGenres=createAsyncThunk('netflix/genres',async()=>{
    const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${REACT_API}`);
    // console.log(genres);
    return genres;
})
 export const getUserLikedMovie=createAsyncThunk('netflix/getUserLikedMovie',async(email)=>{
const {data:{movies}}=await axios.get(`https://global-news-2.onrender.com//api/user/liked/${email}`)
return movies;
 })
 export const removeFromLikedMovie=createAsyncThunk('netflix/removeLikedMovie',async({email,movieId})=>{
    const {data:{movies}}=await axios.put(`https://global-news-2.onrender.com//api/user/delete`,{email,movieId})
    return movies;
     })
export const store=configureStore({
    reducer:{netflix:NetflixSlice.reducer}
})