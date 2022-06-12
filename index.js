import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import env from 'dotenv';
import { hallBookingRouter } from './routes/hall_booking.js';

const app = express();
env.config();
///console.log(process.env);
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const createConection = async () => {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo Db is Connected ✌ 😊 👌.");
    return client;
}
export const client = await createConection();
app.use(cors());
const hall_booking = [
    {
	"room": [{
		"id": "1",
		"available_seat": 100,
		"facility": "air-conditioning",
		"power": "with UPS",
		"price_per_hour": 5000,
		"booking_rooms": [
            {
			"customer_name": "Surjith Vijayakumar",
			"date": "13-June-2022",
			"start_time": "10.00",
			"end_time": "12.00",
			"room_id": "7"
		}],
		"booked_rooms": [
            {
				"room_name": "ac1-romm",
				"status": "Active",
				"customer_name": "Surjith Vijayakumar",
				"date": "13-June-2022",
				"start_time": "10.00",
				"end_time": "12.00",
				"booked_id": "1"
			},
			{
				"room_name": "ac2-romm",
				"status": "Active",
				"customer_name": "Kiran",
				"date": "14-June-2022",
				"start_time": "08.00",
				"end_time": "10.00",
				"booked_id": "2"
			}
		]
	}]
}
]

//express.json() //Converting to JSON 
app.use(express.json());
app.use("/hall-booking", hallBookingRouter);
app.get('/', (req, res) => {
    res.send(`Welcome to Hall Booking API in Port ${PORT} and endpoint is "/hall-booking"`)
})
// app.get('/hall-booking', async (req, res) => {
//     //const hall = await client.db("HallBookingAPI").collection("Hall").find({}).toArray();
// res.send(hall_booking);
// })
// app.post('/hall-booking', async (req, res) => {
//     const data = req.body;
//     //const result = await client.db("HallBookingAPI").collection("Hall").insertMany(data);
//     res.send(data);
// })




app.listen(PORT, () => console.log(`Local host running on ${PORT}`));