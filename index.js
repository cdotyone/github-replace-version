const core = require('@actions/core');
const path = require("path");
const fs = require('fs');
const glob = require('glob');
const util = require('util');

const files = glob.sync( path.join(process.cwd(),'**/README.md'), recursive=true);
console.log("setNetVersion: start");
console.log(files);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let version = core.getInput('version') || 'PACKAGE';
let showTrace = false;
let av = false;

if(version==="0")  {
    console.log('version is required parameter')
    process.exit(1);
    return;
}

if(version.indexOf('-')>0) {
    version=version.split('-')[0];
}

core.setOutput('version', version);

if(version==="PACKAGE") {
    let data = fs.readFileSync(path.join(process.cwd(),'package.json'), 'utf8');
    let json = JSON.parse(data);
    version = json.version;
}
if(version==="NEXT") {
    version = fs.readFileSync(path.join(process.cwd(),'VERSION'), 'utf8');
}

if(files.length>1) {

    console.log("setReadmeVersion: ",version);
    const run = async () => {
        version=version.replace(/v/g,'');

        let data = await readFile(files[0], 'utf8');

        data = data.replace(/\[version\]:\s(v.*)/gm, '[version]: v' + version);

        if (showTrace) console.log(data);

        await writeFile(files[0], data);
        console.log('setNetVersion: writing - ', fileVersion);
    };

    run();
    process.exit(0);
} else {
    console.log("setReadmeVersion: no README.cs file found");
    process.exit(1);
}
