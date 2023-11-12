import { useState, useRef } from "react";
import ChosenMovieInformations from "../components/HomeMovie";

export default function Home() {
  const [movieSubmited, setMovieSubmited] = useState(false);
  const [movieChosen, setMovieChosen] = useState("");
  const [edit, setEdit] = useState(false);
  const [watchList, setWatchList] = useState("Add to Watchlist");
  const titleRef = useRef(null);
  const yearRef = useRef(null);

  const submitIt = async (e) => {
    e.preventDefault();

    if (movieSubmited === false) {
      setMovieSubmited(true);
      console.log(yearRef.current.value);
      if (titleRef.current.value && !yearRef.current.value) {
        const response = await fetch(
          `http://www.omdbapi.com/?t=${titleRef.current.value}&apikey=8100788`
        );
        const data = await response.json();
        setMovieChosen(data);
        postItOrNot(function () {
          postMovies(data.Title, data.Year, data.Poster);
        }, data.Title);
      } else if (titleRef.current.value && yearRef.current.value) {
        const response = await fetch(
          `http://www.omdbapi.com/?t=${titleRef.current.value}&y=${yearRef.current.value}&apikey=8100788`
        );
        const data = await response.json();
        console.log(yearRef);
        setMovieChosen(data);
        postItOrNot(function () {
          postMovies(data.Title, data.Year, data.Poster);
        }, data.Title);
      }
    } else {
      setMovieSubmited(false);
    }
  };

  const postMovies = async (titlu, an, posters) => {
    await fetch("http://localhost:5000/history/data", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: titlu,
        year: an,
        poster: posters,
        watchlist: false,
      }),
    });
  };

  const postItOrNot = async (action, names) => {
    try {
      const response = await fetch("http://localhost:5000/history/data");
      const data = await response.json();
      const yesOrNo = data.filter((history) => history.name === names);
      console.log(yesOrNo);
      console.log(yesOrNo.length);
      if (yesOrNo.length > 0) {
        console.log("Nope");
      } else {
        action();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const wlButton = async () => {
    try {
      const res = await fetch("http://localhost:5000/history/data");
      const data = await res.json();
      const movie = data.filter((movies) => movies.name === movieChosen.Title);
      if (movie.length > 0) {
        if (movie[0].watchlist === false) {
          setWatchList("Add to Watchlist");
        } else {
          setWatchList("Delete from Watchlist");
        }
      } else {
        console.log(123);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const watchlistAdd = async (movie) => {
    if (edit === false) {
      setWatchList("Delete from Favourites");
      setEdit(true);
      const req = await fetch(`http://localhost:5000/history/data/${movie}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          watchlist: true,
        }),
      });
      const res = await req.json();
    } else {
      setWatchList("Add to Favourites");
      setEdit(false);
      const req = await fetch(`http://localhost:5000/history/data/${movie}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          watchlist: false,
        }),
      });
      const res = await req.json();
    }
  };
  wlButton();

  return (
    <>
      {!movieSubmited ? (
        <div>
          <h1 className="watchlistTitle">CHOOSE A MOVIE</h1>
          <form className= "home" onSubmit={submitIt}>
            <div className="form">
            <br />
            <input className="i1" type="text" placeholder="Title" ref={titleRef}  />    
            <br />
            <br />
            <input className="i2" type="text" ref={yearRef} placeholder="Year of Release" />
            <br />
            <br />
            <button className="submitButton" type="submit">SEARCH</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <button className="backToSearch" onClick={submitIt}>Back to Search</button>
          <br></br>
          <br></br>
          <ChosenMovieInformations movie={movieChosen} />
          <button className = "addToFav" onClick={() => watchlistAdd(movieChosen.Title)}>
            {watchList}
          </button>
        </>
      )}
    </>
  );
}
