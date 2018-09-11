const mailer = require('nodemailer');
const User = require('../models').User;
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    //Method for creating a user
    create(req, res) {
        if (!req.body.first_name){
            return res.status(400).send({
                message: 'The attribute first name cannot be null or empty.'
            });
        }

        if (!req.body.last_name){
            return res.status(400).send({
                message: 'The attribute last name cannot be null or empty.'
            });
        }

        if (!req.body.last_name){
            return res.status(400).send({
                message: 'The attribute organizer alias cannot be null or empty.'
            });
        }

        if (!req.body.email_address){
            return res.status(400).send({
                message: 'The attribute email cannot be null or empty.'
            });
        }

        if (!req.body.age){
            return res.status(400).send({
                message: 'The attribute age cannot be null or empty.'
            });
        }

        if (!req.body.gender){
            return res.status(400).send({
                message: 'The attribute gender cannot be null or empty.'
            });
        }

        if (!req.body.phone_number){
            return res.status(400).send({
                message: 'The attribute phone number cannot be null or empty.'
            });
        }

        if (!req.body.password){
            return res.status(400).send({
                message: 'The attribute password cannot be null or empty.'
            });
        }

       
        bcrypt.hash(req.body.password, null, null, (err, hash) => {

            return User
                .create({
                    confirmed: false,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    organizer_alias: req.body.organizer_alias,
                    email_address: req.body.email_address,
                    age: req.body.age,
                    gender: req.body.gender,
                    password: hash,
                    profile_pic: null,
                    phone_number: req.phone_number
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        });
    },

    confirm(req, res) {
        return User
            .find({
                where: {
                    uuid: req.params.uuid
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                
                return user
                    .update({
                        confirmed: true
                    })
                    .then(() => res.status(200).send(user)) // Send back the updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    //Method for listing users
    list(req, res) {

        return User
            .findAll({})
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

    //Method for retrieving a single user
    retrieve(req, res) {

        return User
            .findById(req.params.id, {})
            .then(user => {

                if (!user) {

                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },

    //Method to update a user
    update(req, res) {

        return User
            .findById(req.params.id, {})
            .then(user => {

                if (!user) {

                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                return user
                    .update({
                        confirmed: user.confirmed,
                        first_name: req.body.first_name || user.first_name,
                        last_name: req.body.last_name || user.last_name,
                        organizer_alias: req.body.organizer_alias || user.organizer_alias,
                        email_address: req.body.email_address || user.email_address,
                        age: req.body.age || user.age,
                        gender: req.body.gender || user.gender,
                        password: user.password,
                        profile_pic: null,
                        phone_number: req.phone_number || user.phone_number
                    })
                    .then(() => res.status(200).send(user)) // Send back the updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //Method to delete a user
    destroy(req, res) {

        return User
            .findById(req.params.id)
            .then(user => {

                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                return user
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'User deleted successfully',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(404).send(error));
    }
};