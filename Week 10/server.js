const http = require('http')

http.createServer((request, response) => {
  let body = []
  request.on('error', err => {
    console.log(err)
  }).on('data', chunk => {
    body.push(chunk.toString())
  }).on('end', () => {
    //body = Buffer.concat(body).toString()
    //console.log('body:' + body)
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(
      `<html maaa=a>
      <head>
        <style>
          #container {
            width: 500px;
            height: 300px;
            display: flex;
            background-color: rgb(255, 255, 255);
          }
          #container #myid {
            width: 100px;
            background-color: #ff5000;
          }
          #container .c1 {
            width: 300px;
            background-color: #ff1111;
          }
        </style>
        </head>
        <body>
        <div id="container">
          <div id="myid" />
          <div class="c1" />
        </div>
        </body>
      </html>
      `
    )
  })
}).listen(8080)

console.log('server started')