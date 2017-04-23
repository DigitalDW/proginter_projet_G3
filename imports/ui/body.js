import { Template } from 'meteor/templating';
 
import { Events } from '../api/event.js';

import { Tasks } from '../api/task.js';

import { Checklists } from '../api/checklist.js';
 
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
var evenementID;
var taskID;
//événement sur le deuxième header + ajouter un événement à la BD
//@Radisa: events sert à ajouter des events (donc des comportements, comme un addEventListener) à un template
Template.formulaire.events({
  'click button': function(){
    let header = document.getElementById("mainbody");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;";


  }, // expliquer cette construction ci-dessous. --> la même que le tutoriel officiel de meteor
  'submit .new-event'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.text.value; // récupération du nom de l'événement

    console.log(event);

    // appel de l'objet BD pour insérer l'événement
    evenementID = Events.insert({
      name,
    });
    target.text.value = '';

    //création d'une session pour "importer" la valeur du nom de l'événement dans le titre de la page
    Session.set('titreEv', name);
    Session.set('eventID', evenementID);

    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;"; 

    // création d'une nouvelle variable pour retourner le contenu html "evenement"
    // et ensuite on le rend visible

    let evenement = document.getElementById('evenement');
    evenement.style.visibility = 'visible';
  },
});

//création de la page de l'événement: on récupère la valeur de la session "titreEv" pour faire correspondre le titre
Template.evenement.helpers({
  'titreEv': function(){
    let test = Session.get('titreEv');
    return test;
  },
  //affichage des tâches (on récupère le nom dans la BD en spécifiant que la forreign key de la tâche doit correspondre à l'id de l'événement actuel et on n'affiche que les tâches qui sont "en cours" (status: 1) ou simplement pas faite (status 2), donc tout sauf "faite" (status: 0))
  tasks() {
    let currentEv = Session.get('eventID');
    return Tasks.find( {fk: currentEv, status: { $ne: 0 } }, { nom: 1 } );
  },
});

//events
Template.evenement.events({
  'click button': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("form2");
    formul.style.cssText="visibility:visible; position: absolute;";
  },
  //au clique sur une tâche, on récupère les valeur id, nom et desc de la tâche sur laquelle on appuie et on charge le template "tâche"
  'click .tache': function(){
    let tacheID = this._id;
    Session.set('currentTask', tacheID);
    let tacheName = this.nom;
    Session.set('currentTaskName', tacheName);
    let tacheDesc = this.desc;
    Session.set('currentTaskDesc', tacheDesc);
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("task");
    formul.style.cssText="visibility:visible; position: absolute;";
  }
});

Template.formulaire2.onCreated(function(){
  this.checklisted = new ReactiveVar( false );
  Session.set('checklisted',false);
});

Template.formulaire2.helpers({
  checklisted: function(){
    return Template.instance().checklisted.get();
  }
})
//formulaire d'ajout de tâche, formulation similaire mais différente de l'ajout d'un event à la BD
Template.formulaire2.events({
  'change select': function( event, template ){
    if( $(event.target).val() == "checklist"){
      template.checklisted.set(true);
      Session.set('checklisted',true);
    }else{
      template.checklisted.set(false);
      Session.set('checklisted',false);
    }
  },
  'input #cli': function(event,template){
    event.preventDefault();

    var number = event.currentTarget.value;
    Session.set('cln',number);
    let champs = document.getElementById("champs");
    for(let i=1;i<=number;i++){
      let d = document.createElement("input");
      let b = document.createElement("br");
      d.setAttribute("type","text");
      d.setAttribute("placeholder","nom");
      d.setAttribute("id","cl"+i);
      champs.appendChild(d);
      champs.appendChild(b);
    }
  },
  'submit form': function(event,template){
    event.preventDefault();
    //récupération des valeurs
    let nom = event.target.nomT.value;
    let desc = event.target.descT.value;
    let type = event.target.typeT.value;
    //valeurs pas défaut
    let fk = Session.get('eventID');
    let status = 2;
    //ajout à la BD
    taskID = Tasks.insert({
      nom,
      desc,
      type,
      fk,
      status
    });

    let cln = Session.get('cln');
    let checklist = Session.get('checklisted');
    let stat = 1;
    if(checklist){
      for(let i=1;i<=cln;i++){
        console.log("hey");
        let cl = document.getElementById("cl"+i).value;
        Checklists.insert({
          cl,
          stat,
          taskID
        });
      }
    }
    //reset des valeurs dans les champs et dans le choix multiple
    event.target.nomT.value = "";
    event.target.descT.value = "";
    event.target.typeT.value = "normal";
    template.checklisted.set(false);
    alert('Tâche ajoutée. Vous pouvez en ajouter une autre, ou appuyer sur "terminé" pour revenir à la page précédente')
  },
  //retour à la page "evenement" une fois que l'utilisateur a fini
  'click .end': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("form2");
    formul.style.cssText="visibility:hidden; position: absolute;";
    return false;
  }
});

//page des tâches -> récupération du titre et de la description
Template.tâche.helpers({
  'titleT': function(){
    return Session.get('currentTaskName')
  },
  'descriT': function(){
    return Session.get('currentTaskDesc')
  }
});

//events sur les tâches: changement de statut
Template.tâche.events({
  //retour en arrière
  'click .cancel': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("task");
    formul.style.cssText="visibility:hidden; position: absolute;";
  },
  //changement en "en cours" (status: 1)
  'click .doing': function(){
    let cT = Session.get('currentTask');
    Tasks.update( { _id: cT }, { $set: { status: 1 } } );
  },
  //changement en "fait" (status: 0)
  'click .done': function(){
    let cT = Session.get('currentTask');
    Tasks.update( { _id: cT }, { $set: { status: 0 } } );
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("task");
    formul.style.cssText="visibility:hidden; position: absolute;";
  },
  //annulation des changement de statut (status: 2)
  'click .reset': function(){
    let cT = Session.get('currentTask');
    Tasks.update( { _id: cT }, { $set: { status: 2 } } );
  }
});