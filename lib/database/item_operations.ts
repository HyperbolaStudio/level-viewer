import { LevelDownPutOptions, LevelDown, LevelDownClearOptions } from "leveldown";

export function add(db:LevelDown,key:Buffer,value:Buffer):Promise<void>{
    return new Promise((resolve,reject)=>{
        db.put(key,value,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        });
    });
}

export function get(db:LevelDown,key:Buffer):Promise<Buffer>{
    return new Promise((resolve,reject)=>{
        db.get(key,{asBuffer:true},(err,val)=>{
            if(err){
                reject(err);
            }
            resolve(val as Buffer);
        });
    });
}

export function remove(db:LevelDown,key:string):Promise<void>{
    return new Promise((resolve,reject)=>{
        db.del(key,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}

export function clear(db:LevelDown,options:LevelDownClearOptions){
    return new Promise((resolve,reject)=>{
        db.clear(options,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    });
}