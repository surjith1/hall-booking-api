import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import env from 'dotenv';

const app = express();
env.config();
console.log(process.env);
const PORT = process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;
 const createConection = async ()=> {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo Db is Connected ✌ 😊 👌.");
    return client;
 }
 const client = await createConection();
app.use(cors());
const movies = [
    {
        "id": "100",
        "name": "The Batman (2022)",
        "rating": 8,
        "trailer": "https://www.youtube.com/embed/mqqft2x_Aa4",
        "description": "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        "image": "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
    },
    {
        "id": "101",
        "name": "The Northman",
        "rating": 7.8,
        "trailer": "https://www.youtube.com/embed/oMSdFM12hOw",
        "description": "From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/The_Northman.png/220px-The_Northman.png"
    },
    {
        "id": "102",
        "name": "Thor: Love and Thunder",
        "rating": 7.7,
        "trailer": "https://www.youtube.com/embed/tgB1wUcmbbw",
        "description": "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
        "image": "https://m.media-amazon.com/images/M/MV5BMzJjZWYzNTctODgwOS00OGNiLTg4MjktMDlmNWUxNjczMzljXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_QL75_UX190_CR0,0,190,281_.jpg"
    },
    {
        "id": "103",
        "name": " Fantastic Beasts: The Secrets of Dumbledore ",
        "rating": 6.5,
        "trailer": "https://www.youtube.com/embed/Y9dr2zw-TXQ",
        "description": "Albus Dumbledore assigns Newt and his allies with a mission related to the rising power of Grindelwald.",
        "image": "https://m.media-amazon.com/images/M/MV5BOTNjNWRjZDUtYjU1OC00NGFmLWE2ZDktMzhhYmIwOTU4YjVmXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg"
    },
    {
        "id": "104",
        "name": "Everything Everywhere All at Once ",
        "rating": 8.8,
        "trailer": "https://www.youtube.com/embed/wxN1T1uxQ2g",
        "description": "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg"
    },
    {
        "id": "105",
        "name": "X-MEN (II)",
        "rating": 6.8,
        "trailer": "https://www.youtube.com/embed/qIdYV664amo",
        "description": "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.",
        "image": "https://flxt.tmsimg.com/assets/p31889_p_v8_ae.jpg"
    },
    {
        "id": "106",
        "name": " The Unbearable Weight of Massive Talent",
        "rating": 7.6,
        "trailer": "https://www.youtube.com/embed/x2YHPZMj8r4",
        "description": "In this action-packed comedy, Nicolas Cage plays Nick Cage, channeling his iconic characters as he's caught between a superfan (Pedro Pascal) and a CIA agent (Tiffany Haddish).",
        "image": "https://imageio.forbes.com/specials-images/imageserve/626060a84bf2beb8cb768e63/Nicolas-Cage/1960x0.jpg?fit=bounds&format=jpg&width=960"
    },
    {
        "id": "107",
        "name": " Doctor Strange in the Multiverse of Madness",
        "rating": 8.8,
        "trailer": "https://www.youtube.com/embed/Rf8LAYJSOL8",
        "description": "Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg"
    },
    {
        "id": "108",
        "name": "Death on the Nile",
        "rating": 6.3,
        "trailer": "https://youtu.be/dZRqB0JLizw",
        "description": "While on vacation on the Nile, Hercule Poirot must investigate the murder of a young heiress.",
        "image": "https://m.media-amazon.com/images/M/MV5BNjI4ZTQ1OTYtNTI0Yi00M2EyLThiNjMtMzk1MmZlOWMyMDQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg"
    },
    {
        "id": "109",
        "name": "K.G.F : CHAPTER 2",
        "rating": 9,
        "trailer": "https://www.youtube.com/embed/dZRqB0JLizw",
        "description": "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order. Rocky must battle threats from all sides for unchallenged supremacy.",
        "image": "https://assetscdn1.paytm.com/images/cinema/Sanjay-Dutt-First-Look-HD-Posters-as-adheera-From-KGF-Chapter-2-released-1-copy-43c1a320-d8c6-11eb-9e9e-8dcf1f7e911c.jpg"
    }
];
//express.json() //Converting to JSON 
app.use(express.json());
app.get('/', (req, res) => {
    res.send(`Hi Welcome to Port ${PORT} `)
})
app.get('/movies', async (req, res) => {
    const movie = await client.db("Movies").collection("moviesList").find({}).toArray();
    res.send(movie);
})
app.get('/movies/:id', async (req, res) => {
    const {id} =req.params;
    const movie = await client.db("Movies").collection("moviesList").findOne({id:id});
    //const movie = movies.find((mv)=>mv.id===id)
    movie ? res.send(movie) : res.status(401).send({msg:"No Such Movie Found"});
})
app.post('/movies', async (req, res) => {
    const data = req.body;
    const result = await client.db("Movies").collection("moviesList").insertMany(data);
    res.send(result);
})

app.delete('/movies/:id', async (req, res) => {
    const {id} =req.params;
    const movie = await client.db("Movies").collection("moviesList").deleteOne({id:id});
    //const movie = movies.find((mv)=>mv.id===id)
    movie.deletedCount > 0 ? res.send(movie) : res.status(401).send({msg:"No Such Movie Found"});
})
app.put('/movies/:id', async (req, res) => {
    const data = req.body;
    const {id} = req.params;
    const result = await client.db("Movies").collection("moviesList").updateOne({id:id},{$set:data});
    res.send(result);
})
app.listen(PORT, () => console.log(`Local host running on ${PORT}`));