const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js").default
const {isLoggedIn, isOwner, validlisting} = require("../middleware.js");

const multer  = require('multer') //for parse the form data we use multer.....
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }) // multer save the files in upload folder.......

const listController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listController.index))
.post(isLoggedIn,upload.single("image"),wrapAsync(listController.createlisting));


// 3...new route
router.get("/new",isLoggedIn, listController.renderNewForm);


router.route("/:id")
.get(validlisting, wrapAsync(listController.showlisting))
.put(isLoggedIn,isOwner,upload.single("image"),wrapAsync(listController.updatelisting))
.delete(isLoggedIn,isOwner,wrapAsync(listController.deletelisting))



// 5...edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listController.editlisting));


module.exports = router;
