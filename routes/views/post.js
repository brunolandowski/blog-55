var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	
	};
	locals.data = {
		posts: [],
		categories: [],
		auteur: [],
		tags: [],
	};

	
	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load all the tags
	view.on('init', function (next) {

		keystone.list('PostTag').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {

				return next(err);
			}

			locals.data.tags = results;

			// Load the counts for each category
			async.each(locals.data.tags, function (tags, next) {

				keystone.list('Post').model.count().where('tags').in([tags.id]).exec(function (err, count) {
					tags.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories auteur tags');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	

	// Render the view
	view.render('post');
};
