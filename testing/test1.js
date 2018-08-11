const download = require('image-downloader');

var url = 'https://www.flickr.com/photos/videotrains/42531005455/';
var destination = `C:\\Users\\Main\\Pictures\\test-downloader`;

const options = {
  url,
  dest: destination
}

download.image(options)
  .then(({ filename, image }) => {
    console.log('Filename', filename);
    console.log('Image', image);
  })
  .catch((err) => {
    console.error(err)
  })
