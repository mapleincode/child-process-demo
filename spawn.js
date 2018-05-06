const spawn = require('child_process').spawn;  
const child = spawn('node', ['child.js']);

console.log(child);

child.stdout.on('data', (data) => {  
  console.log(`stdout: ${data}`);  
});  
child.stderr.on('data', (data) => {  
  console.log(`stderr: ${data}`);  
});  
child.on('close', (code) => {  
  console.log(`child process exited with code ${code}`);  
}); 