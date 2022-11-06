const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", postsController.getPost);

router.post("/createPost", upload.fields([{ name: "exteriorFiles", maxCount: 10}, { name: "interiorFiles", maxCount: 10}, { name: "documentFiles", maxCount: 10}]), postsController.createPost);

router.put("/updatePost/:id", postsController.updatePost);

router.put("/favoritePost/:id", postsController.favoritePost);

router.put("/deleteFavorite/:id", postsController.deleteFavorite);

router.put("/makePrivate/:id", postsController.makePrivate);

router.put("/makePublic/:id", postsController.makePublic);

router.delete("/deletePost/:id", postsController.deletePost);

router.put("/togglePrivatePublic/:id", postsController.togglePrivatePublic);


module.exports = router;
