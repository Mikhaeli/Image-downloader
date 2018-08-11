//to do
//update URL validation
//Update name vaildation
//tidy up everything
//Use promises

const request = require('request');

const fs = require('fs');

const downloader = require('./downloader.js');
const settings = require('./download_settings.js');

var subreddit = settings.subreddit;
var folder = settings.folder;
const api = `https://www.reddit.com/r/${subreddit}.json?sort=hot&limit=8`;

var extension = new RegExp('\\.\\w{3}$');
var imgur = new RegExp('^https:\/\/imgur\.com\/');
var imgurAlbum = new RegExp('^https:\/\/imgur\.com\/a\/');

// console.log(extension);
//
// console.log(`API: ${api}`);

request(api, function(error, response, body) {
  if (error) {
    console.log('Error: ', error)
    return error;
  }
  // console.log(response);
  // console.log(body);

  var pictures = [];
  var bodyData = JSON.parse(body);

  bodyData.data.children.forEach(function(data) {
    pictures.push({
      title: data.data.title,
      url: data.data.url
    });
  });

  // console.log(pictures);

  // var folder_pics = fs.readdirSync(folder);
  // console.log('Folder pics: ', folder_pics)

  var filteredpictures = pictures
  .map(function (pic) {
    if (imgur.test(pic.url)) {
      if (imgurAlbum.test(pic.url)) {
        return;
      } else if (!extension.test(pic.url)) {
        pic.url += '.jpg';
      }
    }
    // if (!extension.test(pic.url)) {
    //   return;
    // }
    return pic;
  });
  // .filter(function(pic) {
  //   return folder_pics.filter(folder_pic => folder_pic === pic.title).length === 0;
  // });

  console.log(filteredpictures);

  filteredpictures.forEach(function(pic) {
    if (pic) {
    downloader.downloadPics(pic.url, folder + pic.title + '.jpg');
  }
  });

});
