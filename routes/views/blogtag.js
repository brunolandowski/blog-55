var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'home';
	locals.filters = {
		
		tags: req.params.tags,

	};

	locals.data = {
		posts: [],
		categories: [],
		auteur: [],
		tag: [],
	};

	// Load all the authors
	

	// Load all the tags
	view.on('init', function (next) {

		keystone.list('PostTag').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.taggy = results;

			// Load the counts for each category
			async.each(locals.data.taggy, function (taggy, next) {

				keystone.list('Post').model.count().where('taggy').in([taggy.id]).exec(function (err, count) {
					taggy.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});
	

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
	

	// Load the current tags filter
	view.on('init', function (next) {

		if (req.params.tags) {
			keystone.list('PostTag').model.findOne({ key: locals.filters.tags }).exec(function (err, result) {
				locals.data.tags = result;
				next(err);
			});
		} else {
			next();
		}
	});

	

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 13,
			maxPages: 13,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories auteur tags');

		if (locals.data.tags) {
			q.where('tags').in([locals.data.tags]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
