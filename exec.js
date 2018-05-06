const exec = require('child_process').exec;  
const child = exec('node child.js', function(error, stdout, stderr) {
    console.log(`stdout: ${JSON.stringify(stdout)}`);
    console.log(`stderr: ${JSON.stringify(stderr)}`); 
});
