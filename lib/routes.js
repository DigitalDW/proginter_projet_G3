FlowRouter.route('/', {
    name: "home",
    action(){
	    BlazeLayout.render('main');
    }
});

FlowRouter.route('/formulaire', {
	name: "form",
	action(){
		BlazeLayout.render('formulaire');
	}
});

FlowRouter.route('/evenement/:nom/:eventId', {
	name: 'event',
	action(){
		BlazeLayout.render('evenement');

	}
});

FlowRouter.route('/form-list/:nom/:eventId', {
	name: "form2",
	action(){
		BlazeLayout.render('formulaire2');
	}
});

FlowRouter.route('/tache/:nom/:eventId/:taskId', {
	name: 'task',
	action(){
		BlazeLayout.render('tâche');
	}
});