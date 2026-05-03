const {
  app,
  BrowserWindow,
  Notification,
  ipcMain,
  shell,
  dialog,
} = require("electron");

const isDev = require("electron-is-dev");
const https = require("https");
// const http = require("http");
const fs = require("fs");

const path = require("path");
const os = require("os");

const desktopPath = path.join(os.homedir(), "Desktop");
const folderName = "Exhub";

let content;
let splash;
let win;

function createSplash() {
  splash = new BrowserWindow({
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../public/splash.html")}`
      : `file://${path.join(__dirname, "../build/splash.html")}`
  );
  splash.center();
  splash.show();
}

function createWindow() {
  win = new BrowserWindow({
    transparent: true,
    height: 780,
    resizable: isDev ? true : false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  content = win.webContents;
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.webContents.on("did-finish-load", () => {
    var datasPath = app.getPath("userData");
    var filePath = path.join(datasPath, "location.txt");
    if (!fs.existsSync(filePath)) {
      ipcMain.emit("setLocation");
    } else {
      fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
          console.log(err);
        } else {
          ipcMain.on("writeToFile", (event, content) => {
            event.reply("writeToFileSuccess", data);
          });
        }
      });
    }

    splash.destroy();
    win.show();

    const options = {
      method: "GET",
      // protocol: "http:",
      protocol: "https:",
      hostname: "api.seketehran.ir",
      // hostname: "localhost",
      // port: 4000,
      path: "/",
      headers: {
        "Content-type": "application/json",
        appversion: "3",
      },
    };

    const req = https.request(options, (res) => {
      console.log(`statusCode appversion : ${res.statusCode}`);
      res.statusCode == 403 && ipcMain.emit("showExpired");
    });

    req.on("error", (error) => {
      console.error("err http request showExpired :", error);
    });

    req.end();
  });
}

app.whenReady().then(() => {
  createSplash();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("showSuccess", (_, body) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: body,
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});

ipcMain.handle("showError", (_, body) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: body,
    icon: path.join(__dirname, "failure-icon.png"),
  }).show();
});

ipcMain.on("setLocation", (_, body) => {
  dialog
    .showMessageBox(win, {
      type: "question",
      message: "موقعیت مکانی خود را انتخاب کنید ",
      buttons: ["بلوار", "پاساژ", "پلاتین"],

      icon: path.join(__dirname, "new.png"),
      title: "Choose Location",
    })
    .then((result) => {
      if (result.response === 0) {
        var datasPath = app.getPath("userData");
        var data = "bolvaar";
        var filePath = path.join(datasPath, "location.txt");

        ipcMain.on("writeToFile", (event, content) => {
          fs.writeFile(filePath, data, "utf-8", (err) => {
            if (err) {
              event.reply("writeToFileError", err.message);
            } else {
              event.reply("writeToFileSuccess", data);
            }
          });
        });

        content.reload();
      }
      if (result.response === 1) {
        var datasPath = app.getPath("userData");
        var data = "pasaage";
        var filePath = path.join(datasPath, "location.txt");

        ipcMain.on("writeToFile", (event, content) => {
          fs.writeFile(filePath, data, "utf-8", (err) => {
            if (err) {
              event.reply("writeToFileError", err.message);
            } else {
              event.reply("writeToFileSuccess", data);
            }
          });
        });
        content.reload();
      }
      if (result.response === 2) {
        var datasPath = app.getPath("userData");
        var data = "pelatin";
        var filePath = path.join(datasPath, "location.txt");

        ipcMain.on("writeToFile", (event, content) => {
          fs.writeFile(filePath, data, "utf-8", (err) => {
            if (err) {
              event.reply("writeToFileError", err.message);
            } else {
              event.reply("writeToFileSuccess", data);
            }
          });
        });
        content.reload();
      }
    });
});

ipcMain.on("showExpired", (_, body) => {
  dialog
    .showMessageBox(win, {
      type: "question",
      message: "مایل به دانلود نسخه جدید  هستید ؟",
      buttons: ["بله", "خیر"],
      defaultId: 1,
      cancelId: 1,
      icon: path.join(__dirname, "new.png"),
      title: "New Version",
    })
    .then((result) => {
      if (result.response === 0) {
        var datasPath = app.getPath("userData");
        let pathFile = path.join(datasPath, "location.txt");
        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }

        shell.openExternal(
          path.join(desktopPath, folderName, "AutoUpdater.exe")
        );
        win.destroy();
      }
      if (result.response === 1) {
        const options = {
          method: "GET",
          protocol: "https:",
          // protocol: "http:",
          hostname: "api.seketehran.ir",
          // hostname: "localhost",
          // port: 4000,
          path: "/",
        };

        const req = https.request(options, (res) => {
          // console.log(`statusCode: ${res.statusCode}`);
        });

        req.on("error", (error) => {
          // console.error("err http request :", error);
        });

        req.end();
      }
    });
});

ipcMain.handle("closeApp", () => {
  app.quit();
});
ipcMain.handle("reloadApp", () => {
  content.reload();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
