const mongoose = require('mongoose')

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
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Topic', topicSchema)
