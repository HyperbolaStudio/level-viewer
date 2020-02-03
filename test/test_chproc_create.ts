import { loadAddon } from "../lib/addons/utils";

async function f(){
    let addon = await loadAddon('./test/addon');
    console.log(addon);
}
f();