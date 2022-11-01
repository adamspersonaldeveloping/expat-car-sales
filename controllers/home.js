const Email = require("../models/EmailList.js");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getSellYourCar: (req, res) => {
    res.render('sellYourCar.ejs');
  },
  getThankYou: (req, res) => {
    res.render('thankYou.ejs')
  },
  getEmails: async (req, res) => {
    try {
      const emails = await Email.find().sort({ createdAt: 1 }).lean();
      
      res.render("emailList.ejs", { emaillists: emails });
      
    } catch (err) {
      console.log(err);
    }
  
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