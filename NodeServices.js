const Service = require('node-windows').Service;
const svc = new Service({
  name:"react server",
  description:"this is our description",
  script:"C:\\Users\\SaiPrasad\\Desktop\\WEBDEV\\prj10\\package.json"
})

svc.on('install', () => {
 svc.start()
});
svc.install()
