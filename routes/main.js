const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const forumController = require("../controllers/forumTopics")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/favorites", ensureAuth, postsController.getFavorites); //maybe delete this
router.get("/feed", postsController.getFeed);
router.get("/sellYourCar", homeController.getSellYourCar)
router.post("/addEmailToList", homeController.addEmailToList)//addEmailToList
router.get("/thankYou", homeController.getThankYou)
router.get("/emailList", homeController.getEmails)

router.get("/services", homeController.getServices)
router.get("/viewing", homeController.getViewing)
router.get("/servicing", homeController.getServicing)
router.get("/inspection", homeController.getInspection)

router.get("/contact", homeController.getContact)
router.get("/about", homeController.getAbout)

router.post('/review', homeController.newReview)

router.get("/forumFeed", ensureAuth, forumController.getForumFeed);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
