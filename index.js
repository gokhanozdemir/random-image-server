const fs = require('fs')
// const sourceFolder = fs.readdirSync('ehaber')
// const sourceFolder = fs.readdirSync('../my-other-project/src/assets/img/')
const sourceFolder = 'img'
const files = fs.readdirSync(sourceFolder)

const http = require('http')
const port = process.env.NOW ? 80 : 2223

for (let i = files.length - 1; i >= 0; i--) {
  if (files[i][0] === '.') files.splice(i, 1)
}

http.createServer((req, res) => {
  // const pathRel = `/assets/img/${files[Math.floor(Math.random() * files.length)]}`
  const path = `${sourceFolder}/${files[Math.floor(Math.random() * files.length)]}`
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Error handling: ${path}\n`)
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(data, 'binary')

      // Return relative path only
      // res.write(path);
      // res.end();

      // res.writeHead(301,
      //   {Location: 'http://localhost:8001'+pathRel}
      // );
      // res.end();

    }
  })
}).listen(port)
console.log('listening on port:', port)
