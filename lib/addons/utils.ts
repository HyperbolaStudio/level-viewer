import {ChildProcess} from 'child_process'
import { AddonManifest, QueryTag, KeyValuePair, AddonExecFunc } from '../definitions';
import { LevelDown } from 'leveldown';
import { fork } from "child_process";

export async function loadAddon(path:string):Promise<Addon>{
    let childProc = fork(path);
    let addon = new Addon(childProc);
    await addon.initAddonInfo();
    return addon;
}
export class Addon{

    constructor(childProc:ChildProcess){
        this.childProc = childProc;
    }

    childProc:ChildProcess;
    addonInfo!: AddonManifest.AddonManifestType;

    private _send(message:AddonMessage):Promise<AddonMessage>{
        return new Promise((resolve,reject)=>{
            try{
                this.childProc.send(message);
                this.childProc.on("message",(msg)=>{
                    if(AddonMessage.isAddonMessage(msg)){
                        resolve(msg);
                    }else{
                        throw new TypeError();
                    }
                });
            }catch(err){
                reject(err);
            }
        });
    }

    async initAddonInfo(){
        let msg = await this._send(new AddonMessage(QueryTag.INIT,undefined));
        if(QueryTag.assertMsgType(QueryTag.INIT_RETURN,msg)){
            this.addonInfo = msg.content;
        }else{
            throw new TypeError();
        }
    }

    async execFunc(call:AddonExecFunc.AddonExecFuncCall):Promise<AddonExecFunc.AddonExecFuncReturn>{
        let msg = new AddonMessage(QueryTag.EXEC_FUNC,call);
        let ret = await this._send(msg);
        if(QueryTag.assertMsgType(QueryTag.EXEC_FUNC_RETURN,ret)){
            if(ret.content.err){
                throw ret.content.err;
            }
            return ret.content;
        }else{
            throw new TypeError();
        }
    }

}

export class AddonMessage<K extends keyof QueryTag.QueryTagMessageContentMap = any>{
    constructor(queryTag:K,content:QueryTag.QueryTagMessageContentMap[K]){
        this.queryTag = queryTag;
        this.content = content;
    }

    queryTag:Number;
    content:QueryTag.QueryTagMessageContentMap[K];

    static isAddonMessage(obj:any):obj is AddonMessage{
        return obj && typeof(obj.queryTag) == 'number';
    }
}

