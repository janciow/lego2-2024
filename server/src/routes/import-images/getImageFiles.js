const getImages = require("./insertBricks/getImages");

const legoSets = [
  "6286",
  "6285",
  "10210",
  "4195",
  "6243",
  "6274",
  "70413",
  "7675",
  "7676",
  "10195",
  "6271",
  '75151'
];
// const legoSets = ['7675', '7676', '10195'];
// const legoSets = ['7676'];

legoSets.forEach((legotSetNumber) => {
  getImages(legotSetNumber);
});
