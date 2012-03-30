version 20120330

cloudfoundry发布步骤：
1、建立webstatic工程，删除下面文件夹等，创建自己的文件目录。也可以从githup上获取。
2、2012-1-3之前的nodejs版本是 version 0.4.12.
3、cloudfoundry上面 （pass菜单上）建立一个nodejs工程。左边先选择根目录再创建
4、运行的js需要取名为app.js
5、更新工程
6、重启即可



其他信息：如果要创建express这样的框架工程，需要nmp帮助。
下面是cloudfoundry上面的发布帮助：

Cloud Foundry supports deploying Node.js apps today. We currently run Node.js version 0.4.12.

When deploying any application to vCloudLabs, the directory from which you push the app via vmc push, needs to include all packages and dependencies that are needed to run your application, and your application itself. Node.JS applications are no different.

NPM, or the Node Package Manager has become popular as a way to add software packages to your Node.js application.

Generally, utilizing npm will allow your application to run locally, but it will not work correctly when pushed to Cloud Foundry.

 

Below is a simple hello world app that uses express (http://expressjs.com), installed via npm.

NOTE: The main Node.js file needs to be named app.js when pushing to Cloud Foundry.

 

var app = require('express').createServer();
app.get('/', function(req, res){
    res.send('hello world test using express and npm');
});
app.listen(3000);
 

A couple of things to note.

The require for express just 'works', via npm and node magic. Magic meaning that it resolves with information not visible to vmc or Cloud Foundry.
We bind to port 3000, which is not allowed in a cloud based application, where the system usually chooses the port for you.
 

Running this application locally is straightforward:

 

> node app.js

 

To run this application sucessfully on Cloud Foundry, we need to do a few simple steps.

 

Describe the npm dependencies with a package_info.json file.
run 'npm install' (which produces an node_modules directory which includes all of our dependencies)
Add the node_modules directory to our require path.
Optionally use the port assigned by Cloud Foundry instead of port 3000. We will still use 3000 for local runs.
 

The package.json file is listed below..

 

{

  "name":"simple",

  "version":"0.0.1",

  "dependencies":{

    "express":""

  }

}

 

After running the 'npm install' command, our directory will now look like this..

 

> ls

app.js node_modules/ package.json

 

All of the dependecies for expressjs will be included under node_modules.

 

Last, we need to make a few small changes to our app.js (bolded)

 

====== app.js ======

 

require.paths.unshift('./node_modules')



var app = require('express').createServer();



app.get('/', function(req, res){

    res.send('hello world test using express and npm');

});

app.listen(process.env.VCAP_APP_PORT || 3000);

==================

 

That's it, you are ready to execute via 'vmc push node_simple'...



Note: When running 'vmc push' you may get the following error:

Error: Can't deploy application containing links ...

This is a known bug that is being fixed in vmc. The workaround for now is to run the following from the node.js app root:

> rm -r node_modules/.bin/



