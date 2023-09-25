import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
    </div>
  );
}

function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <img src="/assets/popcorn.png" alt="" className="logo" />
        <h2>usePopcorn</h2>
      </div>
      <div className="topbarMid">
        <input type="text" placeholder='Search Movie' className='inputField'/>
        <button className='searchBtn'>Search</button>
      </div>
      <div className="topbarRight">
        <p>Found 9 top results</p>
      </div>
    </div>
  )
}

export default App;
