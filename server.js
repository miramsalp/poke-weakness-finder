import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Import routes
import searchRoutes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Global variable to store all Pokemon data (name, image, types)
let allPokemonData = []; // Changed from allPokemonNames

// Function to fetch all Pokemon names, images, and types once on server start
async function fetchAllPokemonData() { // Renamed function
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500");
        const pokemonList = response.data.results;

        // Fetch details for each Pokémon
        // This will take longer on startup, but subsequent searches will be faster
        const detailedPokemonPromises = pokemonList.map(async (p) => {
            try {
                const pokemonDetailResponse = await axios.get(p.url);
                const pokemonDetail = pokemonDetailResponse.data;
                return {
                    id: pokemonDetail.id,
                    name: pokemonDetail.name,
                    image: pokemonDetail.sprites.front_default, // Smaller sprite for search results
                    types: pokemonDetail.types.map((typeInfo) => typeInfo.type.name),
                };
            } catch (detailError) {
                console.warn(`Could not fetch details for ${p.name}:`, detailError.message);
                return null; // Return null for failed fetches
            }
        });

        // Wait for all detail fetches to complete
        const fetchedData = await Promise.all(detailedPokemonPromises);
        allPokemonData = fetchedData.filter(p => p !== null); // Filter out any null entries
        console.log(`Fetched ${allPokemonData.length} detailed Pokemon.`);
    } catch (error) {
        console.error("Error fetching all Pokemon data:", error.message);
    }
}

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
    // Makes allPokemonData available in all requests via req.app.locals.allPokemonData
    req.app.locals.allPokemonData = allPokemonData; // Changed from allPokemonNames
    next();
});

// Use route modules
app.use("/", searchRoutes);

app.get("/about", (req, res) => {
    res.render("about");
});

// Start the server after fetching Pokemon data
fetchAllPokemonData().then(() => { // Renamed function call
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});