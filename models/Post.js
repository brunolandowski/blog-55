var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String,  },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	VerticalAlignImg:	{ type: Types.Select, required: true, initial: false, options: [
    	{ value: 'top', label: 'Top' },
    	{ value: 'middle', label: 'Middle' },
    	{ value: 'bottom', label: 'Bottom' }
	]},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
		
	},
	auteur: { type: Types.Relationship, required: true, initial: false, ref: 'PostAuthor', many: true },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, required: true, initial: false, },
	tags: { type: Types.Relationship, ref: 'PostTag', many: true, required: true, initial: false, },



});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
