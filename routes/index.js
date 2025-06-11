import express from 'express';
import axios from 'axios';
import { getAllTypeEffectiveness } from "../calculate.js";

const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
    res.render('index');
});

// Route for fetching detailed Pokémon information by name
router.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    try {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = pokemonResponse.data;

        const speciesUrl = pokemonData.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        const speciesData = speciesResponse.data;

        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n/g, ' ') : 'No description available.';

        const types = pokemonData.types.map(typeInfo => typeInfo.type.name);

        const stats = pokemonData.stats.map(statInfo => ({
            name: statInfo.stat.name.replace('special-attack', 'Sp. Atk').replace('special-defense', 'Sp. Def'),
            base_stat: statInfo.base_stat
        }));

        const weaknesses = await getAllTypeEffectiveness(types);

        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default;

        res.render('pokemon_detail', {
            pokemon: {
                id: pokemonData.id,
                name: pokemonData.name,
                image: imageUrl,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: types,
                description: description,
                stats: stats,
                weaknesses: weaknesses
            }
        });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).render('404', { message: 'Pokémon not found.' });
        } else {
            console.error("Error fetching Pokémon details:", error.message);
            res.status(500).render('error', { message: 'Failed to fetch Pokémon data.' });
        }
    }
});

// SEARCH ENDPOINT (MODIFIED TO USE CACHED DATA)
router.get('/search-pokemon', async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    // Use the cached allPokemonData instead of allPokemonNames
    const cachedPokemonData = req.app.locals.allPokemonData || [];

    if (!query) {
        return res.json([]);
    }

    // Filter to include only names that START WITH the query, using the cached data
    const filteredPokemon = cachedPokemonData.filter(pokemon => pokemon.name.startsWith(query)).slice(0, 10); // Limit results

    // The filteredPokemon already contains name, image, and types, so no need for further API calls
    res.json(filteredPokemon);
});

export default router;