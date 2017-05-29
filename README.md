Event.Org

Loris Rimaz, Radisa Petkovic, Florence Cholet, Alexandre Progin

Prototype avancé et fonctionnel

Le projet Event.Org a pour but de proposer une plateforme sur laquelle il est possible de gérer l'organisation d'un événement en groupe.
De ce fait, le programme propose de créer un événement qu'il est possible de partager aux autres utilisateurs supposés aider. 
De là, on peut ajouter des tâches et elles s'afficheront sur la page de l'événement. 
On peut modifier le statut d'une tâche à l'aide d'un set de trois boutons: en cours, terminé et supprimer.
On peut encore développer le contenu de la tâche qui s'affichera en dessous de la liste des tâches.


Utilisation

	- Créer un événement -> cliquez sur "créer un événement" et remplissez au minimum les champs obligatoire. Ensuite, cliquez sur "confirmer"
	- Ajouter une tâche -> cliquez sur "ajouter une tâche", remplissez le formulaire avec au moins un nom de tâche
	- Changement de statut -> une fois la tâche ajoutée, appuyez sur "retour". La tâche s'affiche sur la page de l'événement. Cliquez sur les trois bouton pour la modifier (dans l'ordre: en cours, terminée et supprimer)
	- Créer une check liste -> "créer un tâche", un nom et sélectionner "checklist". Ajouter ou supprimer des inputs grâce aux boutons. Cliquez sur "ajouter"
	- Valider une checklist -> cliquez sur la tâche contenant une checklist (badge). La tâche s'affiche en dessous de la liste. Cliquez sur un élément de la checklist et validez


Documentation

	Tutoriels meteor:
		- http://meteortips.com/
		- https://www.meteor.com/tutorials/blaze/creating-an-app
	Tutoriels pour les différents plugins:
		- https://themeteorchef.com/tutorials/reactive-dict-reactive-vars-and-session-va
		riables  (Session et ReactiveVat)
		- https://github.com/kadirahq/flow-router  (Flow router)
		- https://old.kadira.io/academy/meteor-routing-guide/content/introduction-to-flo
		w-router  (Flow Router)
		- https://www.youtube.com/watch?v=nOJ0hfVo368  (Flow Router)
		- https://hackerthemes.com/bootstrap-cheatsheet/  (Bootstrap)


Bugs connus: quand on appuie sur le "retour" depuis le formulaire d'ajout de liste, la console fait une erreur mais le programme fonctionne
Parfois (quand on charge directement le lien d'une tâche), la console indique que le "type" ne peut pas être lu. Du coup, parfois la tâche s'affiche correctement, parfois non.
