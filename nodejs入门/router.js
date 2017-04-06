function route (handle,pathname,response,request) {
	console.log("about to route a request for" + pathname);
	if(typeof handle[pathname]==='function'){
		handle[pathname](response,request);
	}else{
		console.log("No request handle found for "+pathname);
		response.writeHead(404,{"Content-type":"text/html"});
		response.write("404 Not found");
		response.end();
	}
}
exports.route=route;