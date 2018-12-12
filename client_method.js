const opcua = require('node-opcua');
let client = new opcua.OPCUAClient({});

function ConnectToServer(ip,port, callback){
    let endpointUrl = "opc.tcp://" + ip + ":" + port;
    client.connect(endpointUrl,function (err) {
        if(err) {
            console.log(" cannot connect to endpoint :" , endpointUrl );
        } else {
            console.log("connected to OPC UA Server !");
        }
        callback(err);
    });
}

function CreateSessionCC(callback){
    client.createSession( function(err,session) {
        console.log(err);
        callback(err, session);
    });
}

function WriteHub(session, callback){
    let methodToCalls = [{
    }];

    session.call(methodToCalls, function (err, results) {
        callback(err, results);
    });
}

ConnectToServer('yournetworkaddress','4334',function(err){
   if(err){
       console.log('err: ' + err);
   }
   else {
       CreateSessionCC(function (err,session) {
           if(err){
               console.log('err: ' + err);
           }
           else {
               WriteHub(session, function(err,results){
                   if(err){
                       console.log('err: ' + err);
                   }
                   console.log('Good Call');
               })
           }
       })
   }
});
