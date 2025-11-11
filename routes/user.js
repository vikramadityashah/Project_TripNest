const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js").default;
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

let userController = require("../controllers/users.js")

router.route("/signup")
.get(userController.renderSignupForm)
.post( wrapAsync(userController.signUp))


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect : '/login',failureFlash : true}),userController.login)


router.get("/logout",userController.logOut)

module.exports = router;