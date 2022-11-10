import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "./Home.css";

export default function Home() {
  const [getAllPoke, setGetAllPoke] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`).then((res) => {
      res.data.results.forEach((pokemon) => {
        fetchFullPokemon(pokemon);
      });
    });
  }, []);

  const fetchFullPokemon = (pokemon) => {
    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    axios.get(url).then((res) => {
      objPokemonFull.pic = res.data.sprites.front_default;
      objPokemonFull.type = res.data.types[0].type.name;
      objPokemonFull.id = res.data.id;

      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((res) => {
          objPokemonFull.name = res.data.names[4].name;
          setGetAllPoke((getAllPoke) => [...getAllPoke, objPokemonFull]);
        });
    });
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const nbPkmns = 70;

  return (
    <div className="home-page">
      <img className="title" src="./imgs/pokemon_title.png" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Entrer le nom d'un pokémon"
      />

      {loaded ? (
        <div className="grid-cards">
          {getAllPoke
            .filter(
              (pkmn) =>
                pkmn.name.includes(search) ||
                pkmn.name.toLowerCase().includes(search)
            )
            .sort((a, b) => a.id - b.id)
            .splice(0, nbPkmns + (getAllPoke.length - nbPkmns))
            .map((poke) => {
              return <Cards poke={poke} />;
            })}
        </div>
      ) : (
        <div className="grid-cards">
          {getAllPoke
            .filter(
              (pkmn) =>
                pkmn.name.includes(search) ||
                pkmn.name.toLowerCase().includes(search)
            )
            .sort((a, b) => a.id - b.id)
            .slice(0, nbPkmns)
            .map((poke) => {
              return <Cards poke={poke} />;
            })}
        </div>
      )}

      {loaded || search ? null : (
        <button onClick={() => handleLoad()} className="load">
          Charger plus de pokémons
        </button>
      )}
    </div>
  );
}
