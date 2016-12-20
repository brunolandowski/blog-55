var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostAuthor Model
 * ==================
 */

var PostAuthor = new keystone.List('PostAuthor', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostAuthor.add({
	name: { type: String, required: true },
	position: { type: Types.Text },
	image: { type: Types.CloudinaryImage },

});

PostAuthor.relationship({ ref: 'Post', path: 'auteur' });

PostAuthor.register();
