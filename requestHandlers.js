var formidable = require('formidable');
var querystring = require("querystring");
var url = require("url");
var fs = require("fs");
function start(response,request) {
  console.log("Request handler 'start' was called.");
//  function sleep(milliSeconds) {
// 	    var startTime = new Date().getTime();    
//  	    while (new Date().getTime() < startTime + milliSeconds);  
//  } 
//  sleep(10000);  
//  var content = 'Empty';
//  process.nextTick(function () { 
//	     var startTime=new Date().getTime();
//	     while(new Date().getTime()< startTime+10000);
//	     conntent = 'Hello Start';
//	     console.log('nextTick callback'); }
//   )
  
//  return content;
    var body = '<html>'+    '<head>'+    '<meta http-equiv="Content-Type" '+    'content="text/html; charset=UTF-8" />'+    '</head>'+    '<body>'+    '<form action="/upload" enctype="multipart/form-data" '+    'method="post">'+    '<input type="file" name="upload">'+    '<input type="submit" value="Upload file" />'+    '</form>'+    '</body>'+    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});    
    response.write(body);    
    response.end();
}

function upload(response,request) {
  console.log("Request handler 'upload' was called.");  
  var form = new formidable.IncomingForm();
  form.parse(request,function(error,fields,files){
  	  console.log('parsing done the filesname is '+files.upload.path);  	  
//  	  fs.renameSync(files.upload.path,"./loading.gif");
  	  response.writeHead(200, {"Content-Type": "text/html"});  
      response.write("received image:<br/>");    
      response.write("<img src='/show?id="+files.upload.path+"' />");    
      response.end();
  	}  
  );
}

function show(response,request){
	console.log("Request hanlder 'show' was called.");
	var pathname = (url.parse(request.url).query).substring(3);
	console.log(pathname);
	fs.readFile(pathname, "binary", function(error, file) {    
		if(error) {      
			response.writeHead(500, {"Content-Type": "text/plain"});      
			response.write(error + "\n");      
			response.end();    
		} else {      
			response.writeHead(200, {"Content-Type": "image/png"});     
			 response.write(file, "binary");      
			 response.end();    
		}  
	});
}

function execute(somefunc,values){
	var startTime = new Date().getTime(); 
  while (new Date().getTime() < startTime + values);
	somefunc();
}



exports.start = start;
exports.upload = upload;
exports.show = show;