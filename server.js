const http = require('http')
const { EventEmitter } = require('stream')
const url = require('url')
const fs = require('fs')
const port = 8000
 
const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost:8000')
    
    switch(parsedUrl.pathname){
        case '/':
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.write('Hey')
            res.end('Hello, welcome to the store!')
            console.log(`Path accessed = ${req.url}`)
        break;
        case '/home':
            if(req.method==='GET') {
                res.writeHead(200, {
                    'Content-Type' : 'text/html'
                })
                fs.readFile('index.html', (err, file) => {
                    if(err) {
                        res.end('Internal server error!')
                    } else {
                        res.end(file)
                    }
                })

            }
            console.log(`Path accessed = ${req.url}`)
        break;
        default:
            res.writeHead(404, {
                'Content-Type' : 'text/html'
            })
            fs.readFile('notFound.html', (err,file)=> {
                if(err) {
                    res.end('Internal server error')
                } else {
                    res.end(file)
                }
            })
            console.log('Attempted access to unknown path')
    }







})
server.listen(port, err=> {
    if(err) {
        console.log(`Error starting server`)
    } else {
        console.log(`Server started on port ${port}`)
    }
})