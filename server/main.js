import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

//on importe les collections

import '../imports/api/event.js';

import '../imports/api/task.js';

import '../imports/api/checklist.js';

