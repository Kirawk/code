var http = require("http");
var url=require("url");
// http.createServer(function(request, response) {
// response.writeHead(200, {"Content-Type": "text/plain"});
// response.write("Hello World");
// response.end();
// }).listen(8888);

function start (route,handle) {
	function onRequest(request,response){

		// var postData="";
		var pathname=url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		//console.log("request has receives");
		//request.setEncoding("utf8");
		//request.addListener("data",function(postDataChunk){
			//postData+=postDataChunk;
			//console.log("Receviced POST data chunk"+postDataChunk+".");
		//});
		//request.addListener("end",function(){
			route(handle,pathname,response,request);
		//})
		
		// response.writeHead(200, {"Content-Type":"text/plain"});
		// response.write("hello World");
		// response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log("server has started");	
}


exports.start = start;