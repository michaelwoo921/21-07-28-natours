
const http= require('http');
const fs = require('fs');

const data = fs.readFileSync('./data.json', 'utf-8');

const server = http.createServer((req,res) => {
  const pathName = req.url;
  if(pathName==='/' || pathName==='/overview'){
    res.end('This is overview')
  } else if (pathName==='/product'){
    res.end('this is product page');
  } else if( pathName === '/api'){
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
 
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-header': 'hello-world'
    });
    res.end('<h1>page not found</h1>')
  }
  
});

server.listen('8000', '127.0.0.1', () => {
  console.log('listenint to http://127.0.0.1:8000');
})


