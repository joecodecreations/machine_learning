// const request = require('request'),
//   dotenv = require('dotenv'),
//   keys = require('./keys'),
//   base64 = require('node-base64-image'),
//   s = require('./services'),
//   log = false;
//
// /* grab image to work with */
// //let image_url = 'http://4pawsobediencetraining.com/wp-content/uploads/2014/03/Jack-Russel-in-the-park.jpg'; // dog
// //let image_url = 'https://static.pexels.com/photos/92034/pexels-photo-92034.jpeg'; // beach
// let image_url = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Sign_for_the_Isle_of_Wight_Bus_Museum.JPG'; // OCR test
//
// let image_options = {
//   'string': true,
//   'local': false
// }
//
// /* base64 image */
// base64.encode(image_url, image_options, (error, base64ImageString) => {
//
//   let request_url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.token;
//   let types = [
//     'TEXT_DETECTION', // 0 - detects text in image for OCR
//     'LABEL_DETECTION', // 1 - detects general labeling ie. ocean, beach, dog, cat
//     'FACE_DETECTION', // 2 - detects number of faces
//     'IMAGE_PROPERTIES',
//     'LANDMARK_DETECTION',
//     'LOGO_DETECTION',
//     'SAFE_SEARCH_DETECTION'
//   ];
//
//   let maxResults = 1; //how many results will we be returning
//
//   let request_body = {
//     "requests": [{
//       "image": {
//         "content": base64ImageString // base64 string of image
//       },
//       "features": [{
//         "type": types[0], // select which type from types
//         "maxResults": maxResults
//       }]
//     }]
//   };
//
//
//   let options = s.buildRequest('post', request_body, request_url);
//
//   request(options, function (error, response, body) {
//     if (error && log) console.log('Error:', error);
//     if (response.statusCode === 200) {
//       if (log) console.log(JSON.stringify(body));
//     } else {
//       if (log) console.log('bad response', response.statusCode);
//     }
//   });
// });
//


const request = require('request');
const dotenv = require('dotenv').config();
const base64 = require('node-base64-image'); //decode also available


/* Test Images */
// //let image_url = 'http://4pawsobediencetraining.com/wp-content/uploads/2014/03/Jack-Russel-in-the-park.jpg'; // dog
// //let image_url = 'https://static.pexels.com/photos/92034/pexels-photo-92034.jpeg'; // beach
// let image_url = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Sign_for_the_Isle_of_Wight_Bus_Museum.JPG'; // OCR test
//let image_url = 'https://d32ogoqmya1dw8.cloudfront.net/images/teacherprep/resources/activities/example_check.jpg';
//let image_url = 'http://iconicauctions.com/ItemImages/000030/50_913-17659_lg.jpeg' // check
let image_url = 'https://aliaalhajaji.files.wordpress.com/2012/06/billboard-contact-backup_final.jpg'; //billboard

let image_options = {
  'string': true,
  'local': false
}

/* base64 image */
base64.encode(image_url, image_options, (error, base64ImageString) => {

  let types = [
    'TEXT_DETECTION', // 0 - detects text in image for OCR
    'LABEL_DETECTION', // 1 - detects general labeling ie. ocean, beach, dog, cat
    'FACE_DETECTION', // 2 - detects number of faces
    'IMAGE_PROPERTIES',
    'LANDMARK_DETECTION',
    'LOGO_DETECTION',
    'SAFE_SEARCH_DETECTION'
  ];

/* access the google api and send the image in as content as base64 */
  let request_url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.TOKEN;
  let request_body = {
    "requests": [{
      "image": {
        "content": base64ImageString // base64 string of image
      },
      "features": [{
        "type": types[0],
        "maxResults": 10
      }]
    }]
  };

  let options = {
    method: 'post',
    body: request_body,
    json: true,
    url: request_url
  }



  // {
  //   "responses": [{
  //     "labelAnnotations": [{
  //       "mid": "/m/07s6nbt",
  //       "description": "text",
  //       "score": 0.959491
  //     }, {
  //       "mid": "/m/03gq5hm",
  //       "description": "font",
  //       "score": 0.85191876
  //     }, {
  //       "mid": "/m/01g6gs",
  //       "description": "black and white",
  //       "score": 0.84073216
  //     }, {
  //       "mid": "/m/0gkxy13",
  //       "description": "handwriting",
  //       "score": 0.835077
  //     }, {
  //       "mid": "/m/03scnj",
  //       "description": "line",
  //       "score": 0.7834269
  //     }]
  //   }]
  // }
  let results = [];
  request(options, function (error, response, body) {
    if (error) console.log('Error:', error);
    if (response.statusCode === 200) {
      console.log(JSON.stringify(body));

      let responses = body.responses[0].labelAnnotations;
      for (i = 0; i < responses.length; i++) {
        console.log("\n\n\n", responses[i].description);
        results.push(responses[i].description);
        // console.log('Description: ' + responses.description);
        // console.log('Confidence: ' + responses.score);
        // console.log('\n\n\n');
      }
      if (results.indexOf('font') !== -1) {
        console.log('we have font');
      }
    } else {
      console.log('not 200 ' + response.statusCode);

    }

  });

});
