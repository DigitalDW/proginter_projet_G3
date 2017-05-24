import { Template } from 'meteor/templating';
import { Events } from '../api/event.js';
import { Tasks } from '../api/task.js';
import { Checklists } from '../api/checklist.js';
import './event.html';

import { ReactiveVar } from 'meteor/reactive-var';

Template.evenement.onCreated(function(){
  let ev = FlowRouter.getParam('eventId');
  console.log(ev);
  if( Events.findOne( { _id: ev } ) == false){
    alert("L'événement que vous cherchez à accèder n'existe plus");
    FlowRouter.go("/");
  }
});
//création de la page de l'événement: on récupère la valeur de la session "titreEv" pour faire correspondre le titre
Template.evenement.helpers({
  'titreEv': function(){
    let nom = FlowRouter.getParam("nom");
    Session.set("titreEv", nom);
    let currentEvent = FlowRouter.getParam('eventId');
    let name = Events.findOne( { _id: currentEvent } );
    return name;
  },
  'descEv': function(){
    let currentEvent = FlowRouter.getParam('eventId');
    let descEv = Events.findOne( { _id: currentEvent } );
    return descEv;
  },
  'date': function(){
    let currentEvent = FlowRouter.getParam('eventId');
    let dateEv = Events.findOne( { _id: currentEvent } );
    return dateEv;
  },
  tasks() {
    let currentEvent = FlowRouter.getParam('eventId');
    Session.set("eventID", currentEvent);
    return Tasks.find( {fk: currentEvent, finished: false }, { nom: 1 } );
  }
});

//events du template evenement
Template.evenement.events({
  'click .bt1': function(){
    let nom = FlowRouter.getParam("nom");
    let currentEvent = FlowRouter.getParam('eventId');
    let pathDef = "/form-list/:nom/:eventId"
    let params  = {nom: nom, eventId: currentEvent };
    let queryParams = {show: "y+e=s", color: "black"};
    FlowRouter.go(pathDef, params, queryParams);
    Session.set("counter",1);
  },
  'click .bt2': function(event){
    event.preventDefault();
    let nom = FlowRouter.getParam("nom");
    let currentEvent = FlowRouter.getParam('eventId');
    let pathDef = "/evenement/:nom/:eventId"
    let params  = {nom: nom, eventId: currentEvent};
    let queryParams = {show: "y+e=s", color: "black"};
    let path = FlowRouter.path(pathDef, params, queryParams);
    let di = document.getElementById("smt");
    let al = document.createElement("div");
    let bt = document.createElement("button");
    let br = document.createElement("br");
    bt.innerHTML="&times;";
    bt.setAttribute("data-dismiss","alert");
    al.setAttribute("class","alert alert-info alert-dismissible show");
    al.setAttribute("role","alert");
    al.innerHTML="Envoyer ce lien aux personnes que vous souhaitez! \t : "+path;
    al.appendChild(br);
    al.appendChild(bt);
    di.appendChild(al);
    $(".alert").alert();
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
    let nom = FlowRouter.getParam("nom");
    let currentEvent = FlowRouter.getParam('eventId');
    let pathDef = "/tache/:nom/:eventId/:taskId"
    let params  = { nom: nom, eventId: currentEvent, taskId: this._id};
    let queryParams = {show: "y+e=s", color: "black"};
    FlowRouter.go(pathDef, params, queryParams);
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

    // J'ai changé le nom de ces 2 variables pour que ça soit plus clair pour moi
    // 

    let input = document.createElement("input");
    let span = document.createElement('span');
    let br = document.createElement("br");

    input.setAttribute("type","text");
    input.setAttribute("placeholder","nom");
    input.setAttribute("id","cl" + index);
    input.setAttribute("class", "form-control cl");
    
    span.setAttribute('class', "btn btn-default input-group-addon minus");
    span.setAttribute('data-id', "cl" + index);
    // span.dataset.id = 'cl' + index;
    span.textContent = "-";
    // input.get
  
    champs.getElementsByTagName('div')[0].appendChild(input);
    champs.getElementsByTagName('div')[0].appendChild(span);
    champs.getElementsByTagName('div')[0].appendChild(br);

    Session.set("counter", Session.get("counter") + 1);
  },
// ".minus".addEventListener('click', function(event) {})
  'click .minus': function(event) {
      // quand on clique sur une classe "minus", enlever l'input de l'HTML en concordance avec son data-id
      // c'est bien ta logique, non??
      let element = event.target.dataset.id; // @me : event.target se réfère à l'élément cliqué (--> <input cata-id="cl0">)

      let inputASuppr = document.querySelector('#' + element); // document.getElementById('cl0') ligne 51 event.html;
      let inputParent = inputASuppr.parentNode; // je récupère le parent (l'élément au dessus)

      inputParent.removeChild(champs.querySelector("span[data-id='" + element + "']")); // depuis le parent, je supprime les enfants
      
      inputParent.removeChild(inputASuppr); // idem

      Session.set("counter", Session.get("counter")-1);
      
  },


  'submit form': function(event,template){
    event.preventDefault();
    //récupération des valeurs
    let nom = event.target.nomT.value;
    let desc = event.target.descT.value;
    let type = event.target.typeT.value;
    let badge;
    type == "checklist" ? badge = true : badge = false;
    //valeurs pas défaut
    let fk = FlowRouter.getParam('eventId');;
    let checked = false;
    let finished = false;
// condition pour empêcher la mise des données vides dans la DB 
// else : executer ce qui suit (ajout in DB)
    //ajout à la BD de la tâche
    if(nom != ""){
      taskID = Tasks.insert({
      nom,
      desc,
      type,
      fk,
      checked,
      finished,
      badge
    });

    let checklist = Session.get('checklisted'); // should return true | false
    let counter = Session.get("counter");
    let stat = 1;

    // update de la DB avec les checklists
    if(checklist){
      //on récupère tous les inputs dans un tableau
      let inputs = document.querySelectorAll("input.cl");
      //met à jour l'id de chaque input -> id=cl0,cl1,cl2,...
      inputs.forEach((d,i) => d.id="cl"+i);
      //ajouter les elements clx à la base
      for(let i=0;i<counter;i++){
        if(document.getElementById("cl"+i).value !== null){
          console.log("hey");
          let cl = document.getElementById("cl"+i).value;
          Checklists.insert({
            cl,
            stat,
            taskID
          });
        }
      }
    }

    //reset des valeurs dans les champs et dans le choix multiple 
    // @moi : voilà pourquoi pas de message et champs vidés
    event.target.nomT.value = "";
    event.target.descT.value = "";
    event.target.typeT.value = "normal";
    template.checklisted.set(false);
    Session.set('checklisted',false);
    Session.set("counter", 1);

// on confirme que la tâche a bien été ajoutée à la DB
      alert("La tâche " + nom.toLowerCase() + " a été ajoutée ! \nAjouter une autre ou retour");
  }else{
    alert("il manque un nom");
  }

  },
  //retour à la page "evenement" une fois que l'utilisateur a fini
  'click .end': function(event,template){
    event.preventDefault();
    let nom = FlowRouter.getParam("nom");
    let currentEvent = FlowRouter.getParam('eventId');
    let pathDef = "/evenement/:nom/:eventId"
    let params  = {nom: nom, eventId: currentEvent};
    let queryParams = {show: "y+e=s", color: "black"};
    FlowRouter.go(pathDef, params, queryParams);
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
    let currTask = FlowRouter.getParam('taskId');
    let name = Tasks.findOne( { _id: currTask } );
    return name;
  },
  'descriT': function(){
    let currTask = FlowRouter.getParam('taskId');
    let descT = Tasks.findOne( { _id: currTask } );
    return descT;
  },
  isAChecklist: function(){
    let currTask = FlowRouter.getParam('taskId');
    console.log(currTask)
    let taskType = Tasks.findOne( { _id: currTask } );
    let lll = taskType.type;
    if(lll == "checklist"){
      isAChecklist = true;
    }else{
      isAChecklist = false;
    }
    return isAChecklist;
  },
  lists() {
    let currentT = FlowRouter.getParam("taskId")
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
    let nom = FlowRouter.getParam("nom");
    let currentEvent = FlowRouter.getParam('eventId');
    let pathDef = "/evenement/:nom/:eventId"
    let params  = {nom: nom, eventId: currentEvent};
    let queryParams = {show: "y+e=s", color: "black"};
    FlowRouter.go(pathDef, params, queryParams);
  }
});