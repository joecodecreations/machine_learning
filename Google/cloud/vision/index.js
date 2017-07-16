const request = require('request'),
  dotenv = require('dotenv').config(),
  base64 = require('node-base64-image'); //decode also available


/* grab image to work with */
//let image_url = 'http://4pawsobediencetraining.com/wp-content/uploads/2014/03/Jack-Russel-in-the-park.jpg'; // dog
let image_url = 'https://static.pexels.com/photos/92034/pexels-photo-92034.jpeg'; // beach

let image_options = {
  'string': true,
  'local': false
}

/* base64 image */
base64.encode(image_url, image_options, (error, base64ImageString) => {

  let request_url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.TOKEN;
  let request_body = {
    "requests": [{
      "image": {
        "content": base64ImageString // base64 string of image
      },
      "features": [{
        "type": "LABEL_DETECTION",
        "maxResults": 1
      }]
    }]
  };

  let options = {
    method: 'post',
    body: request_body,
    json: true,
    url: request_url
  }
  request(options, function (error, response, body) {
    if (error) console.log('Error:', error);
    if (response.statusCode === 200) {
      console.log(JSON.stringify(body));
    } else {
      console.log('not 200 ' + response.statusCode);

    }

  });

});
