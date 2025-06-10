// routes/index.js
import express from "express";
import axios from "axios";
import { getAllTypeEffectiveness } from "./../calculate.js"; // ADJUST THIS PATH IF YOUR calculate.js IS IN A DIFFERENT LOCATION

const router = express.Router();

// Home route
router.get("/", async (req, res) => {
  try {
    const searchName = req.query.pokemonName; // Get the search query from the URL
    let pokemonData = null;
    let errorMessage = null;

    if (searchName) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
        );
        const speciesResponse = await axios.get(response.data.species.url);

        const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const description = descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
          : "No description available.";

        const types = response.data.types.map((typeInfo) => typeInfo.type.name);
        const typeEffectiveness = await getAllTypeEffectiveness(types);

        pokemonData = {
          name: response.data.name,
          id: response.data.id,
          image: response.data.sprites.other["official-artwork"].front_default,
          height: response.data.height,
          weight: response.data.weight,
          types: types,
          stats: response.data.stats.map((s) => ({
            name: s.stat.name.replace("-", " "), // Format stat names
            base_stat: s.base_stat,
          })),
          description: description,
          weaknesses: typeEffectiveness,
        };
      } catch (innerError) {
        if (innerError.response && innerError.response.status === 404) {
          errorMessage = "Pokémon not found. Please check the name.";
        } else {
          console.error("Error fetching Pokemon data:", innerError.message);
          errorMessage = "An error occurred while fetching Pokémon data.";
        }
      }
    }

    // Pass allPokemonNames to the template, ensuring it's an array even if not yet fetched
    res.render("index", {
      pokemon: pokemonData,
      allPokemonNames: req.app.locals.allPokemonNames || [], // IMPORTANT: Fallback to an empty array
      error: errorMessage,
      query: searchName || '' // Pass the search query back to pre-fill the input field
    });
  } catch (error) {
    console.error("Failed to render home page:", error.message);
    res.render("index", {
      pokemon: null,
      allPokemonNames: req.app.locals.allPokemonNames || [],
      error: "An unexpected error occurred.",
      query: ''
    });
  }
});

// Route for Pokemon details page (this should be already in your routes/index.js from previous steps)
router.get("/pokemon/:name", async (req, res) => {
    try {
      const pokemonName = req.params.name.toLowerCase();
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const speciesResponse = await axios.get(response.data.species.url);

      const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const description = descriptionEntry
        ? descriptionEntry.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
        : "No description available.";

      const types = response.data.types.map((typeInfo) => typeInfo.type.name);
      const typeEffectiveness = await getAllTypeEffectiveness(types);

      const pokemonData = {
        name: response.data.name,
        id: response.data.id,
        image: response.data.sprites.other["official-artwork"].front_default,
        height: response.data.height,
        weight: response.data.weight,
        types: types,
        stats: response.data.stats.map((s) => ({
          name: s.stat.name.replace("-", " "),
          base_stat: s.base_stat,
        })),
        description: description,
        weaknesses: typeEffectiveness,
      };

      res.render("pokemon_detail", { pokemon: pokemonData });
    } catch (error) {
      console.error("Error fetching Pokemon details:", error.message);
      let errorMessage = "Could not find that Pokémon or an error occurred.";
      if (error.response && error.response.status === 404) {
        errorMessage = "Pokémon not found. Please check the name.";
      }
      res.redirect(`/?error=${encodeURIComponent(errorMessage)}`);
    }
});

export default router;