// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const publicIp = require('public-ip');
const ip = require("ip");


function createWindow () {
  
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 500,
    height: 500,
    resizable: false,
    icon: __dirname + '/wifi_.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

 
  mainWindow.loadFile('index.html');

}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("msg", (event, data) => {
  (async () => {
    let ipv4 = await publicIp.v4();
    let localIP = ip.address();
    const ipInfo = {
      pcIP: localIP,
      publicIP: ipv4
    }
    event.reply("ip", ipInfo);
  })();

});
