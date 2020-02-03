let childProcess = require("child_process");
function f(s){
    return new Promise((resolve,reject)=>{
        let child = childProcess.fork("./ch");
        child.send(s);
        child.on("message",(msg)=>{
            resolve(msg);
        });
    });
}