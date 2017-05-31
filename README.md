<h1> Event.Org - README </h1>

<h3> <i>Event.Org ver 1.0</i> </h3>

<p><i>Loris Rimaz, Radisa Petkovic, Florence Chollet et Alexandre Progin</i></p>

<p style="text-align:justify;">Projet dans le cadre du cours : Programmation pour Internet II de Isaac Pante Faculté des Lettres - Université de Lausanne - Février à Mai 2017 Github : https://github.com/DigitalDW/proginter_projet_G3</p>

<h2>Description</h2>

<p style="text-align:justify;">Le projet Event.Org a pour but de proposer une plateforme sur laquelle il est possible de gérer l'organisation d'un événement en groupe. On peut créer un événement et y assigner des tâches. La gestion se fait avec l'utilisation de la méthode Kanban, qui propose 3 états pour un tâche: pas faite, en cours, faite. De ce fait, le statut d'une tâche peut être modifié à la guise de l'utilisateur.</p>

<p style="text-align:justify;">Le public cible de cette application est très large. En effet, il ne vise pas une tranche d'âge en particulier, ni un niveau prérequis de connaissances en informatique. En effet, le service s'apparente le plus possible à <a href="http://doodle.com/fr/"> Doodle </a>. L'application a pour but d'être simple d'utilisation et accessible aux plus de monde possible. Grâce à l'application, un maximum de personnes peuvent gerer l'organisation d'un événement aisément et à tout moment.</p>

<h2>Interface</h2>

<p style="text-align:justify;">Ci-dessous se trouve les différentes étapes d'utilisation</p>

<p style="text-align:justify;">L'utilisateur arrive sur la page d'accueil, clique sur "créer un événement" et arrive sur le formulaire de création d'événement. Ensuite, il rempli le formulaire et crée son événement. De là, il arrive sur la page de l'événement, sur laquelle il y a le nom, la description et la date de l'événement. La liste de tâches est vide, mais il peut la remplir en cliquant sur "ajouter une tâche". Il arrive alors sur un formulaire qu'il peut remplir. S'il souhaite ajouter une check liste dans la tâche, il peut séléctionner "checklist", ajouter des inputs et en supprimer et cliquer sur "ajouter". Une alerte indique que la tâche a été ajoutée et l'utilisateur peut alors retourner sur la page de l'événement sur laquelle les tâches ajoutées sont désormais affichées. En cliquant sur une tâche, l'utilisateur peut afficher les détails de la tâche qui s'affichent en dessous de la liste. De là, il peut soit fermer la zone d'affichage, soit valider des élément de la check liste. S'il appuie sur le bouton orange "...", alors la tâche change de couleur pour indiquer son changement de statut, s'il appuie sur le bouton vert, la tâche est validée et n'est plus affichée et s'il appuie sur le bouton blanc (avec la croix), la page demande si l'utilisateur veut supprimer la tâche et s'il le veut, la tâche est supprimée de la base de données. Pour finir, l'utilisateur peut partager l'événement, soit partager le lien de l'événement et l'envoyer aux utilisateurs qui doivent aider à l'organisation</p>

<h2>Base de données</h2>

<p style="text-align:justify;">Il y a trois collections: Events, Tasks et Lists. Les “tasks” contiennent une foreign key qui
est l’id de l’événement correspondant, ce qui permet de lier les deux collections.
D’autres parts, les “lists”, qui représentent les éléments des check listes ont aussi une
foreign qui mais qui correspond avec l’id de la tâche. De ce fait, la hiérarchie des
collections est la suivante: Events > Tasks > Lists. Sans Event, ni tâche ni liste ne
peuvent être créées</p>

<h2>Licence</h2>

<p>Ce programme est un logiciel gratuit.</p>

<p style="text-align:justify;"> Event.Org a été développé avec le framework de développement web en Javascript Meteor dans sa version 1.4.4. </p>

<p>Les principaux modules Meteor utilisés dans ce projet sont :</p>

<ul>
	<li>Session (variables universelles)</li>
	<li>reactiveVar (variables réactives)</li>
	<li>Flow Router (les liens)</li>
	<li>Blaze Layout (render des templates)</li>
	<li>JQuery</li>
	<li>Bootstrap (style)</li>
</ul>

<p style="text-align:justify;">Certaines libraries et modules utilisés pour le développement sont parfois soumis à un copyright par leurs auteurs respectifs.</p>



<h2>Documentation utile</h2>

<p>Tutoriels meteor:</p>
<ul>
		<li> http://meteortips.com/ </li>
		<li> https://www.meteor.com/tutorials/blaze/creating-an-app </li>
</ul>

<p>Tutoriels pour les différents plugins:</p>
<ul>
		<li> https://themeteorchef.com/tutorials/reactive-dict-reactive-vars-and-session-va </li>
		riables  (Session et ReactiveVat)
		<li> https://github.com/kadirahq/flow-router  (Flow router) </li>
		<li> https://old.kadira.io/academy/meteor-routing-guide/content/introduction-to-flo
		w-router  (Flow Router) </li>
		<li> https://www.youtube.com/watch?v=nOJ0hfVo368  (Flow Router) </li>
		<li> https://hackerthemes.com/bootstrap-cheatsheet/  (Bootstrap) </li>
</ul


<p style="text-align:justify;">
Copyright © 2017 - l'équipe de développement de Event.Org : Loris Rimaz - Radisa Petkovic - Florence Chollet - Alexandre Progin</p>
