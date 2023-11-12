export default function ChosenMovieInformations({ movie }) {
  return (
    <div className="searchedMovie">
            <h1>{movie.Title}</h1>

      <img className="myimg" src={movie.Poster} alt="movie.poster.png" />
      <br></br>
      <h3>
        Release Date:<br></br>
        {movie.Released}
      </h3>
      <h3>
        Directed by:<br></br> {movie.Director}
      </h3>
      <h3>
        Screenwriting by:<br></br>
        {movie.Writer}
      </h3>
      <h3>
        Actors:<br></br>
        {movie.Actors}
      </h3>
      <h3>
        Genres: <br></br>
        {movie.Genre}
      </h3>
      <h3>
        Plot: <br></br>
        {movie.Plot}
      </h3>
      <h3>Ratings: <br></br>{movie.imdbRating}</h3>
      
    </div>
  );
}