import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard/PokeCard";

const Home = () => {
  // states
  const [pokedetails, setPokedetails] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //   fetching data from api
  const fetchPokemon = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setPokedetails(data.results);
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchPokemon("https://pokeapi.co/api/v2/pokemon");
  }, []);

  // search logics
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPokemons = pokedetails.filter((pokedetail) => {
    const query = searchQuery.toLowerCase();
    return pokedetail.name.toLowerCase().includes(query);
  });

  return (
    <>
      {/* Title */}
      <h1 className="bg-indigo-600 font-bold  text-white text-center mx-auto text-2xl w-72 rounded-lg py-2 my-4">
        Pokemon Lists
      </h1>

      {/* search pokemon */}
      <div className="input input-bordered flex items-center gap-2 w-80 my-4">
        <input
          type="text"
          className="grow"
          placeholder="Search for a Pokemon by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/*Card Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemons.map((poke, index) => (
          <PokeCard key={index} {...poke} />
        ))}
      </div>

      {/* Next and Preview List */}
      <div className="flex my-12 ml-28">
        <div>
          <button
            className={`text-white text-2xl font-bold px-48 py-2 card bg-indigo-600 rounded-box grid h-20 flex-grow place-items-center ${
              !previousUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => previousUrl && fetchPokemon(previousUrl)}
            disabled={!previousUrl}
          >
            Previous
          </button>
        </div>
        <div className="divider divider-horizontal">|</div>
        <div>
          <button
            className={`text-white text-2xl font-bold px-48 py-2 card bg-indigo-600 rounded-box grid h-20 flex-grow place-items-center ${
              !nextUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => nextUrl && fetchPokemon(nextUrl)}
            disabled={!nextUrl}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
