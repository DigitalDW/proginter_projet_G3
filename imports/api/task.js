import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('task');

Meteor.methods({
	'tasks.remove'(taskID){
		Tasks.remove(taskID);
	},
	'tasks.checked'(taskID, setChecked){
		Tasks.update(taskID, { $set: { checked: setChecked } } );
	},
	'tasks.finish'(taskID){
		Tasks.update(taskID, { $set: { finished: !this.finished } } );
	}
})