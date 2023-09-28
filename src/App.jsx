import { useState } from 'react';
import './App.css';
import Rating from '@mui/material/Rating'
import { Close } from '@mui/icons-material'

function App() {

  const [movieList, setMovieList] = useState();
  const [search, setSearch] = useState("");
  const [singleMovie, setSingleMovie] = useState("");
  const [isMovieTrue, setIsMovieTrue] = useState(false)
  const [starValue, setStarValue] = useState()
  const [movieWatchedList, setMovieWatchedList] = useState([])

  async function searchMovies(search) {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=3c7f297a&s=${search}`)
      const data = await res.json()
      console.log(data);
      setMovieList(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  async function singleMovieDetails(id) {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=3c7f297a&i=${id}`)
      const data = await res.json();
      console.log(data);
      setSingleMovie(data);
      setIsMovieTrue(true)
    } catch (error) {
      throw new Error(error)
    }
  }


  return (
    <div className="App">
      <Topbar search={search} setSearch={setSearch} searchMovies={searchMovies} />
      <div className="mainConatiner">
        <div className="left">
          {
            movieList?.Response === "True" ?
              movieList?.Search.map((movie, index) => (
                <Movie key={index} movie={movie} singleMovieDetails={singleMovieDetails} />
              )) : movieList?.hasOwnProperty('Error') ? (
                <Error movieList={movieList} />
              ) : ""

          }
        </div>
        <div className="right">
          {
            isMovieTrue ? <MovieStats singleMovie={singleMovie} setStarValue={setStarValue} starValue={starValue} setIsMovieTrue={setIsMovieTrue} setMovieWatchedList={setMovieWatchedList} movieWatchedList={movieWatchedList} setSingleMovie={setSingleMovie} /> : (
              <>
                <Stats />
                {
                  movieWatchedList.length > 0 ? movieWatchedList?.map((movie, index) => (
                    <WatchedMovie key={index} starValue={starValue} movie={movie} setStarValue={setStarValue}/>
                  )) : ""
                  
                }
              </>
            )
          }

        </div>
      </div>
    </div>
  );
}

//---------------------------------Topbar---------------------------//

function Topbar({ search, setSearch, searchMovies }) {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <img src="/assets/popcorn.png" alt="" className="logo" />
        <h2>usePopcorn</h2>
      </div>
      <div className="topbarMid">
        <input type="text" placeholder='Search Movie' className='inputField' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className='searchBtn' onClick={() => {
          searchMovies(search)
        }}>Search</button>
      </div>
      <div className="topbarRight">
        <p>Found 9 top results</p>
      </div>
    </div>
  )
}

//--------------------------left movie list container---------------------------//

function Movie({ movie, singleMovieDetails }) {
  return (
    <>
      <div className="box" onClick={() => singleMovieDetails(movie.imdbID)}>
        <img src={movie.Poster || `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`} alt="" className="poster" />
        <div className="text">
          <p>{movie.Title}</p>
          <p>📅{movie.Year}</p>
        </div>
      </div>
    </>
  )
}

//---------------------------------Stats---------------------------//

function Stats() {
  return (
    <div className="watchedMovies">
      <h3>Movies you watched</h3>
      <div className="ratingContainer">
        <p>🎬 0 movies</p>
        <p>⭐ 0 stars</p>
        <p>🌟 0 Avg stars</p>
        <p>⏳ 0 watch time</p>
      </div>
    </div>
  )
}

//---------------------------------single movie stats---------------------------//

function MovieStats({ singleMovie, starValue, setStarValue, setIsMovieTrue, movieWatchedList, setMovieWatchedList, setSingleMovie }) {
  return (
    <>
      <div className='movieStatContainer'>
        <div className="MoviePoster">
          <img src={singleMovie.Poster || `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`} alt="" className='moivePosterRight' />
        </div>
        <div className="lightDetails">
          <h3>{singleMovie.Title}</h3>
          <p>{singleMovie.Released} - {singleMovie.Runtime}</p>
          <p>{singleMovie.Genre}</p>
          <p>{singleMovie.imdbRating} IMdb rating</p>
        </div>
      </div>
      <div className="movieDescription">
        <MyRatings starValue={starValue} setStarValue={setStarValue} setIsMovieTrue={setIsMovieTrue} singleMovie={singleMovie} setMovieWatchedList={setMovieWatchedList} movieWatchedList={movieWatchedList} setSingleMovie={setSingleMovie} />
        <p>{singleMovie.Plot} </p>
        <p>Starring {singleMovie.Actors} </p>
        <p>Directed by {singleMovie.Director}</p>
      </div>
    </>
  )
}

//---------------------------------My rating---------------------------//

function MyRatings({ setStarValue, starValue, setIsMovieTrue, setMovieWatchedList, movieWatchedList, singleMovie, setSingleMovie }) {
  return (
    <>
      <div className="myRatingContainer">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="stars">
            <Rating
              name="simple-controlled"
              max={10}
              value={starValue}
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }}
            />
          </div>
          <p style={{ margin: "0px 10px" }}>{starValue}</p>
        </div>
        <AddToListBtn setIsMovieTrue={setIsMovieTrue} setMovieWatchedList={setMovieWatchedList} movieWatchedList={movieWatchedList} singleMovie={singleMovie} setSingleMovie={setSingleMovie} setStarValue={setStarValue} />
      </div>
    </>
  )
}

//---------------------------------Add to list btn---------------------------//

function AddToListBtn({ setIsMovieTrue, setMovieWatchedList, movieWatchedList, singleMovie, setStarValue }) {

  function watchListHandler() {
    setMovieWatchedList([...movieWatchedList, singleMovie])
  }

  return (
    <div className="btn">
      <button className='addBtn' onClick={() => {
        watchListHandler()
        setIsMovieTrue(false)
      }}>Add to list</button>
    </div>
  )
}


//---------------------------------Error---------------------------//

function Error({ movieList }) {
  return (
    <div className="err">
      <h2>{movieList.Error}</h2>
    </div>
  )
}

//---------------------------------watched movie contaniner---------------------------//

function WatchedMovie({ movie, starValue, setStarValue }) {
  return (
    <div style={{ margin: "8px 0px" }}>
      <div className="box" onClick={() => { }}>
        <img src={movie.Poster || `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`} alt="" className="poster" />
        <div className="text">
          <p>{movie.Title}</p>
          <div style={{ display: "flex" }}>
            <p style={{ margin: "0px 3px" }}>⭐ {movie.imdbRating || 0}</p>
            <p style={{ margin: "0px 3px" }}>🌟 {starValue || 0}</p>
            <p style={{ margin: "0px 3px" }}>⏳ {movie.Runtime || 0}</p>
          </div>
        </div>
        <Close style={{ marginLeft: "auto" }} />
      </div>
    </div>
  )
}

export default App;
