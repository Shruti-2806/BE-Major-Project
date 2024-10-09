import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AptitudeCategory",
		required: true,
	},
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AptitudeTopic",
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	options: {
		type: [String],
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	explanation: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const AptitudeQuestionModel =
	mongoose.models.AptitudeQuestion || mongoose.model("AptitudeQuestion", questionSchema);

export default AptitudeQuestionModel;
