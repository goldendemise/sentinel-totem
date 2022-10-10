#!/usr/bin/env node
// Most of the Typescript essentials are from: https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/
const fs = require("fs");
import { exit } from "process";
import {generateHereDoc, functionUrls} from "./configHeredoc";
import {ripGrep} from "./ripGrep";


//TODO: Consider whether a local symlink mode might make sense for when writing policies and 
// https module sources are unavailable for whatever reason
// Maybe this repo should track the governance repo or pull in those files

// Check for the presence of sentinel.hcl, or else one gets created
const ensureFileExists = async (filename: string) => {
    try {
        return await fs.lstatSync(filename).isFile();
    } catch(e) {
        console.log(`${filename} not present. Are you running this in the right directory?`);
        exit();
    }
}

const checkForCommonFunctions = async (functionsArray: Array<string>) => {
    // iterate over all common functions by name
  for (const i of functionsArray) {
    const exitCode = await ripGrep(i);
    // exitCode of 0 indicates a match in ripGrep
    if(exitCode === 0) {
        console.log(`found import ${i}, appending to sentinel.hcl`);
        // Add heredoc to sentinel.hcl file if a match is found
        await fs.appendFile("sentinel.hcl", generateHereDoc(i), (err:any) => {
            if(err) throw err;
        });
    }
  }
}

const main = async () => {
    console.log('Starting checks');
    //make sure you're in the right directory to avoid nonsense
    ensureFileExists('sentinel.hcl');
    checkForCommonFunctions(Object.keys(functionUrls));
}

main();