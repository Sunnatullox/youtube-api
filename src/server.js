import express from 'express';
import { connect, set } from "mongoose"
import { config } from 'dotenv'
config();

const app = express();

// ============================== MONGODB CONNECT ==========================

const mongoo_url = process.env.MONGODB_URL;
set("strictQuery", false)
connect(mongoo_url, {
	useNewUrlParser: true
}, () => {
	console.log("Connect to mongodb was successful ")
})

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
})
