const spawn = require('child_process').spawn;  
const child = spawn('node', ['child.js'], {
    // detached: true, // 子进程是否可以和主进程分离
});

console.log(child);

child.stdout.on('data', (data) => {  
  console.log(`stdout: ${data}`);  
});  
child.stderr.on('data', (data) => {  
  console.log(`stderr: ${data}`);  
});  
child.on('close', (code) => {  
  console.log(`child process closed with code ${code}`);  
});

child.on('exit', (code) => {  
  console.log(`child process exited with code ${code}`);  
});

setTimeout(() => {
    console.log(`child pid ${child.pid}`);
    child.unref();
    process.exit(0);
}, 1000);

// 关于 options.detached

// 在windows上，设置options.detached 为 true，
// 可以保证父进程退出的时候，子进程还可以运行，子进程拥有自己的console窗口，
// 一旦启动，就不可能停止。(因为 windows 运行必须依赖 CMD.exe)
// 非windows的话，设置options.detached 为 true，子进程将会新进程的控制者，
// (*ux 下运行不依赖 bash)

// 这一段一直有点难以理解
// 后面想想可能是这样的关系，因为在 windows 环境下，由于 node 进程必须运行在 CMD.exe 上
// 所以 windows 的进程在脱离之前，必须设置 options.detached 以保障子进程在另外的 CMD 上。
// 当调用 child_process.unref()，就能使子进程脱离主进程。

// 而当在非 windows 环境中，options.detached 的效果是 SETSID(2) 
// 一旦设置 options.detached 就算不使用 child.unref() 也能保证 子进程在主进程退出之后运行
// 反之亦然。有点费解。

// ------------------------------------------------------------------

// 发现如果不设置 options.detached 而只使用  child.unref()
// 如果在主进程中直接 process.exit(0) 则子进程存活
// 但是直接使用 ctrl+c 则子进程也退出。
// 但是设置了 options.detached 就都不会退出