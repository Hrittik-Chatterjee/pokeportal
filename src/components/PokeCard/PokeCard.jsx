import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const PokeCard = ({ name, url }) => {
  const pokemonIndex = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
  const details = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    fetch(details)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details");
        }
        return response.json();
      })
      .then((data) => {
        setAbilities(data.abilities.map((ability) => ability.ability.name));
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
      });
  }, [details]);

  return (
    <>
      <Link to="deails">
        <div className="card bg-amber-300 hover:bg-error hover:text-white w-72 shadow-xl">
          <figure>
            <img
              className="w-40 h-40 object-cover"
              src={imageUrl}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="badge badge-primary ">#{pokemonIndex}</div>
            <h2 className="card-title uppercase">{name}</h2>

            <div className="card-actions justify-end">
              {abilities.slice(0, 2).map((ability, index) => (
                <div key={index} className="badge">
                  {ability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PokeCard;
