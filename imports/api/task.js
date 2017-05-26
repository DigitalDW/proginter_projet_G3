import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('task');

//création de méthodes pour répartir le code
Meteor.methods({
	//supprimer une tâche en fonction de son ID
	'tasks.remove'(taskID){
		Tasks.remove(taskID);
	},
	//changer le statut "checked" d'une tâche en fonction de son ID
	'tasks.checked'(taskID, setChecked){
		Tasks.update(taskID, { $set: { checked: setChecked } } );
	},
	//changer le statut "finished" d'une tâche en fonction de son ID
	'tasks.finish'(taskID){
		Tasks.update(taskID, { $set: { finished: !this.finished } } );
	}
})