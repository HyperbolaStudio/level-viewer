import { loadAddon } from "../lib/addons/utils";
import { openDatabase } from "../lib/database/open_database";

async function f(){
    let db = await openDatabase("./test/db",{});
    let ch = await loadAddon("./test/addon");
    let ret1 = await ch.execFunc({
        name:"testFunc1",
        currentDB:db,
        args:['hello','world!'],
    });
    console.log(ret1);
    let ret2 = await ch.execFunc({
        name:"testFunc2",
        currentDB:db,
        args:['hello','world!'],
    });
    console.log(ret2);
}
f();