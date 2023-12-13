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

  const { spawn } = require("child_process");
  const executablePath =
    "C:\\Program Files (x86)\\Toontown Rewritten\\TTREngine64.exe";
  const args = [];
  const env = {
    TTR_GAMESERVER: "gameserver.toontownrewritten.com",
    TTR_PLAYCOOKIE: cookie,
  };

  const child = spawn(executablePath, args, { env });

  child.stdout.on("data", (data) => {
    console.log(`Child process stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`Child process stderr: ${data}`);
  });

  child.on("error", (err) => {
    console.error("Child process error:", err);
  });

  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
