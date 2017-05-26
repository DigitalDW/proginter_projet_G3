//LES LIENS

//lien de la page d'accueil (appelée "home")
//choix de l'url
FlowRouter.route('/', {
	//création du nom pour référencer le lien
    name: "home",
    //création des actions (ici, charger le template "main")
    action(){
	    BlazeLayout.render('main');
    }
});

//même structure
FlowRouter.route('/formulaire', {
	name: "form",
	action(){
		BlazeLayout.render('formulaire');
	}
});

//ajout de paramètres dans l'url
//cela a pour but de récupérer des valeurs de l'input pour la génération de la page
FlowRouter.route('/evenement/:nom/:eventId', {
	name: 'event',
	action(){
		BlazeLayout.render('evenement');

	}
});

//même
FlowRouter.route('/form-list/:nom/:eventId', {
	name: "form2",
	action(){
		BlazeLayout.render('formulaire2');
	}
});

//même
FlowRouter.route('/tache/:nom/:eventId/:taskId', {
	name: 'task',
	action(){
		BlazeLayout.render('tâche');
	}
});