import level, { LevelDown, LevelDownOpenOptions } from 'leveldown'

export async function openDatabase(location:string,options:LevelDownOpenOptions):Promise<LevelDown>{
    return new Promise((resolve,reject)=>{
        const db = level(location);
        db.open(options,(err)=>{
            if(err){
                reject(err);
            }
            resolve(db);
        });
    });
}

export async function closeDatabase(db:LevelDown){
    return new Promise((resolve,reject)=>{
        db.close((err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}