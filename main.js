const { app, BrowserWindow, ipcMain } = require("electron/main");

const createWindow = () => {
  const path = require("node:path");
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("ttr-gamecookies", (event, gameserver, cookie) => {
  console.info(`Gameserver: ${gameserver} Cookie: ${cookie}`);

  process.env.TTR_GAMESERVER = gameserver;
  process.env.TTR_PLAYCOOKIE = cookie;

  const options = {
    env: {
      ...process.env,
    },
  };

  const child = require("child_process").execFile;
  const executablePath =
    "C:\\Program Files (x86)\\Toontown Rewritten\\TTREngine64.exe";

  child(executablePath, options, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data.toString());
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
