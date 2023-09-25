import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");

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

  // useEffect(()=> {
  //   searchMovies()
  // }, [])

  return (
    <div className="App">
      <Topbar search={search} setSearch={setSearch} searchMovies={searchMovies} />
      <div className="mainConatiner">
        <div className="left">
          {
            movieList.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))
          }
        </div>
        <div className="right">
          <h1>hi</h1>
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

function Movie({ movie }) {
  return (
    <>
      <div className="box">
        <img src={movie.Poster || `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`} alt="" className="poster" />
        <div className="text">
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
        </div>
      </div>
    </>
  )
}


export default App;
