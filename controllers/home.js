const Email = require("../models/EmailList.js");
const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const allPosts = await Post.find().sort({ createdAt: 1 }).lean();
      const posts = allPosts.filter((e)=> e.public !== false)
      res.render("index.ejs", { posts: posts });
      
    } catch (err) {
      console.log(err);
    }
  },

  getSellYourCar: (req, res) => {
    res.render('sellYourCar.ejs');
  },
  getThankYou: (req, res) => {
    res.render('thankYou.ejs')
  },
  getViewing: (req, res) => {
    res.render('viewing.ejs')
  },
  getServicing: (req, res) => {
    res.render('servicing.ejs')
  },
  getInspection: (req, res) => {
    res.render('inspection.ejs')
  },
  getContact: (req, res) => {
    res.render('contact.ejs')
  },
  getAbout: (req, res) => {
    res.render('about.ejs')
  },
  getEmails: async (req, res) => {
    try {
      const emails = await Email.find().sort({ createdAt: 1 }).lean();
      
      res.render("emailList.ejs", { emaillists: emails });
      
    } catch (err) {
      console.log(err);
    }
  
  },
  getServices: (req, res) => {
    res.render('ourServices.ejs')
  },

  addEmailToList: async (req, res) => {
    console.log(req.body)
    try {
      
      await Email.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.newEmail,
        
      });
      console.log("Email has been added to the list!");
      res.redirect("/thankYou");
    } catch (err) {
      console.log(err);
    }
  },
};

// addEmailToList: aysnc (req, res) => {
//   try {
//     await Email.create({
//       title: req.body.title,
//       message: req.body.message,
//       userName: req.user.userName,
//       user: req.user.id,
//     });
    
//     console.log("Email has been added to the list!");
//     res.redirect("/forumFeed");
//   } catch (err) {
//         console.log(err);
//   }
// },