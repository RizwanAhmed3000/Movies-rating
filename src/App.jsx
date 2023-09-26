import { useEffect, useState } from 'react';
import './App.css';
import { StarBorderPurple500Outlined, StarOutlined } from "@mui/icons-material"

function App() {

  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [singleMovie, setSingleMovie] = useState("");
  const [isMovieTrue, setIsMovieTrue] = useState(false)

  async function searchMovies(search) {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=3c7f297a&s=${search}`)
      const data = await res.json()
      console.log(data);
      setMovieList(data.Search)
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
            movieList.map((movie, index) => (
              <Movie key={index} movie={movie} singleMovieDetails={singleMovieDetails} />
            ))
          }
        </div>
        <div className="right">
          {
            isMovieTrue ? <MovieStats singleMovie={singleMovie} /> : <Stats />
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
          <p>{movie.Year}</p>
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
        <p>movies</p>
        <p>stars</p>
        <p>Avg stars</p>
        <p>watch time</p>
      </div>
    </div>
  )
}

//---------------------------------single movie stats---------------------------//

function MovieStats({ singleMovie }) {
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
        <MyRatings />
        <p>{singleMovie.Plot}</p>
        <p>Starring {singleMovie.Actors} </p>
        <p>Directed by {singleMovie.Director}</p>
      </div>
    </>
  )
}

//---------------------------------My rating---------------------------//

function MyRatings() {
  const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="myRatingContainer">
        <div className="stars">
          {
            loop.map((star, index) => (
              <StarBorderPurple500Outlined key={index} style={{ color: "gold" }} />
            ))
          }
        </div>
        <AddToListBtn />
      </div>
    </>
  )
}

//---------------------------------Add to list btn---------------------------//

function AddToListBtn() {
  return (
    <div className="btn">
      <button className='addBtn'>Add to list</button>
    </div>
  )
}

export default App;
