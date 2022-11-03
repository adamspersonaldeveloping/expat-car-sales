const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    require: true,
  },
  // ingredients: {
  //   type: Array,
  //   require: true,
  // },
  ownerPhone:{
    type: String,
    require: true,
  },
  ownerEmail: {
    type: String,
    require: true,
  },
  ownerDeparture: {
    type: String,
    require: false,
  },
  ownerPassportChanged:{
    type: String,
    require: true,
  },
  make:{
    type: String,
    require: true,
  },
  model:{
    type: String,
    require: true,
  },
  spec:{
    type: String,
    require: true,
  },
  engineSize:{
    type: String,
    require: true,
  },
  year:{
    type: String,
    require: true,
  },
  transmission:{
    type: String,
    require: true,
  },
  numOfSeats:{
    type: String,
    require: true,
  },
  color:{
    type: String,
    require: true,
  },
  fuelType:{
    type: String,
    require: true,
  },
  tires:{
    type: String,
    require: true,
  },
  mileage:{
    type: String,
    require: true,
  },
  history:{
    type: String,
    require: true,
  },
  numOfOwners:{
    type: String,
    require: true,
  },
  accidents:{
    type: String,
    require: true,
  },
  modifications:{
    type: String,
    require: true,
  },
  repairs:{
    type: String,
    require: true,
  },
  issues:{
    type: String,
    require: true,
  },
  thumbNail: {
    type: String,
    require: false,
  },
  interiorImage: {
    type: Array,
    require: true,
  },
  exteriorImage: {
    type: Array,
    require: true,
  },
  documentImage: {
    type: Array,
    require: true,
  },
  cloudinaryId: {
    type: Array,
    require: true,
  },
  priceWanted:{
    type: String,
    require: true,
  },
  priceOfficial:{
    type: String,
    require: true,
  },
  public: {
    type: Boolean,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  agreement: {
    type: String,
    require: false,
  },
  forRent: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publicOrPrivate: {
    type: String,
    require: false,
  },
  rentOrSale: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);
