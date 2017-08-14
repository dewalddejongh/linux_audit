/*==============================================================================
Developer: Dewald de Jongh
Description: Linux Audit script
==============================================================================*/


var exec = require('child_process').exec;
var spawn = require('child_process').spawnSync;
var fs = require('fs');
var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});

var top = spawn("top", ["-bic"], {
    detatched:true,
    stdio:'ignore'
  });

top.unref();
top.stdout.on('data', (data) => {
  top.stdout.pipe(logStream);
  setTimeout(() => {
    top.kill('SIGHUP')
  }, 500);

});

top.on('close', function (code) {
  console.log('child process exited with code ' + code);
});


  // keep the event loop busy

//TEST SCRIPT
child=exec("top -icb", function(error, stdout, stderr){
  console.log('stdout: '+ stdout);
  console.log('stderr: '+ stderr);

  if (error !== null){
    console.log("exec error" + error);
  }

});
