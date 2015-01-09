var mongoose = require('mongoose'),
	taskManagement = mongoose.model('taskModel');

module.exports = function Routes(app) {
	app.get('/', function(req, res) { 
		taskManagement.find(function(err, tasks) {
			if(err)
				return console.error(err);  
			res.render('index', {
				title: 'List of Tasks',
				my_tasks: tasks,
			});
		});
	});
	
	app.post('/this_task/create', function(req, res) {
		var a = new taskManagement(req.body);
		a.save(function(err, a) {
			console.log(err, a);
			res.redirect('/');
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