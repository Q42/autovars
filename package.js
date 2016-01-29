Package.describe({
  name: 'q42:autovars',
  version: '0.1.0',
  summary: 'Reactive state management for Meteor + React',
  git: 'https://github.com/Q42/autovars',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.export('AutoVarMixin');
  api.addFiles('autovars.js');
});

Package.onTest(function(api) {
});
