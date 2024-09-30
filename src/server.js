const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URLs
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/getUsers': jsonHandler.getUsers,
  '/notReal': htmlHandler.getIndex,
  '/addUser': jsonHandler.addUser,
  '/style.css': htmlHandler.getStyle,
  index: htmlHandler.getIndex,
  notfound: htmlHandler.getIndex,
};

// get request URL and call the correct page
const onRequest = (request, response) => {
  console.log(request.url);

  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.acceptedTypes = request.headers.accept.split(',');
  request.query = Object.fromEntries(parsedUrl.searchParams);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notfound(request, response);
  }
};

// server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
