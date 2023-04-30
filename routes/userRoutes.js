const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router()

const {signUp, login} = authController

router.post('/signup', signUp)
router.post('/login', login)


module.exports = router