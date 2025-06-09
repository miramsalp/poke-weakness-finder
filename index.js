import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

