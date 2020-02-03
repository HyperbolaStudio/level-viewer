import { registerAddon } from "../lib/addons/addon_client_utils";

registerAddon({
    name:'studio.hyperbola.testaddon',
    friendlyName:'Test Addon',
    version:'0.0.1',
    requiredInternalVersion:1,
    funcs:{
        testFunc1:{},
        testFunc2:{},
    }
},{
    testFunc1:(arg)=>{
        return arg.args.join(' ');
    },
    testFunc2:(arg)=>{
        return {
            first:arg.args[0],
            second:arg.args[1],
        }
    }
});