import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { getAllTypeEffectiveness } from "./calculate.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let allPokemonNames = []; // To store all Pokemon names
async function fetchAllPokemonNames() {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500"); 
        allPokemonNames = response.data.results.map(p => p.name);
        console.log(`Fetched ${allPokemonNames.length} Pokemon names.`);
        // console.log(allPokemonNames[0]);
    } catch (error) {
        console.error("Error fetching all Pokemon names:", error.message);
    }
}
fetchAllPokemonNames();
// console.log(allPokemonNames[0]);

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/get", async (req, res) => {
    console.log(req.body.pokemonName);
    const pokeName = req.body.pokemonName;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        // const pokemonTypes = response.data.types.map((typeInfo) => typeInfo.type.name);
        // console.log(pokemonTypes);
        // console.log(getAllTypeEffectiveness(pokemonTypes));
        // res.render("index.ejs");
    } catch (error) {
        console.log(error.response.data);
    }
    // tmp
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

