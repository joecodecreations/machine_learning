const env = require('dotenv').config(),
  request = require('request');


let request_url = 'https://language.googleapis.com/v1beta1/documents:annotateText?key=' + process.env.TOKEN;


let Documnet = {
  "type": 'PLAIN_TEXT', //enum - TYPE_UNSPECIFIED, PLAIN_TEXT, HTML
  "language": 'en',
  // Union field source can be only one of the following:
  "content": 'I bet you are a great swimmer',
  //"gcsContentUri": string, // url of where content is
  // End of list of possible types for union field source.
};

let Features = {
  "extractSyntax": true,
  "extractEntities": true,
  "extractDocumentSentiment": true, //Extract document-level sentiment.
};

let request_body = {
  "document": {
    "type": 'PLAIN_TEXT', //enum - TYPE_UNSPECIFIED, PLAIN_TEXT, HTML
    "language": 'en',
    // Union field source can be only one of the following:
    "content": 'I bet you are a great swimmer',
    //"gcsContentUri": string, // url of where content is
    // End of list of possible types for union field source.
  },
  "features": {
    "extractSyntax": true,
    "extractEntities": true,
    "extractDocumentSentiment": true, //Extract document-level sentiment.
  },
  "encodingType": 'UTF8', //UTF8, UTF16, UTF32, NONE
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

    // let responses = body.responses[0].labelAnnotations;
    // for (i = 0; i < responses.length; i++) {
    //   console.log("\n\n\n", responses[i].description);
    //   results.push(responses[i].description);
    //   // console.log('Description: ' + responses.description);
    //   // console.log('Confidence: ' + responses.score);
    //   // console.log('\n\n\n');
    // }
    // if (results.indexOf('font') !== -1) {
    //   console.log('we have font');
    // }
  } else {
    console.log('not 200 ' + response.statusCode);

  }

});
