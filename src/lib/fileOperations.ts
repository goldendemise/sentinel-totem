const fs = require("fs");
import { exit } from "process";

// Check for the presence of sentinel.hcl, or else one gets created
export const ensureFileExists = async (filename: string) => {
    try {
        return await fs.lstatSync(filename).isFile();
    } catch(e) {
        console.log(`${filename} not present. Are you running this in the right directory?`);
        exit();
    }
}