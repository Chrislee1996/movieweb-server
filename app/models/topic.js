const mongoose = require('mongoose')

const commentSchema = require('./comment')

const topicSchema = new mongoose.Schema(
	{
		Header: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		comments:[commentSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Topic', topicSchema)
