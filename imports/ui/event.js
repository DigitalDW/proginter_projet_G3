import { Template } from 'meteor/templating';
import { Events } from '../api/event.js';
import { Tasks } from '../api/task.js';
import { Checklists } from '../api/checklist.js';
import './event.html';

import { ReactiveVar } from 'meteor/reactive-var';

//création de la page de l'événement: on récupère la valeur de la session "titreEv" pour faire correspondre le titre
Template.evenement.helpers({
  'titreEv': function(){
    let test = Session.get('titreEv');
    return test;
  },
  tasks() {
    let currentEv = Session.get('eventID');
    return Tasks.find( {fk: currentEv, finished: false }, { nom: 1 } );
  }
});

//events du template evenement
Template.evenement.events({
  'click .bt1': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("form2");
    formul.style.cssText="visibility:visible; position: absolute;";
    Session.set("counter",1);
  },
  'click .doing': function(){
    Meteor.call('tasks.checked', this._id, !this.checked);

  },
  'click .done': function(){
    Meteor.call('tasks.finish', this._id);
  },
  'click .delete': function(){
    let sur = confirm("Êtes-vous sûr de vouloir supprimer cette tâche? L'action est irréveressible");
    if(sur == true){
      Meteor.call('tasks.remove', this._id);
    }
  },
  'click .list-group-item': function(){
    Session.set("currentTaskName",this.nom);
    Session.set("currentTaskDesc",this.desc);
    Session.set("currentTaskType",this.type);
    Session.set("currentTask",this._id);
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:hidden; position:absolute;";
    let task = document.getElementById("task");
    task.style.cssText="visibility:visible; position: absolute;";
  },
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
  'change select': function(event,template){
    if( $(event.target).val() == "checklist"){
      template.checklisted.set(true);
      Session.set('checklisted',true);
    }else{
      template.checklisted.set(false);
      Session.set('checklisted',false);
    }
  },
  'click .plus': function(event){
    index = Session.get("counter");
    event.preventDefault();
<<<<<<< HEAD

    // J'ai changé le nom de ces 2 variables pour que ça soit plus clair pour moi
    // 

    let input = document.createElement("input");
    let span = document.createElement('span');
    let br = document.createElement("br");

    input.setAttribute("type","text");
    input.setAttribute("placeholder","nom");
    input.setAttribute("id","cl" + index);
    input.setAttribute("class", "form-control");
    
    span.setAttribute('class', "btn btn-default input-group-addon minus");
    span.setAttribute('data-id', "cl" + index);
    span.textContent = "-";
    // input.get
  
    champs.getElementsByTagName('div')[0].appendChild(input);
    champs.getElementsByTagName('div')[0].appendChild(span);
    champs.getElementsByTagName('div')[0].appendChild(br);

    Session.set("counter", Session.get("counter") + 1);
  },
  'click .minus': function(event) {
      // quand on clique sur une classe "minus", enlever l'input de l'HTML en concordance avec son data-id
      // c'est bien ta logique, non??
      let element = "récupérer l'élément courant";
      let dataId = element.dataset.id; // trouver un moyen de recevoir le data-id du .minus cliqué(Vaste chantier !)


      if (dataId === input.id) {
        // on supprime l'input + span
      }
=======
    let div = document.createElement("div");
    let d = document.createElement("input");
    let btn = document.createElement("button");
    div.setAttribute("id","d"+i)
    d.setAttribute("type","text");
    d.setAttribute("placeholder","nom");
    d.setAttribute("class","inputCl"+i);
    btn.setAttribute("id",i);
    btn.setAttribute("class","btn btn-primary delIn");
    btn.innerHTML="-";
    div.appendChild(d);
    div.appendChild(btn);
    champs.appendChild(div);
    Session.set("counter", Session.get("counter")+1);
>>>>>>> origin/master
  },
  'click .delIn': function(event){
    event.preventDefault();
    console.log(this);
    let bt = document.querySelector("button.delIn").id;
    console.log(bt);
  },
  'submit form': function(event,template){
    event.preventDefault();
    //récupération des valeurs
    let nom = event.target.nomT.value;
    let desc = event.target.descT.value;
    let type = event.target.typeT.value;
    //valeurs pas défaut
    let fk = Session.get('eventID');
    let checked = false;
    let finished = false;
    //ajout à la BD
<<<<<<< HEAD
    taskID = Tasks.insert({
      nom,
      desc,
      type,
      fk,
      checked,
      finished
    });

    let checklist = Session.get('checklisted'); // should return true | false
    let counter = Session.get("counter");
    let stat = 1;
    if(checklist){
      for(let i=0;i<counter;i++){
        if(document.getElementById("cl"+i).value !== null){
          console.log("hey");
          let cl = document.getElementById("cl"+i).value;
          Checklists.insert({
            cl,
            stat,
            taskID
          });
=======
    if(nom != ""){
      taskID = Tasks.insert({
        nom,
        desc,
        type,
        fk,
        checked,
        finished
      });
      let checklist = Session.get('checklisted');
      let counter = Session.get("counter");
      let stat = 1;
      if(checklist){
        for(let j=1;j<counter;j++){
          let inputs = document.querySelector("input.inputCl"+j);
          inputs.setAttribute("id","cl"+j)
        }
        for(let i=0;i<counter;i++){
          if(document.getElementById("cl"+i).value != null){
            console.log("hey");
            let cl = document.getElementById("cl"+i).value;
            Checklists.insert({
              cl,
              stat,
              taskID
            });
          }
>>>>>>> origin/master
        }
      }
      //reset des valeurs dans les champs et dans le choix multiple
      event.target.nomT.value = "";
      event.target.descT.value = "";
      event.target.typeT.value = "normal";
      template.checklisted.set(false);
      Session.set('checklisted',false);
      Session.set("counter", 1);
    }else{
      alert("remplissez au moins le nom de la tâche")
    }
<<<<<<< HEAD
    //reset des valeurs dans les champs et dans le choix multiple 
    // @moi : voilà pourquoi pas de message et champs vidés
    event.target.nomT.value = "";
    event.target.descT.value = "";
    event.target.typeT.value = "normal";
    template.checklisted.set(false);
    Session.set('checklisted',false);
    Session.set("counter", 1);
=======
>>>>>>> origin/master
  },
  //retour à la page "evenement" une fois que l'utilisateur a fini
  'click .end': function(event,template){
    event.preventDefault();
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("form2");
    formul.style.cssText="visibility:hidden; position: absolute;";
    document.getElementById("in1").value=""; // faire des getElementById
    document.getElementById("in2").value=""; // faire des getElementById
    document.getElementById("form-type").value="normal";
    template.checklisted.set(false);
    Session.set('checklisted',false);
    Session.set("counter", 1);
  }
});


Template.tâche.helpers({
  'titleT': function(){
    return Session.get("currentTaskName");
  },
  'descriT': function(){
    return Session.get("currentTaskDesc");
  },
  isAChecklist: function(){
    let taskType = Session.get('currentTaskType');
    if(taskType == "checklist"){
      isAChecklist = true;
    }else{
      isAChecklist = false;
    }
    return isAChecklist;
  },
  lists() {
    let currentT = Session.get('currentTask');
    //$ne = tout sauf...
    return Checklists.find( {taskID: currentT, stat: { $ne: 0 } }, { cl: 1 } );
  }
});

//events sur les tâches: changement de statut
Template.tâche.events({
  'click .clElement': function(){
    let nom = this.cl;
    let currentList = this._id;
    let conf = confirm("Vous occupez-vous de l'objet suivant: " + nom + " ?");
    
    if(conf == true){
      Checklists.update( { _id: currentList }, { $set: { stat: 0 } } );
    }
  },
  'click .retour': function(){
    let header = document.getElementById("evenement");
    header.style.cssText="visibility:visible; position:absolute;";
    let task = document.getElementById("task");
    task.style.cssText="visibility:hidden; position: absolute;";
  }
});