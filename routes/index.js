import express from "express";
import axios from "axios"; 

const router = express.Router();

// Home route
router.get("/", (req, res) => {
    res.render("index.ejs");
});

// Search Pokemon route
router.get("/search-pokemon", async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    if (!query) {
        return res.json([]);
    }

    // Access allPokemonNames from app.locals
    const allPokemonNames = req.app.locals.allPokemonNames;

    const filteredNames = allPokemonNames.filter(name => name.startsWith(query)).slice(0, 20);

    const fetchPromises = filteredNames.map(async (name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = response.data;
            return {
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                types: pokemonData.types.map(typeInfo => typeInfo.type.name),
                id: pokemonData.id
            };
        } catch (error) {
            // Log the error but allow other successful fetches to proceed
            console.error(`Error fetching detail for ${name} during search:`, error.message);
            return null;
        }
    });

    const fetchedPokemon = await Promise.all(fetchPromises);
    const validPokemon = fetchedPokemon.filter(pokemon => pokemon !== null);
    validPokemon.sort((a, b) => a.id - b.id);

    res.json(validPokemon);
});

export default router;