const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      //const favs = await req.user.favorites.find({ user: req.user.id})
      const posts = await Post.find({ _id: { $in : req.user.favorites}});
      res.render("favorites.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 1 }).lean();
      //const posts = allPosts.filter((e)=> e.publicOrPrivate == "public")
      res.render("feed.ejs", { posts: posts, user: req.user });
      
    } catch (err) {
      console.log(err);
    }
  },
  getFeedZtoA: async (req, res) => {
    try {
      const allPosts = await Post.find().sort({ cocktailName: -1 }).lean();
      const posts = allPosts.filter((e)=> e.public !== false)
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
      //console.log(post)
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.files.thumbNail)
    console.log(req.files.length)
    try {
      let exteriorResult,
      interiorResult,
      documentResult;

      let exteriorImgUrlArray = []
      let interiorImgArray = []
      let documentImgArray = []
      let cloudinaryIDArray = []

      // let thumbNail = await cloudinary.uploader.upload(req.file.thumbNail.path, {
      //   public_id: `${req.body.make}-${req.body.model}-${req.body.year}`,
      //   background_removal: 'cloudinary_ai',
      //   notification_url: ""
      // })

      for (let i = 0; i < req.files.exteriorFiles.length; i++){
        exteriorResult = await cloudinary.uploader.upload(req.files.exteriorFiles[i].path);
        exteriorImgUrlArray.push(exteriorResult.secure_url)
        cloudinaryIDArray.push(exteriorResult.public_id)
        // trying to get a thumbnail as first upload with background removed
        // see this documentation -> https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon#asynchronous_handling_for_upload_update
        
        // if(i = 0){
        //   let thumbNail = await cloudinary.uploader.upload(req.files.exteriorFiles[i].path, {
        //       public_id: `${req.body.make}-${req.body.model}-${req.body.year}`,
        //       background_removal: 'cloudinary_ai',
        //       notification_url: ""
        //     })
        //   exteriorImgUrlArray.push(thumbNail.secure_url)
        // }else{
        //   exteriorResult = await cloudinary.uploader.upload(req.files.exteriorFiles[i].path);
        //   exteriorImgUrlArray.push(exteriorResult.secure_url)
        // }
      }

     
      
      for (let i = 0; i < req.files.interiorFiles.length; i++){
        interiorResult = await cloudinary.uploader.upload(req.files.interiorFiles[i].path);
        interiorImgArray.push(interiorResult.secure_url)
        cloudinaryIDArray.push(interiorResult.public_id)
        //imgIdArray.push(interiorResult.secure_url)
      }
      for (let i = 0; i < req.files.documentFiles.length; i++){
        documentResult = await cloudinary.uploader.upload(req.files.documentFiles[i].path);
        documentImgArray.push(documentResult.secure_url)
        cloudinaryIDArray.push(documentResult.public_id)
        //imgIdArray.push(documentResult.secure_url)
      }
      console.log(cloudinaryIDArray,exteriorImgUrlArray, interiorImgArray, documentImgArray)
    
      await Post.create({
        ownerName: req.body.ownerName,
        ownerPhone: req.body.ownerPhone,
        ownerEmail: req.body.ownerEmail,
        ownerDeparture: req.body.ownerDeparture,
        ownerPassportChanged: req.body.ownerPassportChanged,
        make: req.body.make,
        model: req.body.model,
        spec: req.body.spec,
        engineSize: req.body.engineSize,
        year: req.body.year,
        transmission: req.body.transmission,
        numOfSeats: req.body.numOfSeats,
        color: req.body.color,
        fuelType: req.body.fuelType,
        tires: req.body.tires,
        mileage: req.body.mileage,
        history: req.body.history,
        numOfOwners: req.body.numOfOwners,
        accidents: req.body.accidents,
        modifications: req.body.modifications,
        repairs: req.body.repairs,
        issues: req.body.issues,
        thumbNail: exteriorImgUrlArray[0],
        interiorImage: interiorImgArray,
        exteriorImage: exteriorImgUrlArray,
        documentImage: documentImgArray,
        cloudinaryId: cloudinaryIDArray,
        priceWanted: req.body.priceWanted,
        priceOfficial: req.body.priceOfficial || 'Call For Price',   
        forRent: req.body.forRent,
        public: req.body.public || 'false',
        user: req.user.id,
        agreement: req.body.agreement,
        rentOrSale: req.body.rentOrSale,
        publicOrPrivate: req.body.publicOrPrivate,
      });
      
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: async (req, res) => {
    // change this to update the post info
    //let gerald update photos
    //update to blank goes to blank not old submission
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ownerName: req.body.ownerName,
        ownerPhone: req.body.ownerPhone,
        ownerEmail: req.body.ownerEmail,
        ownerDeparture: req.body.ownerDeparture,
        ownerPassportChanged: req.body.ownerPassportChanged,
        make: req.body.make,
        model: req.body.model,
        spec: req.body.spec,
        engineSize: req.body.engineSize,
        year: req.body.year,
        transmission: req.body.transmission,
        numOfSeats: req.body.numOfSeats,
        color: req.body.color,
        fuelType: req.body.fuelType,
        tires: req.body.tires,
        mileage: req.body.mileage,
        history: req.body.history,
        numOfOwners: req.body.numOfOwners,
        accidents: req.body.accidents,
        modifications: req.body.modifications,
        repairs: req.body.repairs,
        issues: req.body.issues,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        priceOfficial: req.body.priceOfficial || req.body.priceWanted || 'Call For Price',   
        public: req.body.public || 'true',
        forRent: req.body.forRent,
        rentOrSale: req.body.rentOrSale,
        publicOrPrivate: req.body.publicOrPrivate,
          },
        }
      );
      
      console.log("Post has been updated");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  favoritePost: async (req, res) => {
    // change this to save the post id to an array under the User
    try {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {favorites: req.params.id },
        }
      );
      
      console.log("Added to favorites");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  togglePrivatePublic: async (req, res) => {
    const newSetting = req.body.publicOrPrivate === "private" ? "public" : "private"
    // change this to save the post id to an array under the User
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {publicOrPrivate: newSetting },
        }
      );
      
      console.log(`Changed from ${req.params.publicOrPrivate} to ${newSetting}`);
      res.redirect(`/feed`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteFavorite: async (req, res) => {
    // change this to delete the post id to an array under the User
    try {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $pull: {favorites: req.params.id },
        }
      );
      
      console.log("Removed from favs");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  makePrivate: async (req, res) => {
    // change this to save the post id to an array under the User
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {public: false },
        }
      );
      
      console.log("made post private");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  makePublic: async (req, res) => {
    // change this to save the post id to an array under the User
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {public: true },
        }
      );
      
      console.log("made post public");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      console.log(post.cloudinaryId)
      for(let i = 0; i < post.cloudinaryId.length; i++){
        await cloudinary.uploader.destroy(post.cloudinaryId[i]);
      }
      
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
