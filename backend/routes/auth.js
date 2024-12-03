const authenticator = require('../middleware/authentication')
const express = require('express')
const router = express.Router()
const {register,login,deleteUser,deleteAllUserr,getAll } = require('../controllers/auth')

router.get('/getall',authenticator,getAll)
router.post('/register',register)
router.post('/login',login)
router.delete('/deleteall',authenticator,deleteAllUserr)
router.delete('/:userId',authenticator,deleteUser)

module.exports =  router