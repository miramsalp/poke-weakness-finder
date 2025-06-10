import express from 'express';
import axios from 'axios';
import { getAllTypeEffectiveness } from "../calculate.js"; // Make sure calculate.js is correct

const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
    res.render('index'); // Renders index.ejs
});

// Route for fetching detailed Pokémon information by name
router.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    try {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);

        const pokemonData = pokemonResponse.data;
        const speciesData = speciesResponse.data;

        // Get description (flavor text)
        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n/g, ' ') : 'No description available.';

        // Get types
        const types = pokemonData.types.map(typeInfo => typeInfo.type.name);

        // Get stats
        const stats = pokemonData.stats.map(statInfo => ({
            name: statInfo.stat.name.replace('special-attack', 'Sp. Atk').replace('special-defense', 'Sp. Def'),
            base_stat: statInfo.base_stat
        }));

        // Fetch type effectiveness
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

// SEARCH ENDPOINT (MODIFIED)
router.get('/search-pokemon', async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const allPokemonNames = req.app.locals.allPokemonNames || []; // Access the global list

    if (!query) {
        return res.json([]);
    }

    // Filter to include only names that START WITH the query
    const filteredPokemonNames = allPokemonNames.filter(name => name.startsWith(query)).slice(0, 10); // Limit results

    const searchResults = [];
    for (const name of filteredPokemonNames) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = response.data;
            searchResults.push({
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default, // Smaller sprite for search results
                types: pokemonData.types.map(typeInfo => typeInfo.type.name)
            });
        } catch (error) {
            console.error(`Error fetching data for ${name}:`, error.message);
            // Optionally, skip this Pokémon or add a placeholder
        }
    }
    res.json(searchResults);
});

export default router;