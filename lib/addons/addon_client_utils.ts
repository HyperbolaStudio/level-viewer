import { AddonManifest, AddonFuncSet, QueryTag } from '../definitions'
import { AddonMessage } from './utils'

export function registerAddon(manifest:AddonManifest.AddonManifestType,funcs:AddonFuncSet){
    process.on("message",(msg)=>{
        if(QueryTag.assertMsgType(QueryTag.INIT,msg)){
            process.send!(new AddonMessage(QueryTag.INIT_RETURN,manifest));
        }else if(QueryTag.assertMsgType(QueryTag.EXEC_FUNC,msg)){
            if(funcs[msg.content.name]){
                try{
                    let ret = funcs[msg.content.name](msg.content);
                    let retType = typeof(ret);
                    if(retType == 'string' || retType == 'number' || retType == 'boolean' || retType == 'bigint'){
                        process.send!(new AddonMessage(QueryTag.EXEC_FUNC_RETURN,{
                            valueType:'plain',
                            value:ret,
                        }))
                    }else if(ret == undefined || ret == null){
                        process.send!(new AddonMessage(QueryTag.EXEC_FUNC_RETURN,{
                            valueType:'none',
                            value:ret,
                        }));
                    }else{
                        process.send!(new AddonMessage(QueryTag.EXEC_FUNC_RETURN,{
                            valueType:'json',
                            value:JSON.stringify(ret),
                        }));
                    }
                }catch(err){
                    process.send!(new AddonMessage(QueryTag.EXEC_FUNC_RETURN,{
                        err,
                        valueType:'none',
                        value:undefined,
                    }));
                }
            }
        }
    })
}