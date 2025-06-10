import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { getAllTypeEffectiveness } from "./calculate.js";

// Import routes
import searchRoutes from "./routes/index.js"; // This imports your routes

const app = express();
const port = process.env.PORT || 3000;

// Global variable to store all Pokemon names
let allPokemonNames = [];

// Function to fetch all Pokemon names once on server start
async function fetchAllPokemonNames() {
    try {
        // Fetch a higher limit if you want more than 1500, e.g., 10000 for all known
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500");
        allPokemonNames = response.data.results.map((p) => p.name);
        console.log(`Fetched ${allPokemonNames.length} Pokemon names.`);
    } catch (error) {
        console.error("Error fetching all Pokemon names:", error.message);
    }
}

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
    // Makes allPokemonNames available in all requests via req.app.locals.allPokemonNames
    req.app.locals.allPokemonNames = allPokemonNames;
    next();
});

// Use route modules
app.use("/", searchRoutes); // This will handle all routes defined in searchRoutes

app.get("/about", (req, res) => {
    res.render("about"); // Render the about.ejs file
});

// Start the server after fetching Pokemon names
fetchAllPokemonNames().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});