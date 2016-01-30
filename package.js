Package.describe({
  name: 'q42:autovars',
  version: '0.1.0',
  summary: 'Reactive state management for Meteor + React',
  git: 'https://github.com/Q42/autovars',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // The package probably works with older versions
  api.versionsFrom('1.2.1');
  api.use('react@0.14.3');
  api.use('reactive-var@1.0.6');

  api.export('AutoVarMixin');
  api.addFiles('autovars.js');
});

Package.onTest(function(api) {
});
