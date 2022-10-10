#!/usr/bin/env node
// Most of the Typescript essentials are from: https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/
import fs from "fs";
import {generateHereDoc, functionUrls} from "./lib/configHeredoc";
import {ripGrep} from "./lib/ripGrep";
import { ensureFileExists, appendHeredocToFile } from "./lib/fileOperations";

const checkForCommonFunctions = async (functionsArray: Array<string>) => {
    // iterate over all common functions by name
    // forEach does funny stuff with Async, like not work
  for (const i of functionsArray) {
    const exitCode = await ripGrep(i);
    // exitCode of 0 indicates a match in ripGrep
    if(exitCode === 0) {
        console.log(`found import ${i}, appending to sentinel.hcl`);
        // Add heredoc to sentinel.hcl file if a match is found
        await appendHeredocToFile("sentinel.hcl", generateHereDoc(i));
    }
  }
}

const main = async () => {
    //make sure you're in the right directory to avoid nonsense
    ensureFileExists('sentinel.hcl');
    checkForCommonFunctions(Object.keys(functionUrls));
}

main();