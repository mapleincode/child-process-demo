const { execFile } = require('child_process');  
const child = execFile('node', ['./child.js'], function(error, stdout, stderr) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`); 
});

console.log(child);
