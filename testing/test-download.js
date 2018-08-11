const request = require('request');
const fs = require('fs');

var subreddit = 'steamporn';
var folder = 'C:/Users/Main/Pictures/steam_wallpapers';
const api = `https://www.reddit.com/r/${subreddit}.json?sort=hot&limit=5`;

console.log(`API: ${api}`);

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

  var folder_pics = fs.readdirSync(folder);
  console.log('Folder pics: ', folder_pics)

  var filteredpictures = pictures.filter(function(pic) {
    return folder_pics.filter(folder_pic => folder_pic === pic.title).length === 0;
  })

  console.log(filteredpictures);
});
