import { AddonMessage } from "./addons/utils";
import { LevelDown } from "leveldown";

export interface KeyValuePair{
    key:Buffer;
    value:Buffer;
}

export namespace QueryTag{
    export const INIT = 1;
    export const INIT_RETURN = 2;
    export const EXEC_FUNC = 4;
    export const EXEC_FUNC_RETURN = 8;
    export interface QueryTagMessageContentMap{
        [INIT]:undefined;
        [INIT_RETURN]:AddonManifest.AddonManifestType;
        [EXEC_FUNC]:AddonExecFunc.AddonExecFuncCall;
        [EXEC_FUNC_RETURN]:AddonExecFunc.AddonExecFuncReturn;
    }
    export function assertMsgType<K extends keyof QueryTagMessageContentMap>(queryTag:K,obj:AddonMessage):obj is AddonMessage<K>{
        return obj.queryTag == queryTag;
    }
}

export namespace AddonManifest{
    export interface AddonFuncDefinitionSet{
        [property:string]:AddonFuncDefinition;
    }
    export interface AddonFuncDefinition{
        friendlyName?:string;
    }
    export interface AddonManifestType{
        name:string;
        friendlyName?:string;
        version:string;
        requiredInternalVersion:number;
        funcs:AddonFuncDefinitionSet;
    }
}

export namespace AddonExecFunc{
    export interface AddonExecFuncCall{
        name:string;
        args:any[];
        currentKeyValue?:KeyValuePair;
        currentDB:LevelDown;
    }
    export interface AddonExecFuncReturn{
        err?:any;
        valueType:"plain"|"json"|"none";
        value:any;
    }
}


export interface AddonFuncSet{
    [property:string]:(arg:AddonExecFunc.AddonExecFuncCall)=>any;
}
