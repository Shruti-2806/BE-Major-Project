import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AptitudeCategory",
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const AptitudeTopicModel =
	mongoose.models.AptitudeTopic || mongoose.model("AptitudeTopic", topicSchema);

export default AptitudeTopicModel;
