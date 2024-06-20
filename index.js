import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000; 
const APILink = "https://api.adviceslip.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(APILink + "/advice");
        res.render("index.ejs", { advice: JSON.stringify(response.data.slip.advice) });
    } catch (error) {
        res.render("index.ejs", { advice: "Something went wrong" });
    }
});

//response.data example from https://api.adviceslip.com/advice
// {
//     "slip": {
//       "slip_id": "2",
//        "advice": "Smile and the world smiles with you. Frown and you're on your own."
//     }
//   }

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });