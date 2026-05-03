const { ipcRenderer, app, contextBridge } = require("electron");
const path = require("path");
const fs = require("fs");

window.Notification = {
  showError: (body) => {
    ipcRenderer.invoke("showError", body);
  },
  showSuccess: (body) => {
    ipcRenderer.invoke("showSuccess", body);
  },
};

window.closeApp = {
  closeApplication: () => {
    ipcRenderer.invoke("closeApp");
  },
};
window.reloadApp = {
  reloadApplication: () => {
    ipcRenderer.invoke("reloadApp");
  },
};

window.LocApi = {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
};
