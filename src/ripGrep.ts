import { rgPath } from "@vscode/ripgrep";
import { spawn } from "child_process";
import { once } from "events";

// TODO: At present, this function is always called recursively in the current directory via process.cwd()
// I might need to add '--max-depth 1' to account for someone nesting sentinel directories
// syntax is 'rg --max-depth 1' 

// TODO: At present there's absolutely no point using typescript for this module. 
// I need to figure out how returning Promise values works when implemented with `spawn`
export async function ripGrep(phrase: string, dir: string=process.cwd(), recursiveSearch:boolean=true) {
    try {
        const rg = spawn(rgPath, [phrase, dir]);
        let exitCode;
        // Capture ripgrep exit code and return it after the process finishes
        //exit code for 'no match' is 1 for ripgrep
        //https://github.com/BurntSushi/ripgrep/issues/948
        rg.on("exit", (code) => {
            exitCode = code;
        });
        await once(rg, "close");
        return exitCode;
    } catch (err) {
        console.log(`Unexpected error spawning ripgrep search:\n${err}`);
    }


}