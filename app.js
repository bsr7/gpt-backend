import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";

dotenv.config(); // Load the .env file

const app = express();
const port = 5001;

// use middleware to parse json request bodies
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.get("/hello-world", async (req, res) => {
	try {
		res.status(200).json({ message: "Hello, world!" });
	} catch (error) {
		console.error("Error sending hello message: ", error);
	}
});

app.post("/chat", async (req, res) => {
	const model = req.body.model;
	const messages = req.body.messages;

	try {
		const response = await openai.chat.completions.create({
			model: model,
			messages: messages,
		});
		console.log("Hit backend successfully");
		res.status(200).json(response.choices[0].message);
	} catch (error) {
		console.error("Error fetching response: ", error);
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
