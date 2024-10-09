import AptitudeQuestionModel from "../models/aptitude/aptitudeQuestionModel.js";
import AptitudeTopicModel from "../models/aptitude/aptitudeTopicModel.js";
import AptitudeCategoryModel from "../models/aptitude/aptitudeCategoryModel.js";

// Add many questions to a topic
export const addManyQuestions = async (req, res) => {
	try {
		const { questions } = req.body;

		const processedQuestions = await Promise.all(
			questions.map(async (question) => {
				const topic = await AptitudeTopicModel.findOne({ name: question.topic });
				if (!topic) {
					throw new Error(`Topic '${question.topic}' not found`);
				}

				const categoryId = topic.categoryId;  

				if (!categoryId) {
					throw new Error(`Category not associated with Topic '${question.topic}'`);
				}

				return {
					...question,
					categoryId,  
					topicId: topic._id,  
				};
			})
		);

		const insertedQuestions = await AptitudeQuestionModel.insertMany(processedQuestions);

		res.status(201).json({ success: true, data: insertedQuestions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a single question
export const addSingleQuestion = async (req, res) => {
	try {
		const { topic: topicName, question, options, answer, explanation } = req.body;

		const topic = await AptitudeTopicModel.findOne({ name: topicName });
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}

		const newQuestion = new AptitudeQuestionModel({
			topic: topic._id,
			question,
			options,
			answer,
			explanation,
		});

		await newQuestion.save();

		res.status(201).json({ success: true, data: newQuestion });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get question by ID
export const getQuestionById = async (req, res) => {
	try {
		const question = await AptitudeQuestionModel.findById(req.params.id).populate("topic");
		if (!question) {
			return res.status(404).json({ success: false, message: "Question not found" });
		}
		res.status(200).json({ success: true, data: question });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all questions by topic ID
export const getAllQuestionsByTopicId = async (req, res) => {
	try {
		const questions = await AptitudeQuestionModel.find({ topic: req.params.topicId });
		res.status(200).json({ success: true, data: questions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all topics
export const getAllTopics = async (req, res) => {
	try {
		const topics = await AptitudeTopicModel.find().populate('category_name'); 
		res.status(200).json({ success: true, data: topics });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get single topic by ID
export const getTopicById = async (req, res) => {
	try {
		const topic = await AptitudeTopicModel.findById(req.params.id).populate('category_name');  
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get a topic by name
export const getTopicByName = async (req, res) => {
	try {
		const topic = await AptitudeTopicModel.findOne({ name: req.params.name }).populate('category_name'); 
		if (!topic) {
			return res.status(404).json({ success: false, message: "Topic not found" });
		}
		res.status(200).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add a new topic with category
export const addTopic = async (req, res) => {
	try {
		const { name, description, category_name } = req.body;

		const category = await AptitudeCategoryModel.findOne({ category_name });
		if (!category) {
			return res.status(404).json({ success: false, message: "Category not found" });
		}

		const topic = new AptitudeTopicModel({ categoryId: category._id, name, description });
		await topic.save();

		res.status(201).json({ success: true, data: topic });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add categories
export const addCategories = async (req, res) => {
	try {
		const { categories } = req.body;  

		if (!categories) {
			return res.status(400).json({ success: false, message: "Categories not found" });
		}

		const insertedCategories = await AptitudeCategoryModel.insertMany(categories);
		res.status(201).json({ success: true, data: insertedCategories });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};