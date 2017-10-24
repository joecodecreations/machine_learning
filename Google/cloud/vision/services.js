module.exports = {
  buildRequest: (method, body, url) => {
    let options = {
      method: method,
      body: body,
      json: true,
      url: url
    }
    return options;
  }
}
