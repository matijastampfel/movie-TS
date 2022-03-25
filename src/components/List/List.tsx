import React, { useState, useEffect } from "react";
import "./List.css";

interface SearchMovieProps {
  search: string;
}

function List({ search }: SearchMovieProps) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const link = `https://imdb-api.com/en/API/Search/k_68k2qdhs/${search === "" ? "Matrix" : search}`;

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error: any) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [search]);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div>Number of movies: {items.length}</div>
        <div>
          {items.map((movie: any) => {
            return (
              <div key={movie.id}>
                <p>{movie.title}</p>
                <img
                  className="image-size"
                  src={movie.image}
                  alt="movie poster"
                />
                <p>{movie.description}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default List;
