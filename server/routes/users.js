const router = require('express').Router();


const User = require('../models/user.model');


router.route('/create').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const newUser = new User({
    	name,
    	email,
    	role,
    });

    newUser.save()
        .then(() => res.json('User successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req,res) => {
User.findByIdAndDelete(req.params.id)
    .then(ticket => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

