const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  ttrGameCookies: (gameserver, cookie) =>
    ipcRenderer.send("ttr-gamecookies", gameserver, cookie),
});
