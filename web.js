var http= require('http');
http.createServer(function (req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('<h1>Hello World,this is a nodejs web application on cloudfoundry</h1>');
}).listen(process.env.VCAP_APP_PORT || 3000);