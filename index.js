import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { getAllTypeEffectiveness } from "./calculate.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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

