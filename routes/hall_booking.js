import express from 'express';
import {client} from '../index.js'

const router =express.Router();
router.get('/', async (req, res) => {
    const hall = await client.db("HallBookingAPI").collection("Hall").find({}).toArray();
res.send(hall);
})
// router.get('/:id', async (req, res) => {
//     const {id} =req.params;
//     const movie = await client.db("Movies").collection("moviesList").findOne({id:id});
//     //const movie = movies.find((mv)=>mv.id===id)
//     movie ? res.send(movie) : res.status(401).send({msg:"No Such Movie Found"});
// })
router.post('/', async (req, res) => {
    const data = req.body;
    const result = await client.db("HallBookingAPI").collection("Hall").insertMany(data);
    res.send(result);
})

// router.delete('/:id', async (req, res) => {
//     const {id} =req.params;
//     const movie = await client.db("Movies").collection("moviesList").deleteOne({id:id});
//     //const movie = movies.find((mv)=>mv.id===id)
//     movie.deletedCount > 0 ? res.send(movie) : res.status(401).send({msg:"No Such Movie Found"});
// })
// router.put('/:id', async (req, res) => {
//     const data = req.body;
//     const {id} = req.params;
//     const result = await client.db("Movies").collection("moviesList").updateOne({id:id},{$set:data});
//     res.send(result);
// })

export const hallBookingRouter = router;