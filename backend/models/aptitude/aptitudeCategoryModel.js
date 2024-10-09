import mongoose from "mongoose";

const aptitudeCategoriesSchema = new mongoose.Schema({
	category_name: {
		type: String,
		required: true,
		unique: true,
	},
	category_description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const AptitudeCategoryModel =
	mongoose.models.AptitudeCategory || mongoose.model("AptitudeCategory", aptitudeCategoriesSchema);

export default AptitudeCategoryModel;
