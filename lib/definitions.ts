import { AddonMessage } from "./addons/utils";

export interface KeyValuePair{
    key:Buffer;
    value:Buffer;
}

export namespace QueryTag{
    export const INIT = 1;
    export const INIT_RETURN = 2;
    export const EXEC_FUNC = 4;
    export const EXEC_FUNC_RETURN = 8;
    export interface QueryTagMap{
        [INIT]:AddonInfo.AddonInitMessage;
        [INIT_RETURN]:AddonInfo.AddonInfoMessage;
        [EXEC_FUNC]:AddonExecFunc.AddonExecFuncMessage;
        [EXEC_FUNC_RETURN]:AddonExecFunc.AddonExecFuncReturnMessage;
    }
    export function assertMsgType<K extends keyof QueryTagMap>(queryTag:K,obj:AddonMessage):obj is QueryTagMap[K]{
        return obj.queryTag == queryTag;
    }
}
document.createElement
export namespace AddonInfo{
    export interface AddonFuncDefinitionSet{
        [property:string]:AddonFuncDefinition;
    }
    export interface AddonFuncDefinition{
        friendlyName?:string;
        requireDatabase?:boolean;
    }
    export interface AddonInfoType{
        name:string;
        friendlyName?:string;
        version:string;
        requiredInternalVersion:number;
        funcs:AddonFuncDefinitionSet;
    }
    export interface AddonInitMessage extends AddonMessage{
        content:undefined;
    }
    export interface AddonInfoMessage extends AddonMessage{
        content:AddonInfoType;
    }
}

export namespace AddonExecFunc{
    export interface AddonExecFuncCall{
        name:string;
        args?:any[];
        currentKeyValue?:KeyValuePair;
    }
    export interface AddonExecFuncMessage extends AddonMessage{
        content:AddonExecFuncCall;
    }
    export interface AddonExecFuncReturn{
        err?:Error;
        valueType?:"plain-text"|"json";
        value:string;
    }
    export interface AddonExecFuncReturnMessage extends AddonMessage{
        content:AddonExecFuncReturn;
    }
}
