// var bcrypt = require('bcrypt');
// var jwtutils = require('../utils/jwt.utils.js');
var models = require('../../models');
const multer = require("multer");
const fs = require("fs");
const path = require('path')
// Routes
module.exports = {
    findAll: function (req, res) {
        models.User.findAll()
            .then(function (data) {
                return res.status(201).json({
                    'data': data
                })
            })
            .catch(function (error) {
                return res.status(500).json({
                    'error': error
                })
            })

    },
    create: function (req, res) {

        const email = req.body.email
        const name = req.body.name
        const phoneNumber = req.body.phoneNumber

        models.User.findOne({
            where: { email: email },
        })
            .then(function (FoundUser) {
                if (FoundUser) {
                    return res.status(500).json({
                        'error': " l'utilisateur existe deja dans la base de donnee "
                    })
                }
                else {

                    const RegisterUser = models.User.create({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        image: ""

                    }).then(function (RegisterUser) {
                        return res.status(201).json({
                            'user': RegisterUser
                        })
                    })
                        .catch(function (error) {
                            return res.status(500).json({
                                'error': error
                            })
                        })

                }
            })
            .catch(function (error) {
                return res.status(500).json({
                    'error': error
                })
            })
    },
    update: function (req, res) {
        const id = req.body.id
        const email = req.body.email
        const name = req.body.name
        const phoneNumber = req.body.phoneNumber
        models.User.findOne({ where: { id: id } })
            .then(function (user) {
                if (user) {
                    models.User.update({
                        name: name ? name : user.name,
                        email: email ? email : user.email,
                        phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber
                    },
                        {
                            where: { id: user.id }
                        }
                    )
                        .then(function (UpdateUser) {
                            return res.status(201).json({
                                'data': UpdateUser
                            })
                        })
                        .then(function (error) {
                            return res.status(500).json({
                                'error': error
                            })
                        })
                } else {
                    return res.status(500).json({
                        'error': "l'utilisateur existe deja dans la base de donnéé"
                    })
                }

            }).catch(function (error) {
                return res.status(500).json({
                    'error': error
                })
            })


    },
    delete: function (req, res) {
        var id = parseInt(req.body.id, 10);

        models.User.destroy({
            where: {
                id: id
            }
        }).then(function (user) {
            return res.status(201).json({
                'message': " l'utilisateur a été supprimer avec suces "
            })
        })
            .catch(function (error) {
                return res.status(500).json({
                    'error': error
                })
            })
    },
    findById: function (req, res) {

        var id = req.body.id;

        
        models.User.findOne({ where: { id: id } })
            .then(function (FoundUser) {
                if (FoundUser) {
                    return res.status(201).json({
                        'data': FoundUser
                    })

                } else {
                    return res.status(500).json({
                        'error': error
                    })


                }
            })
            .catch(function(error){
                return res.status(500).json({ 'error': error})
            })

    },
    deleteById:function(req, res){
        var id = req.body.id;

        
        models.User.findOne({ where: { id: id } })
            .then(function (FoundUser) {
                if (FoundUser) {
                    models.User.delete(FoundUser)
                   .then(function (user){
                    return res.status(201).json({
                        'message' : 'utilisateur supprimer avec succes'  
                    })
                   })
                   .catch(function(error){
                    return res.status(500).json({
                        'error' : 'echec de suppression'
                    })
                   })

                } else {
                    return res.status(500).json({
                        'error': error
                    })


                }
            }).catch(function(error){
                return res.status(500).json({
                    'error': error
                })

            })
    }
   

}