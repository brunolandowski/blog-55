var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostTag Model
 * ==================
 */

var PostTag = new keystone.List('PostTag', {
    autokey: { from: 'name', path: 'key', unique: true },
});

PostTag.add({
 
    name: { type: String, required: true },

});

PostTag.relationship({ ref: 'Post', path: 'tag' });

PostTag.register();
