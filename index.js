const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require(`${__dirname}/replaceTemplate`);
// server

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  const { query, pathname } = url.parse(pathName, true);

  // overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // product
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  } else if (pathname === '/api') {
    //api
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-header': 'hello-world',
    });
    res.end('<h1>page not found</h1>');
  }
});

server.listen('8000', '127.0.0.1', () => {
  console.log('listenint to http://127.0.0.1:8000');
});
