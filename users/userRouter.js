const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error adding the user' });
        });
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting users list' });
    });

});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    Users.getById(id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: 'invalid user id' });
            }
        })
        .catch(error => {
            res.status(400).json({ message: 'there was an issue looking up the user ID' });
        });
};

function validateUser(req, res, next) {
    if(req.body && Object.keys(req.body).length > 0) {
        next();
    } else {
        res.status(400).json({ message: "missing user data" });
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
