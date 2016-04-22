Router.configure({
 layoutTemplate: 'layout',
 loadingTemplate: 'loading',
 notFoundTemplate: 'notFound',
 waitOn: function() { 
 	return [Meteor.subscribe('notificatoins')]
 }
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return {posts: Posts.find({}, this.findOptions())};
	},
	data: function() {
		var hasMore = this.posts.count() === this.postsLimit();
		var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
		return {
			posts: this.posts(),
			nextPath: hasMore ? nextPath: null
		};
	}
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
 name: 'postPage',
 waitOn: function() {
 	return Meteor.subscribe('comments', this.params._id);
 },
 data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id);}
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/:postslimit?', {
	name: 'postsList',
});

var requireLogin = function() {
 if (! Meteor.user()) {
 if (Meteor.loggingIn()) {
 this.render(this.loadingTemplate);
 } else {
 this.render('accessDenied');
 }
 } else {
 this.next();
 }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});