//importation des plugins et des collections

import { Template } from 'meteor/templating';
 
import { Events } from '../api/event.js';

import { Tasks } from '../api/task.js';

import { Checklists } from '../api/checklist.js';
 
import './body.html';

import './event.js';

import { ReactiveVar } from 'meteor/reactive-var';


Template.mainLayout.events({
  'click .head': function(event){
    event.preventDefault();
    FlowRouter.go('home');
  }
});
//événement du click sur le bouton -> redirige vers localhost:3000/formulaire
Template.main.events({
  'click button': function(){
    FlowRouter.go('form');
  }
});

//événement sur le template "formulaire"
Template.formulaire.events({
  'click .end': function(){
    FlowRouter.go('home');
  },
  //emploi de la méthode "subit" pour soumettre un formulaire
  'submit .new-event'(event) {
    //empêche le comportement par défaut
    event.preventDefault();

    //récupération des valeurs des inputs
    const target = event.target;
    const name = target.text1.value;
    const desc = target.text2.value;
    const date = target.text3.value; 

    //création d'une variable pour récupérer l'ID de l'événement lors de sa création et son ajout dans la base
    let evenementID;

    // vérification: est-ce que l'utiliateur remplis tous les champs obligatoires
    if(name != "" && date != ""){
      //ajout de l'événement si c'est le cas
      //l'événement a un nom, une description (si l'utilisateur le souhaite) et une date
      evenementID = Events.insert({
        name,
        desc,
        date
      });

      //réinitiallisation des inputs
      target.text1.value = '';
      target.text2.value = '';
      target.text3.value = '';

      //création d'un lien vers l'événement créé
      let pathDef = "/evenement/:nom/:eventId"
      let params  = {nom: name, eventId: evenementID};
      let queryParams = {show: "y+e=s", color: "black"};
      FlowRouter.go(pathDef, params, queryParams);
    }else{
      //alert si l'utilisateur n'a pas remplis tout les champs obligatoires
      alert("veuillez remplir les champs obligatoires")
    }
  },
});

