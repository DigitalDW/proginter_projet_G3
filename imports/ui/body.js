import { Template } from 'meteor/templating';
 
import { Events } from '../api/event.js';
 
import './body.html';

import { ReactiveVar } from 'meteor/reactive-var';

//création des textes pour le header "mainbody"
Template.main.helpers({
  'titreM': function(){
    return 'Description';
  },
  'description': function(){
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae repellat architecto corrupti dolorum cumque iusto rerum ipsam dolorem odit sed ducimus sit maiores deserunt doloribus asperiores quasi, saepe aliquam. Quia.';
  },
  'styleM': function(){
    return '"width:350px;text-align:justify;"'
  },
  'bouton': function(){
    return 'Créer un événement';
  }
});

//événement du click sur le bouton -> effacer le header actuel et afficher l'autre header
Template.main.events({
  'click button': function(){
    console.log("You clicked on the 1st button");
    let header = document.getElementById("mainbody");
    header.style.cssText="visibility:hidden; position:absolute;";
    let formul = document.getElementById("form");
    formul.style.cssText="visibility:visible; position: absolute;";
  }
});

//création du deuxième formulaire
Template.formulaire.helpers({
  'titreF': function(){
    return 'Création événement';
  },
  'nomE': function(){
    return 'Nom';
  },
  'annuler': function(){
    return 'Annuler'
  },
  'desc': function(){
    return 'Vous voulez créer un événement et gérer son organisation? Rien de plus simple! Entrez un nom et appuyez sur la touche "Entrée" pour créer votre propre événement!'
  }
});

//événement sur le deuxième header + ajouter un événement à la BD
Template.formulaire.events({
  'click button': function(){
    let header = document.getElementById("mainbody");
    header.style.cssText="visibility:visible; position:absolute;";
    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;";
  },
  'submit .new-event'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.text.value;

    Events.insert({
      name,
    });
    target.text.value = '';

    let formul = document.getElementById("form");
    formul.style.cssText="visibility:hidden; position: absolute;";
  },
});

Template.body.helpers({
  event() {
    return Events.find({});
  },
});