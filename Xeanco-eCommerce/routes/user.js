const express = require('express')
const router = express.Router()
const {requireSignIn, isAdmin, isAuth} = require('../controllers/auth')
const {userById, read, update, purchaseHistory} = require('../controllers/user')


// the problem with this is that once the user logs in, he can acess others 
// profile as well, therefore we need to create 2 middlewares
// https://stackoverflow.com/questions/29586463/nodejs-express-profile-property-in-request 
router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

// creating 2 middlewares

router.get('/user/:userId', requireSignIn, isAuth, read)
router.put('/user/:userId', requireSignIn, isAuth, update)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)
// our custom middleware, whenever there is a parameter like userId, userById will
// automatically be triggered and user information will be available in req.profile
router.param('userId', userById)
module.exports = router
