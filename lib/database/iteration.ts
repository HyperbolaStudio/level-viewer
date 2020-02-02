import { LevelDown, LevelDownIteratorOptions, LevelDownIterator } from "leveldown";
import { KeyValuePair } from "../definitions";

export function nextIteration(iterator:LevelDownIterator):Promise<KeyValuePair|undefined>{
    return new Promise((resolve,reject)=>{
        iterator.next((err,key,value)=>{
            if(err){
                reject(err);
            }
            if(key && value){
                resolve({
                    key:key as Buffer,
                    value:value as Buffer,
                });
            }else{
                resolve();
            }
        })
    })
}

export function iterator(db:LevelDown,options:LevelDownIteratorOptions){
    options.valueAsBuffer = true;
    let iterator = db.iterator(options);
    return async function*(){
        let pair = await nextIteration(iterator);
        while(pair){
            yield pair;
            pair = await nextIteration(iterator);
        }
        iterator.end((err)=>{
            if(err){
                throw(err);
            }
        });
        
    }
}