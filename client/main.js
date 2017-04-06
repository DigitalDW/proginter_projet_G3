import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
	'PH': function(){
		return 'Entrez le nom ici'
	},
	'creerE': function(){
		return 'Valider et créer';
	},
	'annuler': function(){
		return 'annuler';
	}
});

//événement sur le deuxième header (ne fonctionne pas encore)
Template.formulaire.events({
	'click button': function(){
		if(this.class=="bt1"){
			console.log("You clicked on the 2nd button");
			let formul = document.getElementById("form");
			formul.style.cssText="visibility:hidden; position: absolute;";
		}else{
			console.log("You clicked on the 3rd button");
			let header = document.getElementById("mainbody");
			header.style.cssText="visibility:visible; position:absolute;";
			let formul = document.getElementById("form");
			formul.style.cssText="visibility:hidden; position: absolute;";
		}
	}
});