import { useState, useEffect } from "react";

export default function Watchlist() {
  const [moviesWl, setMoviesWl] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/history/data");
        const data = await response.json();
        const useless = data.shift();
        const favourites = data.filter((fav) => fav.watchlist === true);
        setMoviesWl(favourites);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const watchlistDelete = async (movie) => {
    window.location.reload(true);
    const req = await fetch(`http://localhost:5000/history/data/${movie}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        watchlist: false,
      }),
    });
    const res = await req.json();
  };

  return (
    <>
    <h1 className="watchlistTitle">WATCHLIST</h1>
      {moviesWl &&
        moviesWl.map((movie) => (
          <div className="watchlistMovies">
            <h1>{movie.name}</h1>
            <h2>{movie.year}</h2>
            <img className = "myimg" src={movie.poster} alt="movie.poster.png" />
            <br></br>
            <br></br>
            <button className = "deleteButton" onClick={() => watchlistDelete(movie.name)}>
              DELETE
            </button>
            <br></br><br></br>
          </div>
        ))}
    </>
  );
}