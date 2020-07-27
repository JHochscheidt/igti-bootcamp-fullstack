import http from 'http';

http
  .createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/teste')
      response.write('Get /teste executado com sucesso');

    response.write('hello world!!');
    response.statusCode = 200;
    response.end();
  })
  .listen(8080);
