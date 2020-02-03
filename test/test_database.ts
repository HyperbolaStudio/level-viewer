import { openDatabase } from "../lib/database/open_database";
import { add, get, clear } from "../lib/database/item_operations";
import { iterator } from "../lib/database/iteration";

async function f(){
    let db = await openDatabase("./test/db",{});
    clear(db,{});
    for(let i = 2;i<=1000;i++){
        let v = Buffer.from(i.toString(16));
        let k = Buffer.from(i.toString());
        await add(db,k,v);
    }
    let v = await get(db,Buffer.from('111'));
    if(v.toString() == (111).toString(16)){
        console.log("Accepted",v);
    }else{
        console.log("Wrong Answer");
    }

    let iter = iterator(db,{})();
    console.log(await iter.next());
    console.log(await iter.next());
    let i=0;
    while(true){
        let nd = await iter.next();
        if(nd.done)break;
        i++;
        console.log(nd.value.key.toString(),nd.value.value.toString());
    }
    console.log(i);
}
f();

