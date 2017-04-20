import { Template } from 'meteor/templating';
 
import { Events } from '../api/event.js';
 
import './body.html';

import { ReactiveVar } from 'meteor/reactive-var';

//j'ai enlevé les helpers car les codes n'étaient jamais utilisés de façon réactive, donc aucun intérêt de les définir dans le JS
//événement du click sur le bouton -> effacer le header actuel et afficher l'autre header
Template.main.events({
  'click button': function(){
    console.log("You clicked on the 1st button");
    let header = document.getElementById("mainbody");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("form");
    formul.style.cssText="visibility:visible; position: absolute;";
    // j'ai parametré la visibilité du 3e écran... dans la suite aussi
    let evenement =document.getElementById("evenement");
    evenement.style.cssText="visibility:hidden; position:absolute;";
  }
});

//événement sur le deuxième header + ajouter un événement à la BD
//@Radisa: events sert à ajouter des events (donc des comportements, comme un addEventListener) à un template
Template.formulaire.events({
  'click button': function(){
    let header = document.getElementById("mainbody");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;";


  }, // expliquer cette construction ci-dessous.
  'submit .new-event'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.text.value; // récupération du nom de l'événement

    console.log(event);

    // appel de l'objet BD pour insérer l'événement
    Events.insert({
      name,
    });
    target.text.value = '';

    //création d'une session pour "importer" la valeur du nom de l'événement dans le titre de la page
    Session.set('titreEv', name);

    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;"; 

    // création d'une nouvelle variable pour retourner le contenu html "evenement"
    // et ensuite on le rend visible

    let evenement = document.getElementById('evenement');
    evenement.style.visibility = 'visible';
  },
});

Template.evenement.helpers({
  'titreEv': function(){
    let test = Session.get('titreEv');
    return test;
  }
});

Template.evenement.events({
  'click button': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("form2");
    formul.style.cssText="visibility:visible; position: absolute;";
  }
});