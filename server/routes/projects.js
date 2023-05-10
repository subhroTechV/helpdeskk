const router = require('express').Router();


const Project = require('../models/project.model');


router.route('/create').post((req, res) => {
    const name = req.body.name;

    const newProject = new Project({
    	name,
    });

    newProject.save()
        .then(() => res.json('Project successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req,res) => {
Project.findByIdAndDelete(req.params.id)
    .then(ticket => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

