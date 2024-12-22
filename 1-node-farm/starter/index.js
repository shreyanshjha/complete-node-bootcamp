const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
////////////////////////////////////////////////
//// FILES

// Blocking synchoronus way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we known about avacado ${textIn}.\n Create on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written');

// Non-blocking asynchornous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return;
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if(err) return;
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             if(err) return;
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 if(err) return;
//                 console.log('File written succesfully');
//             });
//         })
//     })
// });
// console.log('asynchornous way');

////////////////////////////////////////////////
//// SERVER
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slug = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slug);
const server = http.createServer((req, res) => {
    const {query , pathname} = url.parse(req.url, true);
    switch (pathname) {
        // Overview Page
        case '/overview':
        case '/':
            res.writeHead(200, {'Content-type': 'text/html'});
            const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
            const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
            res.end(output);
            break;

        // Product Page
        case '/product':
            const productData = dataObj[query.id];
            const productTemp = replaceTemplate(templateProduct, productData);
            res.end(productTemp);
            break;

        // API
        case '/api':
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
            break;
        default:
            res.writeHead(404, {
                'Content-type': 'text/html',
                'my-own-header': 'hello-world'
            });
            res.end("<h1>Page not found</h1>");
            break;
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listing to requests on port 8000');
});