/* global console, require */
const opcua = require("node-opcua");

const server = new opcua.OPCUAServer({
    port: 4334 // the port of the listening socket of the server
});

function post_initialize() {

    const addressSpace = server.engine.addressSpace;
    const namespace =addressSpace.getOwnNamespace();

    const myDevice = namespace.addObject({
        organizedBy: addressSpace.rootFolder.objects,
        browseName: "MyDevice"
    });

    const method = namespace.addMethod(myDevice,{
        browseName: "Just Call"
    });
    
   
    
    method.bindMethod(function(inputArguments,context,callback) {

	 console.log("Good Call");
         const callMethodResult = {
            statusCode: opcua.StatusCodes.Good
 
        };
        callback(null,callMethodResult);
    });

}

server.initialize(post_initialize);

server.start(function() {
    const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log("Server is now listening at", endpointUrl, " (press CTRL+C to stop)");
});
