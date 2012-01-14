//var exec = require("process").nextTick;

 function execute(somefunc,values){
	var startTime = new Date().getTime(); 
  while (new Date().getTime() < startTime + values);
	somefunc();
}


var content ='Empty';
//execute(function(){content='Hello';},10000);
process.nextTick(function () { 
	     var startTime=new Date().getTime();
	     while(new Date().getTime()< startTime+10000);
	     console.log('nextTick callback'); }
)



console.log(content);