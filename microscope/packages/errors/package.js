Package.describe({
  name: 'wallebot:errors',
  version: '1.0.0',
  summary: 'A pattern to display application errors to the user',
});

Package.onUse(function(api, where) {
  api.versionsFrom('0.9.0');

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
    api.export('Errors');
});