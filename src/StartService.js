const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
     name:'BardServer',
     description: 'Backend service for BARD timesheet application.',
     script: './server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.on('install',function(){
           svc.start();
});

svc.install();