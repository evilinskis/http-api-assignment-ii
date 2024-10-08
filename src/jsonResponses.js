const users = {};

// create a json object and send as response
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }

  response.end();
};

// get all the users and send as a response
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// create a user from the request
const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  console.log(JSON.stringify(request));

  // check that the user has all fields

  // note: this code caused it to crash for some reason so it's edited
  // but it still doesn't work properly

  if (!request.name || !request.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  const { name, age } = request.body;

  // add user
  let responseCode = 204;

  if (!users[name]) {
    responseCode = 201;
    users[name] = {
      name,
    };
  }
  users[name].age = age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, {});
};

module.exports = {
  getUsers,
  addUser,
};
