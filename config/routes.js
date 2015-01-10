var mongoose = require('mongoose'),
	taskManagement = mongoose.model('taskModel');

module.exports = function Routes(app) {
	app.get('/', function(req, res) { 
		// Get All Tasks
		taskManagement.find(function(err, tasks) {
			// finding tasks in db
			console.log(err);
			if(err) {
				console.log(err);
			}
			res.render('index', {
				title: 'List of Tasks',
				my_tasks: tasks,
				print_errors: 0,
			});
		});
	});
	
	app.post('/this_task/create', function(req, res) {
		// adding new task in db
		var submitted_task = new taskManagement(req.body);
		submitted_task.save(function(err, submitted_task) {
			if (err) {
				var input_errors = err.errors;
				console.log(input_errors);
				// Get All Tasks
				var get_all_tasks = taskManagement.find(function(err, tasks) {
					return tasks;
				});
			res.render('index', {
				title:"WIN",
				my_tasks: get_all_tasks,
				print_errors: input_errors
			});
			} else { res.redirect('/'); }
		});
	});

	app.post('/this_task/destroy', function(req, res) {
		var task = req.body;
		console.log('This is the task you are about to delete: ', task);
		taskManagement.remove( { _id: req.body.id }, function(err) {
			if(err) {
				return console.error(err)
			};
		});
		res.redirect('/');
	});
};