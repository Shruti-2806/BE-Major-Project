import express from "express";
import {
	addManyQuestions,
	addSingleQuestion,
	getQuestionById,
	getAllQuestionsByTopicId,
	getTopicByName,
	getAllTopics,
	getTopicById,
	addTopic,
	addCategories,
	getCategories,
} from "../controllers/aptitudeController.js";

const aptitudeRouter = express.Router();

// Question Routes
aptitudeRouter.post("/questions/addmany", addManyQuestions); // Add multiple questions
// aptitudeRouter.post("/questions", addSingleQuestion); // Add a single question
aptitudeRouter.get("/questions/:id", getQuestionById); // Get a question by ID
aptitudeRouter.post("/questions", getAllQuestionsByTopicId); // Get all questions by topic ID

// Topic Routes
aptitudeRouter.post("/topics", getAllTopics); // Get all topics
aptitudeRouter.post("/topics/add", addTopic); // Add a topic
aptitudeRouter.get("/topics/:id", getTopicById); // Get a topic by ID
aptitudeRouter.get("/topics/name/:name", getTopicByName); // Get a topic by name

// Category Routes
aptitudeRouter.post("/categories/add", addCategories); // Add multiple categories
aptitudeRouter.get("/categories", getCategories);

export default aptitudeRouter;
