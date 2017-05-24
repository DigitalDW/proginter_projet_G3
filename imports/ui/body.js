import { Template } from 'meteor/templating';
 
import { Events } from '../api/event.js';

import { Tasks } from '../api/task.js';

import { Checklists } from '../api/checklist.js';
 
import './body.html';

import './event.js';

import { ReactiveVar } from 'meteor/reactive-var';

//j'ai enlevé les helpers car les codes n'étaient jamais utilisés de façon réactive, donc aucun intérêt de les définir dans le JS
//événement du click sur le bouton -> effacer le header actuel et afficher l'autre header
Template.main.events({
  'click button': function(){
    console.log("You clicked on the 1st button");
    FlowRouter.go('form');
  }
});
var evenementID;
var taskID;
//événement sur le deuxième header + ajouter un événement à la BD
//@Radisa: events sert à ajouter des events (donc des comportements, comme un addEventListener) à un template
Template.formulaire.events({
  'click .end': function(){
    FlowRouter.go('home');
  }, // expliquer cette construction ci-dessous. --> la même que le tutoriel officiel de meteor
  'submit .new-event'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.text1.value;
    const desc = target.text2.value;
    const date = target.text3.value; 

    // appel de l'objet BD pour insérer l'événement
    if(name != ""){
      evenementID = Events.insert({
        name,
        desc,
        date
      });
      console.log(event);
      target.text1.value = '';
      target.text2.value = '';
      target.text3.value = '';

      //création d'une session pour "importer" la valeur du nom de l'événement dans le titre de la page
      Session.set('titreEv', name);

      let pathDef = "/evenement/:nom/:eventId"
      let params  = {nom: name, eventId: evenementID};
      let queryParams = {show: "y+e=s", color: "black"};
      FlowRouter.go(pathDef, params, queryParams);
    }else{
      alert("veuillez remplir le champ")
    }
  },
});

