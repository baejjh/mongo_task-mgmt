var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
	name: String,
	priority: String,
	deadline: { type: Date },
	created: { type: Date, default: Date.now },
	hidden: Boolean,
});

taskSchema.path('name').required(true, 'Task name cannot be blank');
taskSchema.path('priority').required(true, 'Priority level cannot be blank');
taskSchema.path('deadline').required(true, 'Deadline cannot be blank');

mongoose.model('taskModel', taskSchema);