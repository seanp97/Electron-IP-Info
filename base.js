const { ipcRenderer } = require('electron');

function getIP() {
  ipcRenderer.send("msg", "Get IP");
  ipcRenderer.on("ip", (event, data) => {
      console.log(data);
      document.querySelector(".ipLocalText").innerHTML = `Local IP Address: ${data.pcIP}`;
      document.querySelector(".ipPublicText").innerHTML = `Public IP Address: ${data.publicIP}`;
  })
}
