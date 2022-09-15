// 运行在单独的隔离环境中，与renderer进程window隔离，可以访问Node.js API
const electron = require('electron');

// electron 桥接 API
electron.contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel, ...args) {
      electron.ipcRenderer.send(channel, ...args);
    },
  },
});